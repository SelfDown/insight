<template>
  <div class="right-box" :style="right_open_style" :class="{'box-border': visible}">
    <el-row class="right-dialog" v-show="visible">

      <el-row class="tool">

        <slot name="tool">

          <!--标题-->
          <slot name="title">
            <svg class="icon" aria-hidden="true"
                 v-if="icon"
                 style="width: 1.2em;height: 1.2em;position:relative;top:1px;left:3px;"
            >
              <use :xlink:href="icon"></use>
            </svg>
            <span class="el-dialog__title header-title">{{title}}</span>

          </slot>

          <!--关闭按钮-->
          <button type="button" aria-label="Close" class="el-dialog__headerbtn box-header-btn" @click="handle_close">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>

        </slot>
      </el-row>

      <el-row class="dialog-body" :style="{height: body_height}">
        <slot name="body">
        </slot>
      </el-row>

      <div class="ni-dialog__footer" v-if="$slots.footer">
        <slot name="footer">

        </slot>
      </div>


    </el-row>
  </div>

</template>
<script src="./dialog.js"></script>
<style lang="scss" scoped>
  @import "./dialog.scss";
</style>
