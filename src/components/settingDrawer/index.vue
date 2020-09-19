<template>
  <div>
    <!-- <a-button type="primary" @click="showDrawer">
      Open
    </a-button> -->
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      :width="300"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
            <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <template>
            <div>
                <h2>整体风格定制</h2>
                <!-- <a-radio-group v-model="navTheme"> -->
                <a-radio-group 
                    :value="$route.query.navTheme || 'dark'"
                    @change="e => handleSettingChange('navTheme', e.target.value)">
                    <a-radio value="dark">黑色</a-radio>
                    <a-radio value="light">白色</a-radio>
                </a-radio-group>
                <h2>导航模式</h2>
                <!-- <a-radio-group v-model="navLayout"> -->
                <a-radio-group 
                    :value="$route.query.navLayout || 'left'"
                    @change="e => handleSettingChange('navLayout', e.target.value)">
                    <a-radio value="left">左侧</a-radio>
                    <a-radio value="top">顶部</a-radio>
                </a-radio-group>
            </div>
        </template>
      </div>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "dark",
      navLayout: "left"
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    // showDrawer() {
    //   this.visible = true;
    // },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
        this.$router.push({
            query: { ...this.$route.query, [type]: value }
        })
    }
  },
};
</script>

<style scoped>
.handle {
    position: absolute;
    top: 240px;
    right: 300px;
    width: 48px;
    height: 48px;
    background: #1890ff;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    border-radius: 3px 0 0 3px;
}
</style>
