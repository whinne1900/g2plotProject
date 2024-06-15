export const isDate = (value:object):boolean => {
  return Object.prototype.toString.call(value) === '[object Date]';
}
