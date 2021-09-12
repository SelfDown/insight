import { Dropdown } from 'element-ui'

export default {
  extends: Dropdown,
  components: {
    Dropdown
  },
  props: {
    size: {
      type: String,
      default: function() {
        return 'mini'
      }
    }
  },
  watch: {
    visible(val) {
      this.$emit('activeVisible', val)
    }
  }
}
