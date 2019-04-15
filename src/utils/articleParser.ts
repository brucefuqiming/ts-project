import {
  setUrlParam,
} from './urlUtil';

class ArticleParser {
  public p: object;
  constructor(opt: any) {
    this.p = Object.assign({
    }, opt);
  }

  public _formatTable(html: any) {
      const $html = document.createElement('div');
      $html.innerHTML = html;
      let tables: any = $html.getElementsByTagName('table');
      tables = Array.from(tables);
      tables.forEach((item: any) => {
        const parent = item.parentNode;
        const div = document.createElement('div');
        div.className = 'detail-table-box';
        div.style.overflowX = 'auto';
        div.innerHTML = item.outerHTML;
        parent.replaceChild(div, item);
      });
      return $html.innerHTML;
    }
    //   }
    //   // 请勿再使用该函数修改a连接，如需使用请@qiancheng
    // formatLink(html = '') {
    //     html = html ? html : ''
    //     html = typeof html === 'string' ? html : String(html)
    //     html = html.replace(/(<a[^>]+)href="\?id=([0-9a
    // -zA-Z]*)(&amp;language=cn)?([^>]+)(>)/ig, '$1/detail/$2$4 data-id="$2"$5')
    //     return html
    //   }
    //   //引用的处理,把img换成sup标签,内加数字[17],删掉图片
    // formatReference(html = '') {
    //   // console.log('formatReference!!!!')
    //   var $html = $(`<div>${html}</div>`);
    //   $html.find('.sup-ref').each(function(index, item) {
    //     let idStr = $(item).attr("data-refid");
    //     let idNum = idStr.split('-')[1];
    //     var newItem = $(`<sup class='sup-reference' ref-id='${idStr}'>[${idNum}]</sup>`);
    //     $(item).after(newItem);
    //     $(item).remove();

  //   });
  //   $html.find('.sup-note').each(function(index, item) {
  //     let idStr = $(item).attr("data-refid");
  //     if (!!idStr) {
  //       let idNum = idStr.split('-')[1];
  //       if (!idNum) {
  //         return;
  //       }
  //       var newItem = $(`<sup class='sup-note' note-id='note-${index + 1}'>[注]</sup>`);
  //       $(item).after(newItem);
  //       $(item).remove();
  //     }
  //   });
  //   // console.log('结果:',$html.html())
  //   return $html.html();
  // }

  // /**
  //  * 删除所有references
  //  */

  // removeReferences(html) {
  //   var $html = $(`<div>${html}</div>`);
  //   $html.find('.sup-reference,.sup-ref,.sup-note').remove();
  //   return $html.html();
  // }

  // addTitleEdit(html = '') {
  //   // console.log('articleParsor is here!');
  //   var $html = $(`<div>${html}</div>`);
  //   $html.find('h2').each(function(index, item) {
  //     // console.log('-----', $(item).find('span').length);
  //     //没有这种结构的
  //     if ($(item).find('span').length === 0) {
  //       let text = $(item).text();
  //       $(item).text('');
  //       let htmlText = `<span class='mw-headline'>${text}</span>`;
  //       $(item).append($(htmlText));
  //     }
  //     let htmlEdit = `<div class='h2-edit-container'>
  //                       <span class='h2-edit-line'></span>
  //                       <div class='butt-wrapper'>
  //                           <span class='h2-edit-img'></span><span class='text'>${_L_('edit')}</span>
  //                       </div>
  //                     </div>`;
  //     $(item).append($(htmlEdit));
  //   });
  //   return $html.html();
  // }

