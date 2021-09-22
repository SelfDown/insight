import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
// import Antd from 'ant-design-vue/dist/antd'

import vjdesign from '../lib'
import vjform from 'vjform'
import expression from 'jpresent-transform-expression'
import router from './router'
import store from './store'

// import 'ant-design-vue/dist/antd.css'
import 'element-ui/lib/theme-chalk/index.css'
// import './styles/markdown.scss'
import './styles/platform.scss'

// import Select from './components/Select.vue'
// import { elFormExtends } from './utils/designer'

import RouterTab from 'omnis-vue-router-tab'
import 'omnis-vue-router-tab/dist/lib/omnis-vue-router-tab.css'

Vue.config.productionTip = false

vjform.use(expression)

// vjdesign.form.use(elFormExtends)

Vue.use(Element)
// Vue.use(Antd)
Vue.use(vjdesign)
Vue.use(vjform)
Vue.use(RouterTab)
// Vue.component(Select.name, Select)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
