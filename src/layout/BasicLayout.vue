<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider 
        v-if="navLayout === 'left'"
        v-model="collapsed" 
        collapsible 
        :trigger="null"
        :theme="navTheme">
        <div class="logo">Ant Design Vue Pro</div>
        <SideMenu :theme="navTheme"/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
            class="trigger"
            v-auth="['admin']"
          ></a-icon>
          <Header/>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer/>
    </Authorized>
  </div>
</template>

<script>

import Header from "./Header"
import Footer from "./Footer"
import SideMenu from "./SideMenu"
import SettingDrawer from "../components/settingDrawer/index.vue"

export default {
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    }
  },
  components: {
      Header,
      Footer,
      SideMenu,
      SettingDrawer
  }
}

</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 32px;
  line-height: 32px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>