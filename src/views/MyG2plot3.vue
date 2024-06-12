<!-- 分组柱状图加折线图，混合图 -->
<template>
  <div id="container">
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { DualAxes } from '@antv/g2plot';

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
