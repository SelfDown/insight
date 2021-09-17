<template>
  <splitpanes class="dark-theme">
    <pane v-for="group,i_index in groups" :key="i_index">
      <i-tabs v-model="group.active"
              v-show="group.files.length>0"
              @tab-click="(tab)=>{clickTab(tab,group['group'])}"
              @tab-remove="(tab)=>{removeTab(tab,group['group'])}"
              closable
              type="card">
        <i-tab-pane v-for="item,j_index in group.files" :key="j_index" :label="item.label" :name="item.name">
                <span slot="label">
                   <i-icon y="6px" :icon="item.icon" size="mini"/>
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
    <!--    <pane>-->

    <!--      <i-tabs v-model="fileName"-->
    <!--              closable-->
    <!--              type="card">-->
    <!--        <i-tab-pane v-for="item,index in files" :key="index" :label="item.label+'_'+index" :name="item.name+'_'+index">-->
    <!--                <span slot="label">-->
    <!--                   <i-icon y="6px" :icon="item.icon" size="mini"/>-->
    <!--                  {{item.content}}-->
    <!--                </span>-->
    <!--          <i-monaco-->

    <!--            :options="file_options"-->
    <!--            :value="item.content"-->
    <!--            :style="codeStyle"-->
    <!--          >-->

    <!--          </i-monaco>-->
    <!--          &lt;!&ndash;          {{item.content}}&ndash;&gt;-->
    <!--        </i-tab-pane>-->
    <!--      </i-tabs>-->


    <!--    </pane>-->
  </splitpanes>
</template>
<script src="./tabs-group.js">

</script>
<style scoped>
  @import "./tabs-group.scss";
</style>
