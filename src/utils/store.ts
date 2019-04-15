export function setStorageItem(id: any, key: any, value: any) {
  let appData = window.localStorage.__ahApp__;
  if (!appData) {
    appData = {};
    appData[id] = {};
  } else {
    appData = JSON.parse(appData);
    if (!appData[id]) {
      appData[id] = {};
    }
  }
  appData[id][key] = value;
  window.localStorage.__ahApp__ = JSON.stringify(appData);
}

export function getStorageItem(id: any, key: any, def: any) {
  let appData = window.localStorage.__ahApp__;
  if (!appData) {
    return def;
  }
  appData = JSON.parse(appData)[id];
  if (!appData) {
    return def;
  }
  const val = appData[key];
  return val || def;
}

export function deleteStorageItem(id: any, key: any) {
  let appData = window.localStorage.__ahApp__;
  if (!appData) {
    return;
  } else {
    appData = JSON.parse(appData);
    if (appData[id]) {
      delete(appData[id][key]);
    }
    window.localStorage.__ahApp__ = JSON.stringify(appData);
  }
}

export function setSessionStorageItem(name: any, key: any, value: any) {
  let page = window.sessionStorage.__ahPage__;
  if (!page) {
    page = {};
    page[name] = {};
  } else {
    page = JSON.parse(page);
    if (!page[name]) {
      page[name] = {};
    }
  }
  page[name][key] = value;
  window.sessionStorage.__ahPage__ = JSON.stringify(page);
}

export function getSessionStorageItem(name: any, key: any, def: any) {
  let page = window.sessionStorage.__ahPage__;
  if (!page) {
    return def;
  }
  page = JSON.parse(page)[name];
  if (!page) {
    return def;
  }
  const val = page[key];
  return val || def;
}

export function deleteSessionStorageItem(name: any, key: any) {
  let page = window.sessionStorage.__ahPage__;
  if (!page) {
    return;
  }
  page = JSON.parse(page)[name];
  if (page) {
    delete(page[key]);
  }
  window.sessionStorage.__ahPage__ = JSON.stringify(page);
}
