import { Collapse } from 'element-ui'

export default {
  extends: Collapse,
  props: {
    size: {
      type: String,
      default: function() {
        return 'mini'
      }
    }
  }
}
