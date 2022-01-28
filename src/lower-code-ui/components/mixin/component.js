export default {
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
  }
}
