import { Register } from "../../register"

export default class NodeService {

  constructor(createElement, config) {
    this.createElement = createElement
    this.config = config
    this.register = new Register()

  }

  renderNode(h, node, level = 0) {
    let children = node.children
    let type = node["type"]
    let description = node["description"]
    let s = ""
    for (let i = 0; i <= level; i++) {
      s += "-"
    }
    s += "\t"
    if (Array.isArray(children)) {
      let data = []
      for (let i = 0; i < children.length; i++) {
        let item = children[i]
        data.push(this.renderNode(h, item, level + 1))
      }

      return [h("div", [s + "<" + type + "/>" + "\t level" + level + "\t" + "【" + description + "】"].concat(data))]
    } else {
      //如果是表格
      let component = this.register.getRegComponent(type)
      if (component) {

        return h(component,{
          props: {
            config: node
          }
        })
      } else {
        return h("div", [h("span", s + "[" + type + "]" + "\t level" + level + "\t" + "【" + description + "】")])
      }

    }

  }

  getRenderNode() {
    let node = this.renderNode(this.createElement, this.config)
    return node
  }

}
