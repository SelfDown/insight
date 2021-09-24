<template>
  <el-row class="container-home">
    <el-row class="content-header">
      <img class="logo" :src="platformInsightLogo"/>
      <i-dropdown @activeVisible="fileVisible" trigger="click" type="primary">
        <i-button :button-style="topMenuStyle" :grey="fileActive"
        >文件
        </i-button
        >
        <i-dropdown-menu slot="dropdown">
          <i-dropdown-item>
            <el-row style="width: 220px">
              <i-icon y="6px" icon="#i-xitong" size="mini"></i-icon>
              系统导出
            </el-row>
          </i-dropdown-item>
          <i-dropdown-item divided>
            <i-icon y="6px" icon="#i-icon-system-fi-configure-copy"></i-icon>
            生成配置
          </i-dropdown-item>
          <i-dropdown-item>
            <i-icon y="6px" icon="#i-personality-settings"></i-icon>

            个性设置
          </i-dropdown-item
          >
        </i-dropdown-menu>
      </i-dropdown>
    </el-row>
    <el-row class="content-body">
      <el-row>
        <lr-layout @click.native="hidden_tree_menu">
          <template slot="left">
            <el-row>
              <el-row class="header-tool">
                <i-icon y="6px" icon="#i-standard-service" size="mini">
                </i-icon>
                <label>浏览</label>

                <i-button icon="#i-gengduo-a" radius class="header-right">
                </i-button>
              </el-row>
              <el-row>
                <i-collapse size="mini" v-model="explore">
                  <i-collapse-item title="" name="1">
                    <template slot="title">
                      <i-icon icon="#i-Standard-1" size="mini"></i-icon>
                      接口模板管理
                    </template>

                    <i-tree
                      :ref="file_tree_ref"
                      :element-loading-background="loading_background"
                      v-loading="dir_loading"
                      :setting="dir_setting" :nodes="dir_nodes"/>
                  </i-collapse-item>
                </i-collapse>

                <i-collapse size="mini" v-model="explore">

                  <i-collapse-item title="服务管理" name="2">
                    <template slot="title">
                      <i-icon icon="#i-yewu" size="mini"></i-icon>
                      服务管理
                    </template>
                    <i-input
                      class="top-search"
                      @keyup.enter.native="filter_search"

                      placeholder="请输入服务关键字回车"
                      v-model="service_search">

                    </i-input>

                    <i-tree
                      class="content-tree"
                      :ref="service_tree_ref"
                      :element-loading-background="loading_background"
                      v-loading="service_loading"
                      :setting="service_setting" :nodes="service_nodes"/>


                  </i-collapse-item>
                </i-collapse>
              </el-row>


            </el-row>
          </template>
          <template slot="right">
            <i-tabs-group
              @tabClick="tabClick"
              ref="file_group">

            </i-tabs-group>

            <i-dialog
              right-open-width="70%"
              :visible.sync="flow_show" :title="flow_title">
              <template slot="body">
                <i-flow
                  v-loading="flow_loading"
                  :nodes="nodes"
                  :links="links"
                >

                </i-flow>
              </template>
            </i-dialog>

            <!--            <i-tabs v-model="fileName"-->
            <!--                    closable-->
            <!--                    type="card">-->
            <!--              <i-tab-pane v-for="item,index in files" :key="index" :label="item.label+'_'+index" :name="item.name+'_'+index">-->
            <!--                <span slot="label">-->
            <!--                   <i-icon y="6px" :icon="item.icon" size="mini"/>-->
            <!--                  {{item.content}}-->
            <!--                </span>-->
            <!--                {{item.content}}-->
            <!--              </i-tab-pane>-->

            <!--            </i-tabs>-->


            <!--                              <el-row>-->

            <!--                          <i-monaco-->

            <!--                            :options="file_options"-->
            <!--                            :value="file_content"-->
            <!--                            :style="codeStyle"-->
            <!--                          >-->

            <!--                          </i-monaco>-->
            <!--                           <i-dialog-->
            <!--                             right-open-width="88%"-->
            <!--                             :visible.sync="flow_show" :title="flow_title">-->
            <!--                            <template slot="body">-->
            <!--                             <i-flow-->
            <!--                               v-loading="flow_loading"-->
            <!--                              :nodes="nodes"-->
            <!--                              :links="links"-->
            <!--                             >-->

            <!--                             </i-flow>-->
            <!--                            </template>-->
            <!--                           </i-dialog>-->


            <!--                        </el-row>      <el-row style="height:34px;padding-left:14px;line-height: 34px">-->
            <!--                          <i-input style="width: 300px" v-model="target"></i-input>-->
            <!--                          <i-button @click="open_flow">查看流程</i-button>-->

            <!--                        </el-row>-->
            <!--            -->
          </template>
        </lr-layout>
      </el-row>


    </el-row>
    <el-row class="content-foot">
      <el-row>
        <i-button
          theme="blue"
          title="刷新目录"
          :icon-style="bottomIconStyle"
          class="button-split"
          :button-style="bottomButton"
          icon="#i-f14"
        >
        </i-button>
        <i-button
          theme="blue"
          title="错误"
          :icon-style="bottomIconStyle"
          :button-style="bottomButton"
          icon="#i-cuowu1"
        >
          0
        </i-button>

        <i-button
          theme="blue"
          title="警告"
          class="button-split"
          :icon-style="bottomIconStyle"
          :button-style="bottomButton"
          icon="#i-jinggao"
        >
          0
        </i-button>

        <i-button
          theme="blue"
          title="控制台"
          :icon-style="bottomIconStyle"
          :button-style="bottomButton"
          icon="#i-kongzhitai"
        >
        </i-button>
      </el-row>
    </el-row>
    <!--右键-->
    <ul
      id="service_tree_menu"
      v-show="serviceTreeVisible"
      :style="{left:serviceTreeLeft+'px',top:serviceTreeTop+'px',display: 'block'}"
      class="tabs-contextmenu"
    >

      <li v-if="show_right_flow" @click="open_flow">
        <i-icon y="6px" icon="#i-liucheng" size="mini"/>
        显示流程
      </li>
      <i-line/>
      <li @click="serviceTreeVisible=false">
        <i-icon y="6px" icon="#i-quxiao" size="mini"/>
        取消
      </li>
    </ul>
  </el-row>
</template>
<script src="./platform.js"></script>
<style lang="scss" scoped>
  @import './platform.scss';
</style>
<style lang="scss" scoped>
  @import "./tabs-menu.scss";
</style>

