import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
// import Antd from "ant-design-vue";
// import Button from "ant-design-vue/lib/button";
import {  Button, 
          Layout, 
          Icon, 
          Drawer, 
          Radio, 
          Menu, 
          Form, 
          Input, 
          Select, 
          LocaleProvider, 
          Dropdown,
          DatePicker } from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import "ant-design-vue/dist/antd.less";
// import "ant-design-vue/lib/button/style";
import Authorized from "./components/Authorized.vue";
import Auth from "./directives/auth";
import VueI18n from "vue-i18n";
import enUS from "./locale/enUS"
import zhCN from "./locale/zhEN"
import queryString from "query-string"

Vue.config.productionTip = false;

// Vue.use(Antd)
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component("Authorized", Authorized);
Vue.use(Auth);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown)
Vue.use(DatePicker)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  message: {
    zhCN: {
      message: zhCN
    },
    enUS: {
      message: enUS
    }
  }
})

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
})

Vue.component("IconFont", IconFont);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
