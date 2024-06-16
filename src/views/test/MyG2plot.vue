<!-- 折线图 -->
<template>
  <div class="container">
    <div class="pr-3 pl-3">
      <p>近一年收益情况：</p>
      <div class="d-flex m-btn-wrapper pt-2">
        <button class="w-50 btn active">交易额</button>
        <button class="w-50 btn">余额</button>
      </div>
      <div id="container" class="pt-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Line, Datum } from "@antv/g2plot";
const data = [
  { month: "1", value: 3 },
  { month: "2", value: 4 },
  { month: "3", value: 3.5 },
  { month: "4", value: 5 },
  { month: "5", value: 4.9 },
  { month: "6", value: 6 },
  { month: "7", value: 7 },
  { month: "8", value: 9 },
  { month: "9", value: 13 },
  { month: "10", value: 53 },
  { month: "11", value: 13 },
  { month: "12", value: 123 },
];


onMounted(() => {
  const line = new Line('container', {
        data,
        xField: 'month',
        yField: 'value',
        height: 300,
        point: {
          size: 2,
          shape: 'diamond',
          style: {
            stroke: '#FE740C',
            lineWidth: 1,
            fillOpacity: 0.6,
          }
        },
        annotations: [
          {
            type: 'text',
            position: ['95%','100%'],
            content: '月',
            style: {
              fill: 'red',
            },
            top:true
          },
          {
            type: 'text',
            position: ['0%','0%'],
            content: '元',
            style: {
              fill: 'red',
            },
            top:true
          }
        ],
        tooltip: {
          formatter: (datum: Datum) => {
            return { name: datum.month + '月', value: datum.value + '元' }
          }
        }
      })
      line.render()
})
</script>

<style lang="scss" scoped></style>
