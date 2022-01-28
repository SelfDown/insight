<template>
  <div class="el-form-item" :class="[{
      'el-form-item--feedback': elForm && elForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required,
      'is-no-asterisk': elForm && elForm.hideRequiredAsterisk
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]">
    <label-wrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'">

        <label :for="labelFor"
               class="el-form-item__label"
               :class="[{
                  'is-error': validateState === 'error'
               }]"
               :style="labelStyle"
               v-if="label || $slots.label">



          <slot name="label">{{label + form.labelSuffix}}</slot>

          <ni-icon
            v-if="helpInfo"

            size="mini" icon="#cms_ai-i" :title="helpInfo"></ni-icon>
        </label>
    </label-wrap>
    <div class="el-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <slot
          v-if="validateState === 'error' && showMessage && form.showMessage"
          name="error"
          :error="validateMessage">
          <div
            class="el-form-item__error"
            :class="{
              'el-form-item__error--inline': typeof inlineMessage === 'boolean'
                ? inlineMessage
                : (elForm && elForm.inlineMessage || false)
            }"
          >

            <ni-icon size="mini" :icon="err_icon" :title="validateMessage"></ni-icon>
<!--            {{validateMessage}}-->
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script src="./form-item.js"></script>

<style lang="scss" scoped>
  @import "./form-item.scss";
</style>
