import platform from './platform.vue'
platform.install = function(Vue) {
  Vue.component(platform.name, platform)
}
export default platform
