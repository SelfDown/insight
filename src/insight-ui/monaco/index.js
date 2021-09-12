import monaco from './monaco.vue'
monaco.install = function(Vue) {
  Vue.component(monaco.name, monaco)
}
export default monaco
