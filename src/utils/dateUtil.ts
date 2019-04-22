export const mergeDateTime = (date: Date, time: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  );
};

export const getDateDiff = (dateTimeStamp: any) => {
  dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi, '/'));
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  let result = '';
  if (monthC >= 1) {
    result = '' + monthC + '月前';
  } else if (weekC >= 1) {
    result = '' + weekC + '周前';
  } else if (dayC >= 1) {
    result = '' + dayC + '天前';
  } else if (hourC >= 1) {
    result = '' + hourC + '小时前';
  } else if (minC >= 1) {
    result = '' + minC + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
};

// 计算与当前时间文本
export const timeFromNow = (time: Date) => {
  let _time;
  if (time instanceof Date) {
    _time = +new Date();
  } else {
    _time = parseInt(time, undefined);
  }
  if (!_time) {
    return time;
  }

  const _now = +new Date();
  const during = _now - _time - 28800000;

  const _date = new Date(during);
  // console.log(_date)
  const date = new Date(_time);
  const secoundCond = new Date(-28800000);
  secoundCond.setMinutes(10);
  const minuteCond = new Date(-28800000);
  minuteCond.setMinutes(59);
  const hourCond = new Date(-28800000);
  hourCond.setHours(23);

  if (during < secoundCond.getTime()) {
    return '刚刚';
  } else if (during < minuteCond.getTime()) {
    return _date.getMinutes() + '分钟前';
  } else if (during < hourCond.getTime()) {
    return _date.getHours() + '小时前';
  }

  return (
    (date.getFullYear() !== new Date().getFullYear()
      ? date.getFullYear() + '年'
      : '') +
    (date.getMonth() + 1) +
    '月' +
    date.getDate() +
    '日 ' +
    (date.getHours() < 10 ? '0' + date.getHours() : +date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : +date.getMinutes())
  );
};

// 简单的格式化时间字符串
export const cleanDate = (timeText: any) => {
  const time = (timeText + '').replace(
    /(^0*)|(-00-00)|(-00$)|(00:){1,2}|(00$)/gi,
    '',
  );
  return time.trim();
};

// 清理字符串并且转换公元前
export const cleanDateTime = (timeText: any, i18n = { BC: '-' }) => {
  i18n = Object.assign({ BC: 'BC ' }, i18n);
  let time = timeText.replace(/(^-0*)|(^-)/, i18n.BC + '');
  time = time.replace(
    /(^0*)|(-00-00)|(-00[$\s])|(:00:00$)|(00:){1,2}|(:00$)|(00$)/gi,
    '',
  );
  if (time.substring(time.length - 1, time.length) === '-') {
    time = time.substring(0, time.length - 1);
  }
  return time.trim();
};

// 结构化时间字符串{ADBC: "", year: "1630", month: "11", date: "15"}
export const dateParser = (timeText: string, i18n = { BC: 'BC' }) => {
  if (!timeText) {
    return;
  }
  const rs: any = {};
  // convert date string to object
  const splitString = timeText
    .replace(
      /^(-)?(\d{1,14})-?(\d{1,2})?-?(\d{1,2})?\s?(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?/gi,
      'adbc:$1,year:$2,month:$3,date:$4,hour:$5,min:$6,sec:$7',
    )
    .split(',');

  splitString.forEach((item: any) => {
    const tmp: string[] = item.split(':');


    if (tmp[1] === '00') {
      tmp[1] = '';
    }
    rs[tmp[0]] = tmp[1];
  });

  rs.yearWithAdbc = rs.adbc + rs.year;
  rs.abdcType = rs.adbc === '-' ? '-1' : 1;
  rs.adbc = rs.adbc === '-' ? i18n.BC : '';
  // rs.year && (rs.year = rs.year.replace(/^0*/, ''));
  if (rs.year) {
    rs.year = rs.year.replace(/^0*/, '');
  }
  // {adbc: "",abdcType:1, year: "1630", month: "11", date: "15"}

  return rs;
};

// 获取当前时间字符串
export const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear(); // 年
  const month = now.getMonth() + 1; // 月
  const day = now.getDate(); // 日
  const hh = now.getHours(); // 时
  const mm = now.getMinutes(); // 分
  let clock = year + '-';
  if (month < 10) {
    clock += '0';
  }
  clock += month + '-';
  if (day < 10) {
    clock += '0';
  }
  clock += day + ' ';
  if (hh < 10) {
    clock += '0';
  }
  clock += hh + ':';
  if (mm < 10) {
    clock += '0';
  }
  clock += mm;
  return clock;
};

