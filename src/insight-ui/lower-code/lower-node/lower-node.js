export default {
  name: "lowerNode",
  props: {
    config: {
      required: true,
      type: Object,
      data() {
        return {
          type: "div"
        }
      }
    }
  },
  data() {
    return {}
  },

  methods: {
    renderNode(h, node, level = 0) {
      let items = node.items
      let type = node["type"]
      let description = node["description"]
      if (Array.isArray(items)) {
        // let children = items.map(item => {
        //   this.renderNode(h, item)
        // })
        let data = []
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          data.push(this.renderNode(h, item, level + 1))
        }
        let s = ""
        for (let i = 0; i <= level; i++) {
          s += "-"
        }
        return [h("div", [s + type+"\t level"+level+description].concat(data))]
      } else {
        return h("span", [h("span", type+"\t")])
      }

    },
  },
  render(h) {
    // let type = this.config["type"]
    // let items = this.config["items"]
    // let renderList = []
    // if(items && items.length>0){
    //   items.map(item=>{
    //     renderList.push(h("lower-node",{props:item}))
    //   })
    // }else{
    //   renderList[h("span",type)]
    // }


    return h("div", this.renderNode(h, this.config))
  }

}
