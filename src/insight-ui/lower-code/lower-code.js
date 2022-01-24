import lowerNode from "./lower-node"

export default {
  components: {
    lowerNode
  },
  props: {
    config: {
      required: true,
      type: Object,
      data() {
        return {
          type: "page",
          items: []
        }
      }
    }
  },
  data() {
    return {}
  },
  render(h) {
    return h("lower-node", {
      props: {
        config: this.config
      }
    })
  }
}
