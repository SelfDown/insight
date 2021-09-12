import { Tabs } from 'element-ui'

export default {
  extends: Tabs,
  props: {
    size: {
      type: String,
      default: function() {
        return 'small'
      }
    }
  }
}
