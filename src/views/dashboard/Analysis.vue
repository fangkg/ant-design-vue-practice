<template>
  <div>
    <Chart :option="chartOption" style="height: 400px;"/>
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import random from "lodash/random";

export default {
  data() {
    return {
      chartOption: {
        title: {
            text: "Echarts 入门实例"
        },
        tooltip: {},
        xAxis: {
            data: ["A", "B", "C", "D", "E"]
        },
        yAxis: {},
        series: [
            {
                name: "a",
                type: "bar",
                data: [2, 44, 6, 77, 12]
            }
        ]
      }
    }
  },
  components: {
    Chart
  },
  mounted() {
    this.interval = setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100)) 
      // 如果不深度监听chartOption 可以普通监听然后手动修改chartOption变为一个心值
      // this.chartOption = { ...this.chartOption }
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}

</script>
<style>
</style>