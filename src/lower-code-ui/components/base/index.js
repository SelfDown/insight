import Base from './src/base'
Base.install = function(Vue) {
  Vue.component(Base.name, Base)
}
export default Base
