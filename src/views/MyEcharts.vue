<template>
  <div class="container">
    <div class="echarts">
      <div id="echarts_con"></div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from "echarts";

onMounted(() => {
  const echarts_con = echarts.init(document.getElementById("echarts_con"));
  echarts_con.setOption({
    title: {
      text: "近30天订单数量",
      left: 10,
      top: 10,
      textStyle: {
        //主标题文字样式
        color: "#505050", //字体颜色
        fontSize: 15, //字体大小
        // fontStyle:'italic',//斜体
        fontWeight: 500 //加粗
      }
    },
    grid: {
      left: "5%",
      right: "10%",
      top: "20%",
      bottom: "15%",
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: "axis"
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#9a9a9a"
          }
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          color: "#9a9a9a",
          margin: 6
        },
        splitLine: {
          show: false
        },
        boundaryGap: ["5%", "5%"],
        data: xData.value
      }
    ],
    yAxis: [
      {
        type: "value",
 
        axisLabel: {
          color: "#9a9a9a",
          margin: 6
        },
        splitLine: {
          lineStyle: {
            color: "#9a9a9a",
            type: "dashed"
          }
        }
      }
    ],
    series: [
      {
        name: "订单量",
        type: "line",
        stack: "总量",
        symbol: "circle",
        data: arr.value,
        symbolSize: 6,
        itemStyle: {
          color: "#3a8bef",
          borderColor: "#3a8bef",
          borderWidth: 2
        }
      }
    ]
  });
})
</script>

<style lang="scss" scoped>
.echarts {
  margin: auto;
  border-radius: 8px;
  margin-top: 20px;
  width: 97%;
  background-color: white;
  height: 300px;
  #echarts_con {
    width: 100%;
    height: 100%;
  }
}
</style>
