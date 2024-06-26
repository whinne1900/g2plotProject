export const isNumber = (value:any):boolean => {
  return Object.prototype.toString.call(value) === '[object Number]';
}

export const isDate = (value:object):boolean => {
  if(typeof value === 'string') {
    value = new Date(value)
  }
  return Object.prototype.toString.call(value) === '[object Date]';
}

export const containsChinese = (str:string) => {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(str);
}

export const formatDate = (val:Date) => {
  const today = new Date(val);
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 注意月份从0开始，所以要加1
  let monthstr = ''
  if(month<10) {
    monthstr = '0' + month
  } else {
    monthstr = month.toLocaleString()
  }
  const date = today.getDate();
  let datestr = ''
  if(date<10) {
    datestr = '0' + date
  } else {
    datestr = date.toLocaleString()
  }
  return year+'-'+monthstr+'-'+datestr
}

export const getMonthAndDate = (value:string):string => {
  if(value) {
    let str = value.split('-')
    return str[1]+'-'+str[2]
  } else {
    return ''
  }
}