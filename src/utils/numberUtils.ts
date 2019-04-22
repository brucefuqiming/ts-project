export const getFileSizeByUnit = (bytes: number) => {

  if (bytes < 102.4) {
    return bytes + 'B';
  }

  const kbytes = (bytes / 1024);
  if (kbytes < 102.4) {
    return kbytes.toFixed(1) + 'KB';
  }

  const mbytes = (kbytes / 1024);
  if (mbytes < 102.4) {
    return mbytes.toFixed(1) + 'MB';
  }

  const gbytes = (mbytes / 1024).toFixed(1) as any;
  if (gbytes < 102.4) {
    return gbytes.toFixed(1) + 'GB';
  }
};
export const changeNumberHandle = (number: any) => {
  class CHange {
    public ary0 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    public ary1 = ['', '十', '百', '千'];
    public ary2 = ['', '万', '亿', '兆'];
    public name = '';
    public init(name: any) {
      this.name = name;
    }
    public strrev(): string {
      const ary = [];
      for (let i = this.name.length; i >= 0; i--) {
        ary.push(this.name[i]);
      }
      return ary.join('');
    }
    public pri_ary() {
      const $this = this;
      const ary = this.strrev();
      let zero = '';
      let newary = '';
      let i4 = -1;
      for (let i = 0; i < ary.length; i++) {
        if (i % 4 === 0) {
          i4++;
          newary = this.ary2[i4] + newary;
          zero = '';
        }
        if (ary[i] === '0') {
          switch (i % 4) {
            case 0:
              break;
            case 1:
            case 2:
            case 3:
              if (ary[i - 1] !== '0') {
                zero = '零';
              }

              break;
          }

          newary = zero + newary;
          zero = '';
        } else {
          newary = this.ary0[parseInt(ary[i], undefined)] + this.ary1[i % 4] + newary;
        }

      }
      if (newary.indexOf('零') === 0) {
        newary = newary.substr(1);
      }
      return newary;
    }
  }
  class Change extends CHange {
    constructor(nm: any) {
      super();
      this.init(this.name);
    }
  }
  const k = new Change(number.toString());
  return k.pri_ary();
};
// 将给定字符串转化为[0, number)中的随机整型
export const hashStringToRange = (str: string, number: number) => {
  if (!str) {
    return 0;
  }
  const len = str.length;
  let sum = 0;
  if (len === 1) {
    sum = str.charCodeAt(0);
  } else {
    sum = str.charCodeAt(0) + str.charCodeAt(len - 1);
  }
  const num = (number !== 0) ? number : 1;
  return sum % number;
};
