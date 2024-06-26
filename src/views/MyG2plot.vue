<!-- 分组柱状图加折线图，混合图 -->
<template>
  <div class="home-page">
    <el-upload class="uploaddemo" @change="uploadChange" :auto-upload="false">
      <el-button type="primary">点击上传</el-button>
    </el-upload>
    <el-row>
      <el-col :span="8">
        <el-select v-model="selectMonth" clearable placeholder="Select Month">
          <el-option
            v-for="item in monthList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    

    <div id="container" ref="chartContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
// import SparkMD5 from 'spark-md5'
import { DualAxes } from '@antv/g2plot';
import * as XLSX from 'xlsx';
import {ElMessage} from 'element-plus';
import { isNumber, isDate, formatDate, getMonthAndDate } from '@/utils/tools';
import { useStore } from "@/store/index";
const mainStore = useStore();

type Sobj = {
  curDate?:string; // 日期
  type?: string; // 机型
  remark?: string; // 备注
  total?: number; // 总投入量
  finishedProduct?: number; // 成品
  defectiveProducts?: number; // 不良品
  straightThroughRate?: number; // 直通率
}

interface Listobj {
  sheetName?:string ;
  datas?:Array<Sobj>;
}
interface monthobj {
  label:string;
  value:string;
}

let excelData = null
let chartInstance:any = null;
const chartContainer = ref(null);
let selectMonth = ref('')
let monthList = ref<monthobj[]>([])
// excel原始数据
let currentList = ref<Listobj[]>([])
// 格式化后的数据
let list = ref<Listobj[]>([])
// 图表数据
let chartData:any = ref([])
// 柱状图数据
let uvBillData:any = ref([])
// 折线图数据
let transformData:any = ref([])
watch(
  () => selectMonth.value,
  (newVal, oldVal) => {
    if(newVal) {
      mainStore.setCurrent(newVal)
      list.value.forEach(item => {
        if(item.sheetName === newVal) {
          chartData.value = item.datas
        }
      })
      console.log('chartData.value', chartData.value)
      handleChartData()
    }
  }
)

const fetchExcelData = async () => {
  const response = await fetch('../data/excel-data.json');
  excelData = await response.json();
  console.log('fetchExcelData===excelData', excelData)
  if(excelData.length > 0) {
    monthList.value.length = 0
    let list:Array<object> = []
    for(let i=0;i<excelData.length;i++) {
      monthList.value.push({
        label: excelData[i].sheetName,
        value: excelData[i].sheetName
      })
      let lineData:Array<object> = []
      excelData[i].datas.map((item:any) => {
        if(isDate(item['生产直通率及不良统计日报']) || isNumber(item['生产直通率及不良统计日报'])) {
          lineData.push(item);
        }
      });
      selectMonth.value = monthList.value[0]!.value
      mainStore.setMonthlist(monthList.value)
      mainStore.setCurrent(selectMonth.value)
      list.push({
        sheetName: excelData[i].sheetName,
        datas: lineData
      })
    }
    currentList.value = list;
    handleSortData();
  }
}

const handleChartData = () => {
  let totalData:any = [];
  let finishData:any = []
  transformData.value.length = 0
  uvBillData.value.length = 0
  chartData.value.map((item:Sobj, idx:number) => {
    transformData.value.push({
      time: getMonthAndDate(item!.curDate),
      throughRate: (item!.straightThroughRate*100).toFixed(2)
    })
    totalData.push({
      type: 'totals',
      time: getMonthAndDate(item!.curDate),
      value: item.total
    })
    finishData.push({
      type: 'finishs',
      time: getMonthAndDate(item!.curDate),
      value: item.finishedProduct
    })
  });
  uvBillData.value = [...totalData, ...finishData ]
  console.log('uvBillData.value', uvBillData.value)
  chartInstance.changeData([uvBillData.value, transformData.value])
}

