import { DropdownItem } from 'element-ui'

export default {
  extends: DropdownItem,
  props: {
    size: {
      type: String,
      default: function() {
        return 'mini'
      }
    }
  }
}
