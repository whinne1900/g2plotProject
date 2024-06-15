<!-- 分组柱状图加折线图，混合图 -->
<template>
  <div class="home-page">
    <el-upload class="uploaddemo" @change="uploadChange" :auto-upload="false">
      <el-button type="primary">点击上传</el-button>
    </el-upload>

    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { DualAxes } from '@antv/g2plot';
import * as XLSX from 'xlsx';
import {ElMessage} from 'element-plus'
import { isDate } from '@/utils/tools.js'

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
      let list = []
      for(let i=0;i<sheetLen.length;i++) {
        const wsname = workbook.SheetNames[i]
        const getData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
        // console.log('getData', getData)
        let lineData = []
        getData.map((item:object) => {
          if(isDate(item['生产直通率及不良统计日报'])) {
            lineData.push(item)
          }
        })
        list.push({
          key: workbook.SheetNames[i],
          datas: lineData
        })
        console.log('newData', list)
      }
      
    }
  }
}

onMounted(() => {
  const uvBillData = [
    { time: '2019-03', value: 350, type: 'uv'},
    { time: '2019-04', value: 900, type: 'uv'},
    { time: '2019-05', value: 300, type: 'uv' },
    { time: '2019-06', value: 450, type: 'uv' },
    { time: '2019-07', value: 470, type: 'uv' },
    { time: '2019-03', value: 220, type: 'bill' },
    { time: '2019-04', value: 300, type: 'bill' },
    { time: '2019-05', value: 250, type: 'bill' },
    { time: '2019-06', value: 220, type: 'bill' },
    { time: '2019-07', value: 362, type: 'bill' },
  ];

  const transformData = [
    { time: '2019-03', throughRate: 0.1 },
    { time: '2019-04', throughRate: 0.09},
    { time: '2019-05', throughRate: 0.08},
    { time: '2019-06', throughRate: 0.23 },
    { time: '2019-07', throughRate: 0.02 },
  ];

  const dualAxes = new DualAxes('container', {
    data: [uvBillData, transformData],
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

  dualAxes.render();
})
</script>

<style lang="scss" scoped></style>
