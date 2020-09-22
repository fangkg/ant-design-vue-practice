<template>
  <div style="text-align: center;">
    <IconFont type="icon-icon-404" style="font-size: 100px"/>
    <!-- <img :src="logo" alt="h5"> -->
    <HTMLLogo/>
  </div>
</template>

<script>
// 在vue.config.js中配置了vue-svg-loader之后 引入的为一个组件
import HTMLLogo from "@/assets/h5.svg"
export default {
  components: {
    HTMLLogo
  },
  data() {
    return {
      // logo
    }
  }
}

</script>
<style>
</style>