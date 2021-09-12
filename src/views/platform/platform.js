import {
  ICollapseItem,
  ICollapse,
  IIcon,
  IButton,
  ITree,
  IDropdown,
  IDropdownMenu,
  IDropdownItem,
  LrLayout,
  ITable,
  ICode,
  IMonaco,
  IFlow,
  IDialog,
  IInput,
  ITabs,
  ITabPane

} from '@/insight-ui'
import * as API from "@/api/index.js"
import * as Common from "@/common/index.js"

export default {
  components: {
    LrLayout,
    ICollapseItem,
    ICollapse,
    IIcon,
    IButton,
    ITree,
    IDropdown,
    IDropdownMenu,
    IDropdownItem,
    ITable,
    ICode,
    IMonaco,
    IFlow,
    IDialog,
    IInput,
    ITabs,
    ITabPane

  },

  props: {},
  data() {
    return {
      fileName:"first",
      content: "",
      flow_show: false,
      flow_title: "查看流程",

      file_options: {
        language: "json",
        theme: 'vs-dark',
        readOnly: false
      },
      api_options: {
        language: "json",
        theme: 'vs-dark',
        readOnly: false
      },
      api: "",
      code: "",
      fileActive: false,
      platformInsightLogo: require('@/assets/logo/i.png'),
      codeStyle: {
        height: Common.getTableHeight(-102) + "px",
        width: "100%"
      },
      topMenuStyle: {
        height: '30px',
        'line-height': '220%',
        padding: '0px 10px',
        'font-size': '13px'
      },
      bottomButton: {
        height: '26px',
        'line-height': '166%'
      },
      bottomIconStyle: {
        transform: 'translateY(2px)'
      },
      treeDatas: [
        {
          id: 1,
          pid: 0,
          name: '系统',
          open: true,
          iconSkin: 'insight-system',
          children: [
            {id: 11, iconSkin: 'insight-service', name: '登录', open: true},
            {id: 12, iconSkin: 'insight-service', name: '数据源', open: true}
          ]
        },

        {
          id: 2,
          name: '基础接口',
          checked: true,
          open: false,
          iconSkin: 'insight-normal',
          children: [
            {id: 21, iconSkin: 'insight-service', name: '新增'},
            {id: 22, iconSkin: 'insight-service', name: '修改', open: true},
            {id: 22, iconSkin: 'insight-service', name: '删除', open: true},
            {
              id: 22,
              iconSkin: 'insight-service',
              name: '模板查询',
              open: true
            }
          ]
        },

        {
          id: 3,
          pid: 0,
          iconSkin: 'insight-file',
          name: '文件',
          checked: true,
          open: true,
          children: [
            {
              id: 32,
              iconSkin: 'insight-service',
              name: '文件上传',
              open: true
            }
          ]
        },

        {
          id: 4,
          iconSkin: 'insight-other',
          name: '第三方接口',
          checked: true,
          open: true,
          children: [
            {id: 41, iconSkin: 'insight-service', name: 'SSH', open: true},
            {id: 42, iconSkin: 'insight-service', name: 'HTTP', open: true}
          ]
        }
      ],
      //ztree对象
      ztreeObj: null,

      setting: {
        view: {
          showIcon: true,
          nameIsHTML: true,
          fontCss: {'font-size': '12px', 'font-family': '微软雅黑bai'}
        },

        data: {},
        //ztree回调函数
        callback: {
          //树选择事件
          onCheck: this.ztreeOnCheck
        }
      },
      service_setting: {
        view: {
          showIcon: true,
          nameIsHTML: true,
          fontCss: {'font-size': '12px', 'font-family': '微软雅黑bai'}
        },

        data: {
          key: {
            name: "key"
          }
        },
        //ztree回调函数
        callback: {
          //树选择事件
          onClick: this.service_node_click
        }
      },

      service_nodes: [],
      service_loading: false,
      explore: ['1'],
      isShowAside: true,
      dir_setting: {
        view: {
          showIcon: true,
          nameIsHTML: true,
          fontCss: {'font-size': '12px', 'font-family': '微软雅黑bai'}
        },

        data: {
          key: {
            name: "name"
          }
        },
        //ztree回调函数
        callback: {
          //树选择事件
          onClick: this.dir_click
        }
      },
      dir_loading: false,
      dir_nodes: [],
      file_content: "",
      file_content_loading: false,
      file_path: "service_router.yml",
      show_type: "file",
      loading_background: "rgba(0, 0, 0, 0.8)",
      flow_loading:false,
      nodes: [
        // {
        //   'id': 'n1',
        //   'width': 100,
        //   'height': 80,
        //   'coordinate': [-600, -200],
        //   'meta': {
        //     'prop': 'start',
        //     'name': '开始'
        //   }
        // },
        // {
        //   'id': 'n2',
        //   'width': 100,
        //   'height': 80,
        //   'coordinate': [-300, -200],
        //   'meta': {
        //     'prop': 'approval',
        //     'name': '重启',
        //     'desc': ""
        //   }
        // },
        //
        // {
        //   'id': 'n3',
        //   'width': 100,
        //   'height': 80,
        //   'coordinate': [0, -200],
        //   'meta': {
        //     'prop': 'end',
        //     'name': '结束',
        //
        //
        //   }
        // },

      ],
      target:"server.install_monitor",
      links: [
        // {
        //   'id': 'link1',
        //   'startId': 'n1',
        //   'endId': 'n2',
        //   'startAt': [100, 40],
        //   'endAt': [0, 40],
        //   'meta': {
        //     desc: "next"
        //   }
        // },
        // {
        //   'id': 'link2',
        //   'startId': 'n2',
        //   'endId': 'n3',
        //   'startAt': [100, 40],
        //   'endAt': [0, 40],
        //   'meta': {
        //     desc: "next"
        //   }
        // },
        // {
        //   'id': 'link3',
        //   'startId': 'n2',
        //   'endId': 'n3',
        //   'startAt': [50, 80],
        //   'endAt': [50, 80],
        //   'meta': {
        //     desc: "fail"
        //   }
        // }
      ],

    }
  },
  mounted() {
    this.get_router_node()
    this.get_dir_tree()

  },
  computed: {
    content_mine() {
      if (this.file_path.endsWith(".sql")) {
        return "text/x-mysql"
      }
      return "yaml"
    }
  },

  methods: {
    open_flow(){
      this.flow_show=true
      this.get_flow_data()
    },

    async get_flow_data() {
      this.flow_loading = true
      let response = await API.TEMPLATE({"service": "config.flow_nodes",
        // "target":"monitor.oracle_delay_monitor_create",
        "target":this.target,
      })
      this.flow_loading = false
      let data = response.data
      if (data.success) {

        this.nodes = data.data.nodes
        this.links=data.data.links
      }
    },
    get_editor_type() {
      // return "python"
      if (this.file_path.endsWith(".sql")) {
        return "sql"
      }
      if (this.file_path.endsWith(".json")) {
        return "json"
      }
      return "yaml"
    },

    async get_dir_tree() {
      this.dir_loading = true
      let response = await API.TEMPLATE({"service": "config.dir_tree"})
      this.dir_loading = false
      let data = response.data
      if (data.success) {
        this.dir_nodes = data.data
      }
    },
    dir_click(evt, treeId, node) {
      if (node["type"] == "folder") {
        return
      }
      let names = [node["name"]]
      let parent = node.getParentNode()
      while (parent) {
        let node = parent
        names.unshift(node["name"])
        parent = node.getParentNode()
      }
      this.file_path = names.join("/")

      this.show_type = "file"

      this.get_file_content()

    },
    async get_file_content() {

      this.file_content_loading = true
      let response = await API.TEMPLATE({
        "service": "config.service_content",
        "path": this.file_path
      })
      this.file_content_loading = false
      let data = response.data
      if (data.success) {
        this.file_options["language"] = this.get_editor_type()
        this.file_content = data.data
      }

    },

    async get_router_node() {
      this.service_loading = true
      let response = await API.TEMPLATE({"service": "config.router"})
      this.service_loading = false
      let data = response.data
      if (data.success) {
        this.service_nodes = data.data
      }
    },
    get_data(group, service) {
      for (let i = 0; i < this.service_nodes.length; i++) {
        let group_data = this.service_nodes[i]
        if (group == group_data["key"]) {
          let children = group_data["children"]
          for (let j = 0; j < children.length; j++) {
            let service_data = children[j]
            if (service_data["key"] == service) {
              return service_data
            }
          }
        }
      }
    },

    service_node_click(evt, treeId, node) {
      if (node.level < 1) {
        return
      }
      let service = node["key"]
      let parent = node.getParentNode()
      let group = parent["key"]
      let data = this.get_data(group, service)
      this.show_type = "config"
      // this.file_options["language"]="json"
      this.api = JSON.stringify(data, null, "\t")
      console.log(this.api)


    },
    fileVisible(val) {
      this.fileActive = val
    }
  }
}
