export const isDate = (value) => {
  return Object.prototype.toString.call(value) === '[object Date]';
}
