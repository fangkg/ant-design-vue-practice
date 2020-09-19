<template>
  <div style="width: 200px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({path: item.path, query: $route.query})"
        >
          <a-icon :type="item.meta.icon" v-if="item.meta.icon"/>
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>

import SubMenu from "./SubMenu";
import { check } from "../utils/auth";

export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    },
    // collapsed: {
    //   type: Boolean,
    //   default: false
    // }
  },
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  //   collapsed(val) {
  //     if (val) {
  //       this.cacheOpenKeys = this.openKeys;
  //       this.openKeys = [];
  //     } else {
  //       this.openKeys = this.cacheOpenKeys;
  //     }
  //   }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = [];
      for (let route of routes) {
        if (route.meta && route.meta.authority && !check(route.meta.authority)) {
          break;
        }
      }
      routes.forEach(route => {
        if (route.name && !route.hideInMenu) {
          this.openKeysMap[route.path] = parentKeys
          this.selectedKeysMap[route.path] = [route.path || selectedKeys]
          const newRoute = { ...route }
          delete newRoute.children;
          if(route.children && !route.hideChildrenInMenu) {
            newRoute.children = this.getMenuData(route.children, [...parentKeys, route.path])
          } else {
            this.getMenuData(route.children, 
              selectedKeys ? parentKeys : [...parentKeys, route.path],
              selectedKeys || route.path)
          }
          menuData.push(newRoute)
        } else if (!route.hideInMenu && !route.hideChildrenInMenu && route.children) {
          menuData.push(...this.getMenuData(route.children, [...parentKeys, route.path]))
        }
      });
      return menuData;
    }
  }
};
</script>
