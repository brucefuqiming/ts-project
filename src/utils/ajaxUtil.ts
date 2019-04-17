import axios from 'axios';
import {getFingerPrint} from './fnUtil';
import {setStorageItem, getStorageItem} from './store';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
const lang = 'cn';

// const domainName = '__ALLHISTORY_HOSTNAME__';
const domainName = 'http://10.4.40.168';

// http post
export const postJson = (url: string, params: any = '', config?: any) => {
  params = Object.assign({
    language: lang,
  }, params);
  return sendRequest(url, 'post', params, config);
};

// http get
export const getJson = (url: string, params = '', config?: any) => {
  return sendRequest(url, 'get', params, config);
};

async function getID() {
  let id = getStorageItem('dls-unlogin', 'FRONT_FP', false);
  if (!id) {
    const obj: any = await getFingerPrint();
    id = obj.hash;
    setStorageItem('dls-unlogin', 'FRONT_FP', obj.hash);
    // setStorageItem('dls-unlogin', 'FRONT_FP_DETAIL', obj.components);
  }
  return id;
}

function sendRequest(url: string, type: string, params = '', config?: any): Promise<any> {
  // 默认配置
  config = Object.assign({
    // 是否请求本地接口（api被不可被设置为本地）
    local: false,
    // 是否需要方式重复操作，重复请求
    once: true,
    // 是否需要序列化
    stringify: true,
  }, config);


  // 以下条件全部满足，才使用dataCenter的接口
  if (
    (url.indexOf('http') !== 0) &&
    (url.indexOf('//') !== 0) &&
    !config.local
  ) {
    url = domainName + url;
  }

  // set defer
  return new Promise((resolve, reject) => {
    if (type === 'post' && config.stringify) {
      params = JSON.stringify(params);
    }

    getID().then((fpid) => {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charse=UTF-8';
      axios.defaults.headers.post.fpid = fpid;
      const reqConfig = {
        url,
        data: params,
        method: type,
        // timeout: 3000,
        // contentType: 'application/json;charset=UTF-8',
        async: config.async === false ? false : true,
        crossDomain: true,
      };
      axios(reqConfig).then((resp: AxiosResponse) => {
        switch (resp.data.code) {
          case 200:
          case 201:
          resolve(resp.data.data);
          break;
          case 401:
          case 403:
          default:
          reject(resp.data);
        }
      }, (err: AxiosError) => {
        reject(err);
      }).catch((resp: AxiosResponse) => {
        switch (resp.data.status) {
          case 401:
            console.log('账户过期');
            reject(resp.data);
            break;
          case 403:
          default:
            // window.location.href = 'https://www.allhistory.com/staticPage/download'
            reject(resp.data);
        }
      });
    });
  });
}
