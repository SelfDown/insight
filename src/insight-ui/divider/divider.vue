<template functional>
  <div :class="['ni-divider', 'el-divider', `el-divider--${direction}`]">
    <div
      v-if="direction !== 'vertical'"
      :class="['el-divider__text', `is-${contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>
<script src="./divider.js"></script>
<style lang="scss" scoped>
@import './divider.scss';
</style>
