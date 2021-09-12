import 'pl-table/themes/index.css' // 引入样式（必须引入)，请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦
import 'pl-table/themes/plTableStyle.css'
import '../styles/pl-table.scss'
import { PlTable } from 'pl-table'

export default {
  extends: PlTable,
  props: {
    /**
     * 修复固定列表出现一条竖线，如果没有就不需要动
     */
    fixCol: {
      type: Boolean,
      default() {
        return false
      }
    },

    'cell-style': {
      default() {
        return {
          padding: '0px'
        }
      }
    },

    'row-style': {
      default() {
        return {
          height: '14px',

          padding: '0px'
        }
      }
    },

    'header-cell-style': {
      default() {
        return {
          height: '14px',
          padding: '0px',
          color: '#444'
        }
      }
    },
    'header-row-style': {
      default() {
        return {
          height: '14px',

          padding: '0px'
        }
      }
    },
    'use-virtual': {
      type: Boolean,
      default() {
        return true
      }
    },
    'row-height': {
      type: Number,
      default() {
        return 26
      }
    },
    stripe: {
      type: Boolean,
      default() {
        return true
      }
    },
    border: {
      type: Boolean,
      default() {
        return true
      }
    },
    size: {
      type: String,
      default() {
        return 'mini'
      }
    }
  },
  data() {
    return {}
  }
}
