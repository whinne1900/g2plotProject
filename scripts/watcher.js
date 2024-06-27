import chokidar from 'chokidar';
import fs from 'fs'
import XLSX from 'xlsx';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url))

// 检查是否为有效日期
function isValidDate(date) {
  return !isNaN(Date.parse(date));
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 手动解析日期字段
const parseExcelDate = (excelDate) => {
  // Excel 序列号日期从 1900-01-01 开始
  const baseDate = new Date(1900, 0, 1);
  // 将序列号转换为毫秒
  const dateInMs = (excelDate - 1) * 24 * 60 * 60 * 1000;
  // 返回格式化的日期
  return moment(baseDate.getTime() + dateInMs).format('YYYY-MM-DD');
};

// 判断是否包含中文
function containsChinese(str) {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(str);
}

// 要监控的文件路径
const excelFilePath = path.join(__dirname, '../data/test.xlsx');

// 初始化监控器
const watcher = chokidar.watch(excelFilePath, {
  persistent: true
});

// 监听文件修改事件
watcher.on('change', path => {
  console.log(`File ${path} has been changed`);
  readExcelFile();
});

// 在使用 xlsx 库将 Excel 工作表转换为 JSON 时，默认情况下日期会被转换为字符串或整数（Excel 日期序列号）。为了防止日期格式转换为整数，你可以使用 raw 选项来确保所有单元格内容都保持原始格式（即字符串格式）。
// 读取 Excel 文件内容
function readExcelFile() {
  console.log('excelFilePath', excelFilePath)
  const workbook = XLSX.readFile(excelFilePath);
  // const workbook = XLSX.readFile(excelFilePath, { type: 'binary', cellDates: true });
  let sheetLen = workbook.SheetNames
  let list = []
  for(let i=0;i<sheetLen.length;i++) {
    const wsname = workbook.SheetNames[i]
    const getData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {
      raw: false, // 保持单元格内容的原始格式
      cellDates: true, // 保留日期格式
    })
    
    // 提取包含时间格式数据的行
    // let rowsWithDates = []
    // rowsWithDates = getData.filter(row => {
    //   return Object.values(row).some(value => isValidDate(value));
    // });

    list.push({
      sheetName: workbook.SheetNames[i],
      datas: getData
    })
  }
  console.log('监控文件数据', list)

  // 将数据保存到一个 JSON 文件或通过其他方式传递给前端
  fs.writeFileSync(path.join(__dirname, '../data/excel-data.json'), JSON.stringify(list, null, 2));
}

console.log(`Watching for changes in ${excelFilePath}`);
readExcelFile();