<template>
  <!-- <div id="main"></div> -->
  <div ref="chartDomRef" style="height: 400px;"></div>
</template>

<script>
import echarts from "echarts"
import { addListener, removeListener } from "resize-detector"
import debounce from "lodash/debounce"


export default {
    props: {
        option: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        // option(val) {
        //     this.chart.setOption(val)
        // },
        // 深度监听 当坐标轴上某个值变化时重新渲染
        option: {
            handler(val) {
                this.chart.setOption(val);
            },
            deep: true
        }
    },
    created() {
        // 防抖
        this.resize = debounce(this.resize, 300)
    },
    mounted() {
        this.renderChart();
        // 监听chartdom
        addListener(this.$refs.chartDomRef, this.resize);
    },
    beforeDestroy() {
        removeListener(this.$refs.chartDomRef, this.resize);
        // 防止内存泄漏
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        resize() {
            this.chart.resize()
        },
        renderChart() {
            // 基于准备好的dom 初始化echarts实例
            this.chart = echarts.init(this.$refs.chartDomRef)
            // option从父组件传入
            this.chart.setOption(this.option)
        }
    }
}

</script>
<style>
</style>