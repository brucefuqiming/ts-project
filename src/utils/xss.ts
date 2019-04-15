/**
 * 由于xss module配置比较复杂，这里定义一系列配置好type
 * @type title, summary, content
 */

import xss from 'xss';


const attrWhiteListTest = (name: any) => {
  return (/^(style|class|id|ref-id|type|cite-id|border|border-spacing|note-id|contenteditable|data-[-a-z]+)$/)
  .test(name);
};

const htmlDecode = (html = '') => {
  html = html ? html : '';
  html = typeof html === 'string' ? html : String(html);
  // console.log(html)
  return html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&apos;/g, '\'').replace(/&#039;/g, '\'').replace(/&grave;/g, '`');
};

export default function(text: any, type: any = 'title', decode = 'false') {
  const types: any = {};

  // 针对title等非常短的xss策略
  types.title = {
    whiteList: [],
    stripIgnoreTag: true, // 过滤所有非白名单标签的HTML
    stripIgnoreTagBody: ['script', 'style', 'link', 'frame'], // script标签较特殊，需要过滤标签中间的内容
  };

  // console.log("默认白名单：",xss.whiteList);

  // 针对正文，描述等较长文本的xss
  types.content = {
    onIgnoreTagAttr(tag: any, name: any, value: any, isWhiteAttr: any) {
      if (attrWhiteListTest(name)) {
        return name + '="' + xss.safeAttrValue(tag, name, value || '', {process: () => ''}) + '"';
      }
    },
    whiteList: Object.assign(xss.whiteList, {
      iframe: ['src', 'width', 'height', 'frameborder'],
      audio: ['controls', 'loop', 'preload', 'src'],
      video: ['controls', 'loop', 'preload', 'src', 'height', 'width'],
    }),
    stripIgnoreTag: true, // 过滤所有非白名单标签的HTML
    stripIgnoreTagBody: ['script', 'style', 'frame'], // script标签较特殊，需要过滤标签中间的内容
  };

  // 只保留连接
  types.onlyA = {
    whiteList: {
      a: ['href', 'data-id'],
    },
    stripIgnoreTag : true,
  };
  if (decode === 'true') {
    text = htmlDecode(text);
  }

  // return xss(text, types[type]);
  return text;
}
