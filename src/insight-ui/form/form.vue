<template>
  <form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<script src="./form.js"></script>

<style lang="scss" scoped>
  @import "./form.scss";
</style>
