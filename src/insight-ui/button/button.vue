<template>
  <div
    class="org_img_block"
    :class="{
      org_img_block_enable: enable,
      'mask-class': !enable,
      'has-line': isLine,
      radius: radius,
      org_img_block_blue:blue,
      org_img_block_grey: grey
    }"
    :style="buttonStyle"
    @click="nClick"
  >
    <svg
      class="icon icon-item"
      aria-hidden="true"
      :style="iconStyle"
      v-if="icon && icon.startsWith('#')"
    >
      <use :xlink:href="icon"></use>
    </svg>

    <span
      v-else-if="icon && !icon.startsWith('#')"
      class="el-icon-item"
      :class="{ 'only-icon': text ? false : true }"
    >
      <i :class="[icon]"></i> {{ text }}
    </span>

    <span class="tool-icon-text" v-if="text">
      {{ text }}
    </span>
    <span v-else :class="{ 'show-underline': underline }">
      <slot></slot>
    </span>

    <ni-divider
      direction="vertical"
      content-position="center"
      v-if="isLine"
    ></ni-divider>
  </div>
</template>
<script src="./button.js"></script>
<style lang="scss" scoped>
@import './button.scss';
</style>
