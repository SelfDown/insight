import LcInput from "../../lc-input"
import base from "../../base"
import {
  IForm,
  IFormItem
} from "@/insight-ui"

export default {
  extends: base,
  components: {
    IForm,
    IFormItem,
    LcInput
  },
  data() {
    return {
      test: "12"
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
    let items = this.config.items
    let Name = "lc-input"
    // <Name {...{attrs:item,props:{config:item}}}></Name>

    return (
      <i-form {...{attrs: this.config.props}} >
        {
          items.map(item => {
            let Tag = this.getComponentNameByType(item.type)
            return (
              <i-form-item {...{attrs: item}}>
                <Tag {...{attrs: this.config.props,props:{config:item}}}></Tag>
              </i-form-item>
            )
          })
        }
      </i-form>
    )
  }
  // render(h) {
  //   console.log("render")
  //   let items = this.getItems(this.config)
  //   if (!items) {
  //     return
  //   }
  //   let formList = []
  //   items.map(item => {
  //
  //     let formItem = h("i-form-item",
  //       {props: {...item}},
  //       [
  //         h("lc-input", {
  //
  //           props: {
  //             config: item
  //           }
  //         })
  //       ]
  //     )
  //     formList.push(formItem)
  //   })
  //
  //   return h("i-form", {...this.config}, formList)
  // }
}
