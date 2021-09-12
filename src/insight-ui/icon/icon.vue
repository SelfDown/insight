<template>
  <svg
    class="icon icon-item"
    aria-hidden="true"
    :style="iconStyle"
    @click="nClick"
  >
    <use :xlink:href="icon"></use>
  </svg>
</template>
<script src="./icon.js"></script>
<style lang="scss" scoped>
@import './icon.scss';
</style>
