import baseMixin from "./mixin/baseMixin";
import scanComponents from "../../service/scan-component"
import Vue from "vue"

const scan = new scanComponents()

export default {
  mixins: [baseMixin],
  created() {
    // 注册items
    let items = this.config.items
    if (items) {
      items.map(item => {
        this.register(item.type)
      })
    }
    // 注册children
    let children = this.config.children
    if (children) {
      children.map(item => {
        this.register(item.type)
      })
    }

  },

  methods: {

    register(type) {
      if (Vue.component(type)) {
        return
      }
      let component = scan.getComponentByType(type)
      Vue.component(component.name, res => require([`${component.path}`], res))
    },
    getComponentNameByType(type){
      let component = scan.getComponentByType(type)
      return component.name
    }
  }

}
