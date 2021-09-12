import { CollapseItem } from 'element-ui'

export default {
  extends: CollapseItem,
  props: {
    size: {
      type: String,
      default: function() {
        return 'mini'
      }
    }
  }
}
