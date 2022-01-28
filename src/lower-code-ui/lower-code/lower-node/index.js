import lowerNode from './lower-node'
lowerNode.install = function(Vue) {
  Vue.component(lowerNode.name, lowerNode)
}
export default lowerNode
