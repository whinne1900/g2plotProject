import chokidar from 'chokidar';
import fs from 'fs'
import XLSX from 'xlsx';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url))

// 手动解析日期字段
const parseExcelDate = (excelDate) => {
  // Excel 序列号日期从 1900-01-01 开始
  const baseDate = new Date(1900, 0, 1);
  // 将序列号转换为毫秒
  const dateInMs = (excelDate - 1) * 24 * 60 * 60 * 1000;
  // 返回格式化的日期
  return moment(baseDate.getTime() + dateInMs).format('YYYY-MM-DD');
};

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

// 读取 Excel 文件内容
function readExcelFile() {
  console.log('excelFilePath', excelFilePath)
  const workbook = XLSX.readFile(excelFilePath);
  let sheetLen = workbook.SheetNames
  let list = []
  for(let i=0;i<sheetLen.length;i++) {
    const wsname = workbook.SheetNames[i]
    const getData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
    for(let key in getData) {
      if (moment(getData[key], moment.ISO_8601, true).isValid()) {
        getData[key] = parseExcelDate(getData[key])
      }
    }
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