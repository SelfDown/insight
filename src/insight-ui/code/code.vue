<template>
  <el-row :style="codeStyle">
    <textarea :ref="ref" class="codesql" v-model="code"
    ></textarea>
  </el-row>
</template>
<script src="./code.js"></script>
<style lang="scss" scoped>
@import './code.scss';
</style>
