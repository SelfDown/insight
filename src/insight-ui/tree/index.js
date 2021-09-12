// import ITree from "vue-giant-tree"
// export default ITree

import itree from './tree'
itree.install = function(Vue) {
  Vue.component(itree.name, itree)
}
export default itree
