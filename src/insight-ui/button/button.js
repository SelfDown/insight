import NiDivider from '../divider'
export default {
  components: {
    NiDivider
  },
  props: {
    radius: {
      type: Boolean,
      default: false
    },

    theme:{
      type:String,
      default(){
        return
      }
    },
    enable: {
      type: Boolean,
      default: true
    },
    buttonStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    text: null,
    icon: null,
    show_title: {
      type: String,
      default: ''
    },
    //是否要竖线
    isLine: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },

    iconStyle: {
      type: Object,
      default() {
        return {
          transform: 'translateY(4px)'
        }
      }
    }
  },
  computed: {
    enabled_class() {
      let enable = this.enable
      return {
        org_img_block_enable: enable,
        'mask-class': !enable
      }
    },
    blue(){
      return this.theme=="blue"
    },
    grey(){
      this.theme =='grey'
    }

  },
  methods: {
    nClick() {
      this.$emit('click')
    }
    // 选中不选中样式控制
  }
}
