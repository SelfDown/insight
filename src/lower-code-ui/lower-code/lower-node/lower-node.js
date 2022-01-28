import {NodeService} from "../service"
import components from "../../components"

export default {
  name: "lowerNode",
  components: {
    ...components
  },
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
  render(h) {
    let node = new NodeService(h, this.config)
    return h("div", node.getRenderNode())
  }

}