// 转换为年月日, useSimple 表示是否采用简写（即亿年、千万年、百万年等)
export const cleanDateTimeStandard = (timeText: string, i18n = { BC: '公元前' }) => {
  i18n = Object.assign({ BC: '公元前' }, i18n);
  let time = timeText.trim().replace(/(^-0*)|(^-)/, i18n.BC + ' ');
  time = time.replace(
    /(^0*)|(-00-00)|(-00)|(-0-00)|(-0-0)|(-0$)|(00:00:00){1,2}|(:00$)/gi,
    '',
  );
  const timeArr = time.split('-');
  let timeStr = '';
  if (!!timeArr[0] && timeArr[0] !== ' ' && timeArr[0] !== i18n.BC + '  ') {
    timeStr += timeArr[0] + '年';
  }
  if (timeArr[1]) {
    timeStr += timeArr[1] + '月';
  }
  if (timeArr[2]) {
    const day = timeArr[2].split(' ')[0];

    timeStr += day + '日';
    if (timeArr[2].split(' ')[1]) {
      timeStr += timeArr[2].split(' ')[1];
    }
    // timeStr+=day+"日"+' '+timeArr[2].split(" ")[1];
    // console.log(timeArr[2].split(" "),timeArr[2].split(" ")[1])
  }
  // console.log(timeStr)
  return timeStr;
};

// 解析时间对象
export const timeStantard = (timeObject: any) => {
  if (!timeObject) {
    return '';
  }
  const start = cleanDateTimeStandard(timeObject.startTime || '');
  const end = cleanDateTimeStandard(timeObject.endTime || '');
  timeObject.startNote = timeObject.startNote || '';
  timeObject.endNote = timeObject.endNote || '';
  timeObject.timeDesc = timeObject.timeDesc || '';
  let result = '';

  if (!!start && !!end) {
    if (timeObject.startNote) {
      result += `(${timeObject.startNote})`;
    }

    result += start;

    result += ' - ';

    if (timeObject.endNote) {
      result += `(${timeObject.endNote})`;
    }

    result += end;
  } else if (end) {
    result = timeObject.endNote ? `(${timeObject.endNote})${end}` : end;
  } else if (start) {
    if (timeObject.startNote) {
      if (timeObject.startNote !== '0') {
        result = `(${timeObject.startNote})${start}`;
        if (timeObject.endNote === '至今') {
          result += ' - 至今';
        }
      } else {
        result = start;
      }
    } else {
      if (!!timeObject.endNote && timeObject.endNote === '至今') {
        result = start + ' - 至今';
      } else {
        result = start;
      }
    }
  } else if (timeObject.endNote === '至今') {
    result += '至今';
  } else if (timeObject.timeDesc) {
    result = timeObject.timeDesc;
  }
  return result;
};

/**
 * 根据时间戳输出输出特定时间格式，new Date().getTime() > 0
 * @param {Time} time 时间戳 new Date()
 * @param {String} fmt 输出格式 'YYYY-MM-dd hh:mm:ss'或'MM-dd hh:mm'等
 */
export const dateFormat = (time: Date, fmt: any) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  const obj: any = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
  };
  for (const key in obj) {
    if (new RegExp(`(${key})`).test(fmt)) {
      const str = obj[key] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length),
      );
    }
  }
  return fmt;
};

