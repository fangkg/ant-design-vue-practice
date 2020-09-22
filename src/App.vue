<template>
  <div id="app">
    <div id="nav">
      <!-- <a-button>按钮</a-button>
       <br> -->
      <!--<router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <!-- <router-link to="/dashboard/analysis">dashboard</router-link>
      <router-link to="/form">form</router-link> -->
    </div>
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment"
export default {
  data() {
    return {
      locale: zhCN
    }
  },
  watch: {
    "$router.query.locale": function(val) {
      this.locale = val === "enUS" ? enUS : zhCN
      mement.locale(val === "enUS" ? "en" : "zh-cn")
    }
  }
}
</script>

<style lang="less">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
