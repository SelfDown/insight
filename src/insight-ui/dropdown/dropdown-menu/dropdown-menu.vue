<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <ul
      class="insight el-dropdown-menu el-popper"
      :class="[size && `el-dropdown-menu--${size}`]"
      v-show="showPopper"
    >
      <slot></slot>
    </ul>
  </transition>
</template>
<script src="./dropdown-menu.js"></script>
<style lang="scss" scoped>
@import './dropdown-menu.scss';
</style>
