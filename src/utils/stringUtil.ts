export default {
  // 识别文本中的话题（#）
  toTopic(text: any) {
    text = unescape(text.replace(/\\u/ig, '%u'));
    text = text.replace(/[#＃]((?!\s+[#＃])[^#＃\f\n\r\t\v]+)[#＃]/ig,
    '<a class="topic-link" href="/topicdetail.htm?title=$1">$&</a>',
    );
    return text;
  },

  // 获取字节长度，一个中文为2字节
  getRealLength(str: any) {
    if (str == null) { return 0; }
    if (typeof str !== 'string') {
      str += '';
    }
    // striptags
    str = this.striptags(str);

    return str.replace(/[^\x00-\xff]/g, '01').length;
  },

  // 获取文本字符长度（中文汉字英文字母都视为一个长度）
  getTextLength(str: any) {
    const ret = str.match(/./gu);
    return ret ? ret.length : 0;
  },

  // 通过字节截取文本， ex: n = 50, 将会截取25个中文字或50个英文
  subStr(str: any, n: any, withoutHtml = true, suffix = '...') {
    if (typeof str !== 'string') {
      str = String(str);
    }
    const strLength = this.getRealLength(str);

    // console.log(strLength, n )
    if (withoutHtml) {
      str = this.striptags(str);
      if (strLength <= n) {
        return str;
      }

      let rs = '';
      let  count = 0;
      let lIndex = 0;

      while (str[lIndex] && (count <= n)) {
        count += this.getRealLength(str[lIndex]);
        rs += str[lIndex];
        lIndex++;
      }

      return suffix ? rs + suffix : rs;
    } else {
      const res = this.htmlSubstring(str, n).trim();
      return res;
    }
  },

  // 通过字节截取文本，截取的字符串中需要保留html标签类似<a>
  subStrKeepTag(str: any, n: any, suffix = '...') {
    let res: any; const tagArray = [];
    let i = 0;
    const reg = /<[^<]+>/g;
    while (str.search(reg) !== -1) {
      const regs = /<[^<]+>/g;
      res = regs.exec(str);
      tagArray.push(res[0]);
      str = str.substring(0, res.index) + '\u9f98' + str.substring(res.index + res[0].length);
    }
    let d = this.subStr(str, n + tagArray.length * 2, true, suffix);
    while (d.search(/\u9f98/) !== -1) {
      d = d.replace('\u9f98', tagArray[i] || '');
      i++;
    }
    return d;
  },

  // 清除文本中的标签
  striptags(str: any) {
    const div = document.createElement('div');
    div.innerHTML = str;
    const text = div.textContent || div.innerText || '';
    return text;
  },

  // 获取url中的域名
  getDomainName(url: any) {
    const rs = url.replace(/(https?:\/\/)?([\w.]*).*/, '$2');
    return rs;
  },

  // 如果图片没有扩展名，增加扩展名
  fixedImageType(url: any, type = 'jpg') {
    const qIndex = url.indexOf('?');
    let newUrl = url;
    let params = '';

    if (qIndex > -1) {
      newUrl = url.slice(0, qIndex);
      params = url.split('?')[1];
    }

    if (!/\/[^/]+\.[^.?]{3,4}(\?|$)/.test(newUrl)) {
      return newUrl + '.' + type + '?' + params;
    }
    return url;
  },

  // 替换url中的query
  updateImageUrl(url: any, newParams = '') {
    const qIndex = url.indexOf('?');
    if (qIndex < 0) {
      return url;
    }
    const newUrl = this.fixedImageType(url.slice(0, qIndex)) + newParams;
    return newUrl;
  },

  // 截取html并保证html不被破坏
  htmlSubstring(s: any, n: any) {
    let m: any; const r = /<([^>\s]*)[^>]*>/g;
    const  stack = [];
    let  lasti = 0;
    let  result = '';
    const N = n;
    const totalLength = this.striptags(s).length;
    // console.log("totalLength",totalLength);
    // for each tag, while we don't have enough characters
    while ((r.exec(s)) && n > 0) {
      m = r.exec(s) ;
      // get the text substring between the last tag and this one

      const temp = this.subStr(s.substring(lasti, m.index), n, true, '');

      // append to the result and count the number of characters added
      result += temp;
      const length = temp.replace(/[^\x00-\xff]/g, 'mm').length;
      n -= length;

      lasti = r.lastIndex;
      // console.log("加额外东西",_n,totalLength,n);
      // if (n <= 0) {
      //   if (_n / 2 < totalLength) {
      //     result += '...';
      //   }
      // }

      if (n > 0) {
        result += m[0];
        if (m[1].indexOf('/') === 0) {
          // if this is a closing tag, than pop the stack (does not account for bad html)
          stack.pop();
        } else if (m[1].lastIndexOf('/') !== m[1].length - 1) {
          // if this is not a self closing tag than push it in the stack
          stack.push(m[1]);
        }
      }
    }
    // console.log({s})
    // if (r.exec(s) === null) {

    // 增加最后的文字
    n = n / 2;

    result += s.substr(lasti, n);
    // if (_n / 2 < totalLength) {
    //   result += '...';
    // }
    /**
     * @date 2019-1-7
     * @author zhengkun
     * @reason 修改添加多余...的bug
     */
    if (N < this.getRealLength(this.striptags(s))) {
      result += '...';
    }
    // }

    // add the remainder of the string, if needed (there are no more tags in here)
    // if (n > 0) {

    //

    // }

    /**
     * 判断是否增加...
     */
    // console.log({
    //   result,
    //   _n,
    //   totalLength
    // })


    // fix the unclosed tags
    while (stack.length) {
      result += '</' + stack.pop() + '>';
    }
    return result;

  },

  cursorLast(obj: any) {
    let range: any;
    if (window.getSelection) {
      obj.focus();
      range = window.getSelection();
      range.selectAllChildren(obj);
      range.collapseToEnd();
      }
      // else if (document.selection) {
      //   range = document.selection.createRange();
      //   range.moveToElementText(obj);
      //   range.collapse(false);
      //   range.select();
      // }
  },

  isCrossOrigin(src: any) {
    return window.location.protocol === 'http:' || src.indexOf('//pic.allhistory.com') < 0;
  },

  // 正则替换，并添加escape
  replaceByRegexp(str: any, substr: any, rep: any) {
    const re = new RegExp(substr.replace(/[-/\\^$*+?.()|[\]{}]/g, ''), 'gi');
    return str.replace(re, rep);
  },

  // 获取描述（截取文章正文）
  getDesc(str: any) {
    return this.subStr(this.striptags(str), 100);
  },
};
