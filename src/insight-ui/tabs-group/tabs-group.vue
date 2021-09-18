<template>
  <el-row @click.native="hidden_menu">


    <splitpanes class="dark-theme">
      <pane v-for="group,i_index in groups"

            :key="i_index">
        <i-tabs v-model="group.active"

                v-show="group.files.length>0"
                @tab-click="(tab)=>{clickTab(tab,group['group'])}"
                @tab-remove="(tab)=>{removeTab(tab,group['group'])}"
                @contextmenu.prevent.native="openContextMenu($event,group['group'])"
                closable

                type="card">
          <i-tab-pane v-for="item,j_index in group.files"

                      :key="j_index" :label="item.label" :name="item.name">
                <span slot="label" :id="'tabs_'+group['group']+'_'+j_index">
                   <i-icon y="6px"
                           :id="'tabs_'+group['group']+'_'+j_index+'_icon'"

                           :icon="item.icon" size="mini"/>
                  {{item.label}}
                </span>
            <div class="name">{{item.name}}</div>
            <i-monaco
              :options="item.option"
              :value="item.content"
              :style="codeStyle"
            >

            </i-monaco>
            <!--          {{item.content}}-->
          </i-tab-pane>
        </i-tabs>

      </pane>


    </splitpanes>
    <ul
      id="tab_menu"
      v-show="contextMenuVisible"
      :style="{left:left+'px',top:top+'px',display: 'block'}"
      class="tabs-contextmenu"
    >
      <li
        @click="closeAll"
      >
        <i-icon y="6px" icon="#i-guanbisuoyou" size="mini"/>
        关闭所有
      </li>
      <i-line/>
      <li @click="closeLeft">
        <i-icon y="6px" icon="#i-guanbizuoce" size="mini"/>
        关闭左边
      </li>
      <li @click="closeRight">
        <i-icon y="6px" icon="#i-guanbiyouce" size="mini"/>
        关闭右边
      </li>
      <li @click="closeOther">
        <i-icon y="6px" icon="#i-guanbiqita" size="mini"/>
        关闭其他
      </li>
      <i-line/>
      <li @click="contextMenuVisible=false">
        <i-icon y="6px" icon="#i-quxiao" size="mini"/>
        取消
      </li>
    </ul>
  </el-row>
</template>
<script src="./tabs-group.js">

</script>
<style lang="scss" scoped>
  @import "./tabs-group.scss";
</style>
