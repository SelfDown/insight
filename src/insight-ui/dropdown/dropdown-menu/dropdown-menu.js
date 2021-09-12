import { DropdownMenu } from 'element-ui'

export default {
  extends: DropdownMenu,
  components: {
    DropdownMenu
  },
  props: {
    visibleArrow: {
      default() {
        return false
      }
    }
  }
}