  /**
   * 针对五图一线插入做的展示优化。
   * @param {htmlText} html
   */
  public resolveSpecialImport(html: any) {
    const $html = document.createElement('div');
    $html.innerHTML = html;

    /**
     * 替换关系图谱在正文中的的结构，支持点击整张图谱跳转
     */
    try {
      let iframes: any = $html.getElementsByTagName('iframe');
      iframes = Array.from(iframes);
      iframes.forEach((item: any) => {
        item.scrolling = 'no';
        let src = item.src;
        src = setUrlParam(src, {
          _ua_: 'iframe',
        }, '');
        if ((/\/family\/subIndex\?id=/i).test(src)) {
          src = setUrlParam(src, {
            options: 0,
          }, '');
          src = src.replace(/https?:\/\/[^/]*\//gi, '__ALLHISTORY_DOMAIN_HOSTNAME__/');
        } else if ((/\/map\/detail/).test(src)) {
          src = src.replace(/https?:\/\/[^/]*\//gi, '__ALLHISTORY_DOMAIN_HOSTNAME__/');
        }
        item.src = src;
        item.setAttribute('allowfullscreen', 'true');
      });

      // resovle relation
      let relations: any = $html.getElementsByClassName('dls-relation-in-article');
      relations = Array.from(relations);
      relations.forEach((item: any) => {
        const anode = item.getElementsByTagName('a')[0];
        const href = anode.href;
        anode.href = 'javascript:void(0)';
        const thumb = item.querySelector('.dls-relation-in-article-thumb');
        if (thumb) {
          const node = document.createElement('a');
          node.href = `/relation?${href.split('relation?')[1]}`;
          node.className = 'mask-see-more';
          thumb.appendChild(node);
        }
      });

      // resovle book
      let books: any = $html.getElementsByClassName('dls-book-in-article');
      books = Array.from(books);
      books.forEach((item: any) => {
        const cover = item.querySelector('.left img.bg');
        if (cover && cover.src.indexOf('/online/Detail/img/') >= 0) {
          cover.src = require('@/assets/img/book-cover-cn.png');
        }
      });

      // resovle book
      let timelineImgs: any = $html.getElementsByClassName('dls-timeline-in-article-image-item');
      timelineImgs = Array.from(timelineImgs);
      timelineImgs.forEach((item: any) => {
        const url = item.getAttribute('data-url');
        const parent = item.parentNode;
        const imgDom = document.createElement('img');
        imgDom.src = url;
        imgDom.setAttribute('preview', '1');
        parent.replaceChild(imgDom, item);
      });
    } catch (err) {
      console.error(err);
    }

    return $html.innerHTML;
  }
}

export default new ArticleParser({});

// 自动图片布局函数
// const _ImageBlockResizer = {
//   resizeImageBlocks($html, container = 'article') {
//     // console.log('it seems not work?');
//     var self = this;
//     let width = 0;
//     if (container) {
//       width = parseInt($html.find(container).width());
//     } else {
//       width = parseInt($html.width());
//     }
//     // console.log($html, width)
//     $html.find('.dls-image-block').each(function() {
//       //获取article内容总宽度
//       //与编辑器默认640像素宽度的差
//       let ratio = width / 640;
//       // let length = $(this).find('img').length;
//       //设定新的block宽度
//       $(this).width(width + 20);
//       //获取所有img
//       if ($(this).find('img').length > 1) {
//         $(this).find('img').each(function() {
//           console.log({
//             ratio
//           });
//           self.resizeImages(this, ratio);
//           $(this).load(e => self.resizeImages(this, ratio));
//         })
//       }
//     })
//   },
//   resizeImages(img, ratio) {
//     let $img = $(img);
//     $img.width('auto');
//     let height;
//     let naturalHeight = height = img.naturalHeight;
//     //或取当前image的高度
//     if (naturalHeight <= 0) {
//       return;
//     }
//     if (parseInt($img.attr('data-origin-height'))) {
//       height = $img.attr('data-origin-height');
//     } else {
//       height = $(img).height();
//       $img.attr('data-origin-height', height);
//     }
//     let newHeight = height * ratio;
//     // if(newHeight > naturalHeight){
//     //   newHeight = naturalHeight
//     // }
//     $img.height(newHeight);
//   }
// }

// export {
//   _ImageBlockResizer as ImageBlockResizer
// }
