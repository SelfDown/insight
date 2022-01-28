import LcInput from "../../lc-input"

import {
  IForm,
  IFormItem
} from "@/insight-ui"

export default {
  props: {
    config: {
      default() {
        return {}
      }
    }
  },
  components: {
    IForm,
    IFormItem,
    LcInput
  },
  data() {
    return {
      test:"12"
    }
  },
  methods: {
    getFormItemsName() {
      return "items"
    },
    getItems(obj) {
      let name = this.getFormItemsName()
      let items = obj[name]
      if (!items) {
        console.error("form 组件没有找到" + name + "字段")
        console.error(obj)
      }
      return items
    }
  },
  render(h) {
    let items = this.getItems(this.config)
    if (!items) {
      return
    }
    let formList = []
    items.map(item => {

      let formItem = h("i-form-item",
        {props: {...item}},
        [
          h("lc-input", {

            props: {
              config: item
            }
          })
        ]
      )
      formList.push(formItem)
    })

    return h("i-form", {...this.config}, formList)
  }
}