// 转化为.
export const cleanDateTimeStandardWithDot = (timeText: string, i18n = { BC: 'BC' }) => {
  i18n = Object.assign({ BC: 'BC' }, i18n);
  let time = timeText.replace(/(^-0*)|(^-)/, i18n.BC + ' ');
  time = time.replace(/(^0*)|(-00-00)|(-00$)|(-00\s)|(00:){1,2}|(00$)/gi, '');
  const timeArr = time.split('-');
  let timeStr = timeArr[0];
  if (timeArr[1]) {
    timeStr += '.' + timeArr[1];
  }
  if (timeArr[2]) {
    timeStr += '.' + timeArr[2];
  }
  return timeStr.trim();
};

// 字符串转换为Date对象
export const convertToDateObj = (str: string) => {
  const dateo = dateParser(str);
  const date = new Date(
    dateo.year,
    dateo.month - 1,
    dateo.date,
    dateo.hour,
    dateo.min,
    dateo.sec,
  );
};

/**
 * 比较时间大小 1: time1 大， -1 time1 小，0 相等
 * @param {String} time1 需要比较的时间
 * @param {String} time2 需要比较的时间
 */
export const compareTime = (time1: any, time2: any) => {
  let rs = 0;
  time1 = dateParser('' + time1);
  time2 = dateParser('' + time2);
  // console.log(time1, time2)

  if (time1.adbc !== time2.adbc) {
    return time1.adbc > time2.adbc ? -1 : 1;
  }

  const reverser = time1.adbc === 'BC' ? -1 : 1;

  let i = 0;
  for (const key in time1) {
    if (key === 'adbc') {
      continue;
    }

    const a = parseInt(time1[key], undefined);
    const b = parseInt(time2[key], undefined);
    if (isNaN(a) && !isNaN(b)) {
      rs = -1;
      break;
    }
    if (isNaN(b) && !isNaN(a)) {
      rs = 1;
      break;
    }
    if (isNaN(a) && isNaN(b)) {
      rs = 0;
      break;
    }

    if (a > b) {
      rs = 1;
      if (i === 0) {
        rs = rs * reverser;
      }
      break;
    } else if (a < b) {
      rs = -1;
      if (i === 0) {
        rs = rs * reverser;
      }
      break;
    }
    i++;
  }

  return rs;
};

// 时间字符串数组，取最大最小值
export const DateMaxMin = (times = []) => {
  let max: any;
  let min: any;

  if (!times || !times.length) {
    console.warn('DateMaxMin miss params');
    return;
  }

  times = times.filter((time) => !!time && !!cleanDate(time));

  min = max = times[0];

  // console.log({times});

  times.forEach((time, index) => {
    if (index < 1) {
      return;
    }

    const time2 = times[index];

    const rsMax = compareTime(max, time2);
    const rsMin = compareTime(min, time2);

    if (rsMax <= 0) {
      max = time2;
    }

    if (rsMin >= 0) {
      min = time2;
    }
  });

  // console.log({max,min})
  return { max, min };
};

/**
 * 转换年份字符串到数字
 * @param {String} year 年份 "BC1990" "AD890" "890" "-980", '1900BC'
 */
export const getYearNumFromStr = (year: any) => {
  if (typeof year !== 'string') {
    return '';
  }
  if (year.indexOf('BC') !== -1) {
    year = year.replace('BC', '');
    year = -year;
  } else if (year.indexOf('AD') === 0) {
    year = year.replace('AD', '');
  }
  year = parseInt(year, undefined);
  year = year ? year : '';
  return year;
};

/**
 * 转换年份数字到字符串
 * @param {Number} year
 */
export const getYearStrFromNum = (year: any, position = true) => {
  if (typeof year !== 'number' || year === 0) {
    return 0;
  }
  year = parseInt(year + '', undefined);
  year = position
    ? year < 0
      ? `${-year}BC`
      : `${year}AD`
    : year < 0
    ? `BC${-year}`
    : `AD${year}`;
  return year;
};
