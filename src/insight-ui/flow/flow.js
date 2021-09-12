import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'

const drawerType = {
  node: 0,
  link: 1
}
export default {
  components: {SuperFlow},
  props:{
    nodes:{
      type:Array,
      default(){
        return []
      }
    },
    links:{
      type:Array,
      default(){
        return []
      }

    }
  },
  data() {
    return {
      drawerType,
      drawerConf: {
        title: '',
        visible: false,
        type: null,
        info: null,
        open: (type, info) => {
          const conf = this.drawerConf
          conf.visible = true
          conf.type = type
          conf.info = info
          if (conf.type === drawerType.node) {
            conf.title = '节点'
            if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
            this.$set(this.nodeSetting, 'name', info.meta.name)
            this.$set(this.nodeSetting, 'desc', info.meta.desc)
          } else {
            conf.title = '连线'
            if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
            this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
          }
        },
        cancel: () => {
          this.drawerConf.visible = false
          if (this.drawerConf.type === drawerType.node) {
            this.$refs.nodeSetting.clearValidate()
          } else {
            this.$refs.linkSetting.clearValidate()
          }
        }
      },
      linkSetting: {
        desc: ''
      },
      nodeSetting: {
        name: '',
        desc: ''
      },
      origin: [681, 465],
      nodeList: this.nodes,
      linkList: this.links,
      graphMenuList: [
        [
          {
            label: '开始节点',
            disable(graph) {
              return !!graph.nodeList.find(node => node.meta.prop === 'start')
            },
            selected: (graph, coordinate) => {
              const start = graph.nodeList.find(node => node.meta.prop === 'start')
              if (!start) {
                graph.addNode({
                  width: 100,
                  height: 80,
                  coordinate: coordinate,
                  meta: {
                    prop: 'start',
                    name: '开始节点'
                  }
                })
              }
            }
          },
          {
            label: '条件节点',
            disable: false,
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 100,
                height: 80,
                coordinate: coordinate,
                meta: {
                  prop: 'condition',
                  name: '条件节点'
                }
              })
            }
          },
          {
            label: '审批节点',
            disable: false,
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 100,
                height: 80,
                coordinate: coordinate,
                meta: {
                  prop: 'approval',
                  name: '审批节点'
                }
              })
            }
          },
          {
            label: '抄送节点',
            disable: false,
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 100,
                height: 80,
                coordinate: coordinate,
                meta: {
                  prop: 'cc',
                  name: '抄送节点'
                }
              })
            }
          },
          {
            label: '结束节点',
            disable(graph) {
              return !!graph.nodeList.find(point => point.meta.prop === 'end')
            },
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 100,
                height: 80,
                coordinate: coordinate,
                meta: {
                  prop: 'end',
                  name: '结束节点'
                }
              })
            }
          }
        ],
        [
          {
            label: '打印数据',
            selected: (graph, coordinate) => {
              console.log(JSON.stringify(graph.toJSON(), null, 2))
            }
          },
          {
            label: '全选',
            selected: (graph, coordinate) => {
              graph.selectAll()
            }
          }
        ]
      ],
      nodeMenuList: [
        [
          {
            label: '删除',
            disable: false,
            hidden(node) {
              return node.meta.prop === 'start'
            },
            selected(node, coordinate) {
              node.remove()
            }
          }
        ],
        [
          {
            label: '编辑',
            selected: (node, coordinate) => {
              console.log(node, coordinate)
            }
          }
        ]
      ],
      linkMenuList: [
        [
          {
            label: '删除',
            disable: false,
            selected: (link, coordinate) => {
              link.remove()
            }
          }
        ],
        [
          {
            label: '编辑',
            disable: false,
            selected: (link, coordinate) => {
              console.log(link, coordinate)
            }
          }
        ]
      ]
    }
  },

  created() {
    // const nodeList = [
    //   {
    //     'id': 'nodeS3WgFnzCI15X58Qw',
    //     'width': 100,
    //     'height': 80,
    //     'coordinate': [-644, -148],
    //     'meta': {
    //       'prop': 'start',
    //       'name': '开始节点'
    //     }
    //   },
    //   {
    //     'id': 'nodefHsy9uJObPtdHZv1',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [-200, -148],
    //     'meta': {
    //       'prop': 'approval',
    //       'name': '审批节点',
    //       'desc': '111111'
    //     }
    //   },
    //   {
    //     'id': 'nodeni9QOqT3mI7hsMau',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [-442, -275],
    //     'meta': {
    //       'prop': 'condition',
    //       'name': '条件节点'
    //     }
    //   },
    //   {
    //     'id': 'nodeZBK0ZPpgMe1exezE',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [-200, -275],
    //     'meta': {
    //       'prop': 'approval',
    //       'name': '审批节点'
    //     }
    //   },
    //   {
    //     'id': 'nodeqkK9zjcDz53xKRlK',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [34, -209],
    //     'meta': {
    //       'prop': 'cc',
    //       'name': '抄送节点'
    //     }
    //   },
    //   {
    //     'id': 'nodeDhVU6w2KbEnJCjZs',
    //     'width': 80,
    //     'height': 50,
    //     'coordinate': [286, -133],
    //     'meta': {
    //       'prop': 'end',
    //       'name': '结束节点'
    //     }
    //   },
    //   {
    //     'id': 'nodesyxisLH1hJDdPsxx',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [34, -75],
    //     'meta': {
    //       'prop': 'cc',
    //       'name': '抄送节点'
    //     }
    //   },
    //   {
    //     'id': 'node0aiA9VuhjkiAdZCs',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [-200, -2],
    //     'meta': {
    //       'prop': 'approval',
    //       'name': '审批节点'
    //     }
    //   },
    //   {
    //     'id': 'nodeG3WeFnzCI15X58Qw',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [-442, -2],
    //     'meta': {
    //       'prop': 'condition',
    //       'name': '条件节点'
    //     }
    //   },
    //   {
    //     'id': 'node7WXbwOR6kSFD53Hf',
    //     'width': 160,
    //     'height': 80,
    //     'coordinate': [-442, -148],
    //     'meta': {
    //       'prop': 'condition',
    //       'name': '条件节点'
    //     }
    //   }
    // ]
    // const linkList = [
    //   {
    //     'id': 'linkcs9ZhumWeTHrtUy8',
    //     'startId': 'nodeS3WgFnzCI15X58Qw',
    //     'endId': 'nodeni9QOqT3mI7hsMau',
    //     'startAt': [100, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'linkBDld5rDBw4C6kiva',
    //     'startId': 'nodefHsy9uJObPtdHZv1',
    //     'endId': 'nodeqkK9zjcDz53xKRlK',
    //     'startAt': [160, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'linkA0ZZxRlDI9AOonuq',
    //     'startId': 'node7WXbwOR6kSFD53Hf',
    //     'endId': 'nodefHsy9uJObPtdHZv1',
    //     'startAt': [160, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'linkhCKTpRAf89gcujGS',
    //     'startId': 'nodeni9QOqT3mI7hsMau',
    //     'endId': 'nodeZBK0ZPpgMe1exezE',
    //     'startAt': [160, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'link2o7VZ7DRaSFKtB0g',
    //     'startId': 'nodeqkK9zjcDz53xKRlK',
    //     'endId': 'nodeDhVU6w2KbEnJCjZs',
    //     'startAt': [160, 40],
    //     'endAt': [0, 25],
    //     'meta': null
    //   },
    //   {
    //     'id': 'linkII013ovDctUDuPLu',
    //     'startId': 'nodeS3WgFnzCI15X58Qw',
    //     'endId': 'nodeG3WeFnzCI15X58Qw',
    //     'startAt': [100, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'link6MOmsq1EqzlWcG1n',
    //     'startId': 'nodeZBK0ZPpgMe1exezE',
    //     'endId': 'nodeqkK9zjcDz53xKRlK',
    //     'startAt': [160, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'link52SczSXHmuyKDzRU',
    //     'startId': 'nodesyxisLH1hJDdPsxx',
    //     'endId': 'nodeDhVU6w2KbEnJCjZs',
    //     'startAt': [160, 40],
    //     'endAt': [0, 25],
    //     'meta': null
    //   },
    //   {
    //     'id': 'link2hBQDTuIG4ZFYyE0',
    //     'startId': 'node0aiA9VuhjkiAdZCs',
    //     'endId': 'nodesyxisLH1hJDdPsxx',
    //     'startAt': [160, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'linkrwdW87FmOma5rPVo',
    //     'startId': 'nodeG3WeFnzCI15X58Qw',
    //     'endId': 'node0aiA9VuhjkiAdZCs',
    //     'startAt': [160, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   },
    //   {
    //     'id': 'linknL75dQV0AWZA85sq',
    //     'startId': 'nodeS3WgFnzCI15X58Qw',
    //     'endId': 'node7WXbwOR6kSFD53Hf',
    //     'startAt': [100, 40],
    //     'endAt': [0, 40],
    //     'meta': null
    //   }
    // ]
    // setTimeout(() => {
    //   this.nodeList = nodeList
    //   this.linkList = linkList
    // }, 100)
  },
  watch:{
    nodes(val){
      this.nodeList= val
    },
    links(val){
      this.linkList = val
    }
  },
  methods: {
    enterIntercept(formNode, toNode, graph) {
      const formType = formNode.meta.prop
      switch (toNode.meta.prop) {
        case 'start':
          return false
        case 'approval':
          return [
            'start',
            'approval',
            'condition',
            'cc'
          ].includes(formType)
        case 'condition':
          return [
            'start',
            'approval',
            'condition',
            'cc'
          ].includes(formType)
        case 'end':
          return [
            'approval',
            'cc'
          ].includes(formType)
        default:
          return true
      }
    },
    outputIntercept(node, graph) {
      return !(node.meta.prop === 'end')
    },
    linkDesc(link) {
      let t = link.meta ? link.meta.desc : ''
      return t
    }
  }
}
