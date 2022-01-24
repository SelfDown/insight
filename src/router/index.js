/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import home_parent from '@/views/common/homeParent'
import { RouterTabRoutes } from 'omnis-vue-router-tab'
Vue.use(Router)
let r = [
  {
    path: '/platform',
    view_path: `platform`,
    name: 'platform',
    meta: {
      title: "insight配置",
      tips: "insight配置",
      icon: "el-icon-omnis-edge"
    },
  },
  {
    path: '/uishow',
    view_path: `ui-show`,
    name: 'uishow',
    meta: {
      title: "insight配置",
      tips: "insight配置",
      icon: "el-icon-omnis-edge"
    },
  },
  {
    path: '/lowerCode',
    view_path: `lower-code`,
    name: 'lowerCode',
    meta: {
      title: "低代码平台",
      tips: "低代码平台",
     icon: "el-icon-omnis-edge"
    },
  }
]
let r_inter = []
let r_full = []
for (let i = 0; i < r.length; i++) {
  let inter = Object.assign({}, r[i])
  let path = inter.view_path
  inter["component"] = () => import(`@/views/${path}`)
  let full = Object.assign({}, r[i])
  full["component"] = resolve => {
    require([`@/views/${path}`], resolve)
  }
  full["path"] += "/full"
  full["name"]+="_full"
  r_inter.push(inter)
  r_full.push(full)
}
export const constantRoutes = [

  ...r_full,

  {
    path: "/insight_parent",
    name: "insight_parent",
    component: home_parent,
    children: [
      ...RouterTabRoutes,
      ...r_inter,
      {
        path: '/default',
        name: 'default',
        meta: {
          title: "ELE原始配置",
          tips: "原始配置",
          icon: "el-icon-omnis-edge"
        },

        component: () =>
          import(/* webpackChunkName: "demo-default" */ '@/views/Default')
      },
      {
        path: '/antd',
        name: 'antd',
        meta: {
          title: "ANT原始配置",
          tips: "原始配置",
          icon: "el-icon-omnis-edge"
        },
        component: () => import(/* webpackChunkName: "demo-antd" */ '@/views/Antd')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "demo-test" */ '@/views/Test')
      },
    ]


  },
  {
    path: '/',
    redirect: '/lowerCode/full'
  }
]

const createRouter = () =>
  new Router({
    mode: 'hash',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: constantRoutes
  })

const router = createRouter()

export default router