const uploadChange = (e:any) => {
  if (e.status !== 'ready') return   // 防止触发两次
  if (e.length <= 0) {
    ElMessage.warning('请选择文件')
  } else if (e.name.split('.')[1] !== 'xlsx') {
    ElMessage.warning('上传格式不正确，请上传xlsx格式')
  } else {
    const file = e.raw
    // let v = new FormData()
    // v.append('file', '9999999999')
    // console.log(v)
    // const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = async (ev:any) => {
      let data = ev.target.result
      console.log(data, '这里是文件流')
      const workbook = XLSX.read(data, { type: 'binary', cellDates: true })
      let sheetLen = workbook.SheetNames
      console.log('workbook.SheetNames', sheetLen)
      monthList.value.length = 0
      let list = []
      for(let i=0;i<sheetLen.length;i++) {
        const wsname = workbook.SheetNames[i]
        const getData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
        // console.log('getData', getData)
        let lineData:Array<object> = []
        getData.map((item:any) => {
          if(isDate(item['生产直通率及不良统计日报'])) {
            lineData.push(item);
          }
        });
        monthList.value.push({
          label: workbook.SheetNames[i],
          value: workbook.SheetNames[i]
        })
        selectMonth.value = monthList.value[0]!.value
        mainStore.setMonthlist(monthList.value)
        mainStore.setCurrent(selectMonth.value)
        list.push({
          sheetName: workbook.SheetNames[i],
          datas: lineData
        })
      }
      // console.log('newData', list);
      currentList.value = list;
      handleSortData();
    }
  }
}

const handleSortData = () => {
  console.log('excel数据', currentList.value);
  let listarr:Listobj[] = []
  currentList.value.map((item:Listobj, idx:number):void => {
    listarr.splice(idx, 0, {sheetName: item.sheetName, datas: []})
    const itemDatas = item.datas;
    itemDatas!.forEach((curitem:any):void => {
      let curobj:Sobj = {
        curDate: formatDate(curitem['生产直通率及不良统计日报']), // 日期
        type: curitem.__EMPTY, // 机型
        remark: curitem.__EMPTY_1, // 备注
        total: curitem.__EMPTY_2, // 总投入量
        finishedProduct: curitem.__EMPTY_3, // 成品
        defectiveProducts: curitem.__EMPTY_4, // 不良品
        straightThroughRate: curitem.__EMPTY_5 // 直通率
      };
      listarr[idx]!.datas!.push(curobj)
    })
  })
  list.value  = listarr
  mainStore.setExcels(list.value)
  console.log('格式化后的数据', listarr);
}

const paintChart = () => {
  chartInstance = new DualAxes('container', {
    data: [uvBillData.value, transformData.value], // [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'throughRate'],
    yAxis: {
      label: {
        
      },
      autoHide: {
        minLimit: 0,
      },
      line: {

      },
      tickLine: {

      },
      subTickLine: {
        count: 10,
        length: 0.1
      },
      tickInterval: 0.1
    },
    legend: {
      layout: 'vertical',
      // marker: {
      //   style: {
      //     // 非激活，不可点击态时的填充色设置
      //     inactiveFill: '#000',
      //     inactiveOpacity: 0.45,
      //     // 默认填充色设置
      //     fill: '#000',
      //     opacity: 0.8,
      //     size: 12,
      //   },
      // },
      // text: {
      //   style: {
      //     fill: '#ccc',
      //     fontSize: 8,
      //   },
      // },
      // itemName: {
      //   formatter: (text, item, idx) => {
      //     // console.log('text', text)
      //     // console.log('item', item)
      //     // console.log('idx', idx)
      //     return text
      //   }
      // },
      // itemValue: {
      //   formatter: (text:string, item) => {
      //     const items = transformData.filter((d) => d.type === item.value);
      //     return items.length ? items.reduce((a, b) => a + b.value, 0) / items.length : '-';
      //   },
      //   style: {
      //     opacity: 0.65,
      //   },
      // },
    },
    geometryOptions: [
      // 柱状图配置
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        label: {
          position: 'top',
        },
        marginRatio: 0.1, // 分组中，组内柱子之间的间距 [0-1]，
      },
      // 折线图配置
      {
        geometry: 'line',
        lineStyle: {
           lineWidth: 2,
        },
        // 折线数据点图形样式
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        // 折线图标签文案
        label: {
          formatter: (datum) => {
            let labelstr = datum.throughRate + '%'
            return labelstr;
          },
          style: {
            fill: '#aaa',
          },
        },
        
      },
    ],
  });

  chartInstance.render();
}

onMounted(() => {
  // console.log('mainStore.getExcels', mainStore.getExcels)
  // if(mainStore.getExcels.length > 0) {
  //   list.value = mainStore.getExcels
  // }
  // if(mainStore.getMonthlist.length > 0) {
  //   monthList.value = mainStore.getMonthlist
  // }
  
  nextTick(() => {
    paintChart()
    if(mainStore.getCurrent) {
      selectMonth.value = mainStore.getCurrent
    }

    // 每个1s刷新一次数据
    // setInterval(() => {
    //   fetchExcelData()
    // }, 1000)
    fetchExcelData()
  })
})
</script>

<style lang="scss" scoped></style>
