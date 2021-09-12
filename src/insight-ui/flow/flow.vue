<template>
  <div class="super-flow-base">
    <super-flow
      ref="superFlow"
      :node-list="nodeList"
      :link-list="linkList"
      :origin="origin"
      :graph-menu="graphMenuList"
      :node-menu="nodeMenuList"
      :link-menu="linkMenuList"
      :enter-intercept="enterIntercept"
      :output-intercept="outputIntercept"
      :link-desc="linkDesc">
      <template v-slot:node="{meta}">
        <div :class="`flow-node flow-node-${meta.prop}`">
          <header>
            {{meta.name}}
          </header>
          <section>
            {{meta.desc}}
          </section>
        </div>
      </template>
    </super-flow>


  </div>
</template>
<script src="./flow.js"></script>
<style lang="scss" scoped>
@import './flow.scss';
</style>
