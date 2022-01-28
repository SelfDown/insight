import {
  ITable,
  ITableColumn
} from "@/insight-ui"

export default {

  components: {
    ITable,
    ITableColumn
  },
  props: {

    config: {
      require: true,
      type: Object,
      default() {
        return {
          type: "table"
        }
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    getTableProps() {
      let name = "props"
      if (this.getConfigItem(name)) {
        return this.config[name]
      }
    },
    getConfigItem(name) {
      return this.config[name]
    },
    getColumns() {
      let name = "columns"
      if (this.getConfigItem(name)) {
        return this.config[name]
      } else {
        console.error(this.config)
        console.error("表格组件没有找到" + name + "字段")
        return []
      }
    },
  },
  render(h) {

    let columns = this.getColumns()
    let columnList = []
    columns.map(column => {
      let config = {
        props: {
          ...column
        }
      }
      // let a = {...{"a":1}}
      // console.log(a)
      // this.updateProp(column, config.props)
      let node = h("i-table-column", config)
      columnList.push(node)
    })
    let props = this.getTableProps()

    let tableConfig = {props: {}}
    if (props) {

    }
    tableConfig = {
      ...props
    }
    return h("i-table", tableConfig, columnList)
  }
}
