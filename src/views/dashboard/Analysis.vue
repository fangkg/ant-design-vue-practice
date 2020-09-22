<template>
  <div>
    {{ $t("message")["app.dashboard.analysis.timeLabel"] }}
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height: 400px;"/>
  </div>
</template>

<script>
import Chart from "../../components/Chart";
// import random from "lodash/random";
// import axios from "axios";
import request from "../../utils/request"

export default {
  data() {
    return {
      chartOption: {}
    }
  },
  components: {
    Chart
  },
  methods: {
    getChartData() {
      // 使用封装request
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      }).then(res => {
          this.chartOption = {
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
                    data: res.data
                }
            ]
          }
        });
      // 使用axios
      // axios.get("/api/dashboard/chart", { params: { ID: 12345 } })
    }
  },
  mounted() {
    // 初始图表
    this.getChartData()
    this.interval = setInterval(() => {
      this.getChartData()
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100)) 
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