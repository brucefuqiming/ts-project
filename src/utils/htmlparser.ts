/**
 * // Use like so:
 * htmlDecode(string)
 */

export default {
  attrWhiteListTest(name: any) {
    return (
      /^(style|class|id|ref-id|type|cite-id|border|border-spacing|note-id|contenteditable|data-[-a-z]+)$/).test(name,
    );
  },
  formatLink(html = '') {
    html = html || '';
    html = typeof html === 'string' ? html : String(html);
    html = html.replace(
      /(\shref=")\?id=([0-9a-zA-Z]*)(&amp;language=cn|&language=cn)?([^>]+)(>)/ig,
      '$1/detail/$2$4 data-id="$2"$5').replace('target="_blank"', '',
    );

    const dom = document.createElement('div');
    dom.innerHTML = html;
    dom.querySelectorAll('img').forEach((item: any) => {
      item.setAttribute('preview', '1');
      const sibling = item.parentNode.querySelector('.dls-image-capture');
      if (sibling && sibling.classList && sibling.classList.contains('dls-image-capture')) {
        item.setAttribute('preview-text', sibling.innerText);
      }
    });

    return dom.innerHTML;
  },
  removeReferences(html: any) {
    const $html = document.createElement('div');
    $html.innerHTML = html;
    let refss: any = $html.querySelectorAll('.sup-reference,.sup-ref,.sup-note');
    refss = Array.from(refss);
    refss.forEach((item: any) => {
      item.parentNode.removeChild(item);
    });
    return $html.innerHTML;
  },
  htmlDecode(html = '') {
    html = html || '';
    html = typeof html === 'string' ? html : String(html);
    return html.replace(
      /&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      .replace(/&apos;/g, '\'').replace(/&#039;/g, '\'').replace(/&grave;/g, '`',
    );
  },
  htmlEncode(html = '') {
    html = html || '';
    html = typeof html === 'string' ? html : String(html);
    return html.replace(
      /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').
      replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&grave;',
    );
  },
};
