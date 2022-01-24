<template>
  <el-container direction="vertical" class="platform">
    <el-row class="top-menu-header" size="mini">
      <el-row>
        <img :src="logo" class="logo" />
      </el-row>

      <el-menu
        background-color="#272B2F"
        text-color="#fff"
        active-text-color="#ffd04b"
        size="mini"
        mode="horizontal"
        :default-active="active"
        @select="handleSelect"
      >
        <el-menu-item index="platform">Insight 配置</el-menu-item>
        <el-menu-item index="uishow">Ui Show</el-menu-item>
        <el-menu-item index="default">Element 示例</el-menu-item>
        <el-menu-item index="antd">Ant Design</el-menu-item>
        <el-menu-item index="lowerCode">低代码平台</el-menu-item>
      </el-menu>
      <!-- </div> -->

      <!-- <el-button
        size="small"
        icon="el-icon-question"
        type="primary"
        @click="showHelp"
      >
        帮助
      </el-button>
      <el-button size="small" icon="el-icon-view" @click="showPreview">
        预览
      </el-button>
      <el-button size="small" icon="el-icon-upload2">导出</el-button> -->
    </el-row>
    <el-main class="design">
      <router-tab class="router-tab" ref="router_tab" :style="routeTabStyle" />
    </el-main>
    <Preview ref="preview"></Preview>
    <Help ref="help"></Help>
  </el-container>
</template>

<script>
import Preview from '@/components/Preview'
import Help from '@/components/Help'
import { mapGetters } from 'vuex'
import * as Common from '@/common/index.js'

export default {
  components: { Preview, Help },
  data() {
    return {
      logo: require('@/assets/logo/omnis_logo.png'),
      routeTabStyle: {
        height: Common.getTableHeight(-59) + 'px'
      }
    }
  },
  computed: {
    ...mapGetters(['demo']),
    active() {
      return this.$route.name
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.replace({ name: key })
    },
    showPreview() {
      this.$refs.preview.show(this.demo.value)
    },
    showHelp() {
      this.$refs.help.show()
    }
  }
}
</script>

<style lang="scss" scope>
.platform {
  .top-menu-header {
    background-color: #272b2f;
    display: flex;
    .logo {
      height: 26px;
      transform: translateY(10px);
    }
  }
}
</style>
