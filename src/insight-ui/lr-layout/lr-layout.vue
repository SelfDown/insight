<template>
  <div class="column">
    <div
      class="column-left"
      :style="leftStyle"
      :class="{ 'left-pannel-close': !isShowAside }"
    >
      <div class="resize-bar" :style="leftWidthStyle"></div>
      <div class="resize-line"></div>
      <div
        class="btn-toggle"
        @click="isShowAside = !isShowAside"
        :class="{ open: isShowAside, close: !isShowAside }"
      ></div>
      <div class="resize-save">
        <slot name="left"> </slot>
      </div>
    </div>
    <div class="column-right" :style="rightStyle">
      <slot name="right"> </slot>
    </div>
  </div>
</template>
<script src="./lr-layout.js"></script>

<style lang="scss" scoped>
@import './lr-layout.scss';
</style>
