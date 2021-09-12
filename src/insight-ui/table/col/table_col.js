import { PlTableColumn } from 'pl-table'

export default {
  extends: PlTableColumn,
  props: {
    'show-overflow-tooltip': {
      default() {
        return true
      }
    }
  }
}
