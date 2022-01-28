import lowerNode from "./lower-node"
// import Vue from 'vue'
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
  // render (h, cxt) {
  //     // return h(require(`./test/test.vue`), {
  //     //   props: {
  //     //     prop: this.prop
  //     //   }
  //     // })
  //     return <component is={require(`./test/test.vue`)}></component>
  //   },
  created(){
    // console.log(this.extend)
  //   console.log("xxx")
  //
  //   Vue.component("test",res => require([`./test`], res))
  },
  render(h) {
    // let t = require("./test/")
    // console.log(t)
    // return h("component")
    // return h(require(`./test/test.vue`), {
    //     props: {
    //       prop: this.prop
    //     }
    //   })
    // return h(t)
    // let c = ()=>import(`./test/test.vue`)
    // console.log(c)
    // return h("test")
    return <lower-node {...{props:{config:this.config}}}/>
  }
}
