export const getUrlQueryMessage = (params = window.location.search) => {
  params = decodeURIComponent(params);
  const obj: any = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = params.match(reg);
  if (arr) {
    arr.forEach((item) => {
      const tmpArr = item.substr(1).split('=');
      const key = tmpArr[0];
      const val = tmpArr[1];
      obj[key] = val;
    });
  }
  return obj;
};

export const getUrlHashMessage = (params = window.location.hash) => {
  params = decodeURIComponent(params);
  const obj: any = {};
  const reg = /[#&][^?&]+=[^?&]+/g;
  const arr = params.match(reg);
  if (arr) {
    arr.forEach((item) => {
      const tmpArr = item.substr(1).split('=');
      const key = tmpArr[0];
      const val = tmpArr[1];
      obj[key] = val;
    });
  }
  return obj;
};

export const setUrlHashMessage = (params: any = {}) => {
  let hash = '';
  const keys = Object.keys(params);
  keys.forEach((key) => {
    const val: any = String(params[key]);
    hash += `&${key}=${val}`;
  });
  return hash ? hash.replace('&', '#') : '';
};

export const getHash = (url: any) => {

  return url.match('#.*') ? url.match('#.*')[0] : '';
};

export const getOriginUrl = (url: string) => {
  return url.replace(/\/?[?#].*/, '');
};

export const getUrlParam = (url: string, key: any) => {
  const params = getUrlQueryMessage(url);
  return params[key];
};

/**
 *
 * @param {*} url
 * @param {*} key Object || String
 * @param {*} value String?
 */
export const setUrlParam = (url: any, key: any, value: any) => {
  if (!url) {
    return '';
  }
  const hash = getHash(url);
  const params: any = getUrlQueryMessage(url);
  const originUrl = getOriginUrl(url);
  if (key instanceof Object) {
    for (const k in key) {
      if (key.hasOwnProperty(k)) {
        params[k] = key[k];
      }
    }
  } else {
    params[key] = value;
  }

  let paramsStr: any = [];
  for (const keys in params) {
    if (params[keys] || params[keys] === 0) {
      paramsStr.push(`${keys}=${params[keys]}`);
    }
  }
  paramsStr = '?' + paramsStr.join('&');
  return originUrl + paramsStr + hash;
};

/**
 * 设置一组值
 */
export const setUrlParams = (url: any, keyValues: any = {}) => {

  for (const key in keyValues) {
    if (keyValues.hasOwnProperty(key)) {
      let value = keyValues[key];
      if (value instanceof Array) {
        value = value.join(',');
      }
      url = setUrlParam(url, key, value);
    }

  }
  return url;
};

export const getUrlEntryId = (url: string) => {
  const match = url.replace(window.location.origin, '').match(/^\/detail\/([^/?]*)([^/]*)$/);
  if (match && match[1]) {
    return match[1];
  }
};
