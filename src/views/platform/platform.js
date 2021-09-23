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
  ITabPane,
  ITabsGroup,
  ILine

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
    ITabPane,
    ITabsGroup,
    ILine

  },

  props: {},
  data() {
    return {
      file_tree_ref: "dir_tree",
      service_tree_ref: "service_tree",
      serviceTreeVisible: false,
      serviceTreeLeft: 0,
      serviceTreeTop: 0,
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

      //ztree对象
      ztreeObj: null,

      setting: {
        treeId: "key",
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
          onClick: this.service_node_click,
          onRightClick: this.service_node_right_click
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
      flow_loading: false,
      nodes: [],
      target: "server.install_monitor",
      links: [],
      service_search: ""


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

    hidden_tree_menu(event) {

      let service_tree_menu = document.getElementById("service_tree_menu")
      if (service_tree_menu && !service_tree_menu.contains(event.target)) {
        this.serviceTreeVisible = false
      }
    },

    filter_search() {
      let ztreeObj = this.get_ztree_obj(this.service_tree_ref)
      let search = this.service_search
      //如果没有搜索条件，就显示全部
      var nodes = ztreeObj.getNodesByParam("isHidden", true);
      ztreeObj.showNodes(nodes);
      if (!search) {

        return
      }


      // 匹配节点方法
      function matchNode(node) {
        let match = false
        //当前节点关键字匹配
        if (node.key.indexOf(search) >= 0) {
          match = true
        }
        //子节点内容匹配
        if (!match && !node.isParent) {
          let t = JSON.stringify(node)
          if (t.indexOf(search) >= 0) {
            match = true
          }
        }
        return match

      }

      //过滤节点是否显示隐藏
      function get_hide_service_node(node) {
        let hide = true
        if (matchNode(node)) {
          hide = false
        }
        let parent = node.getParentNode(node)
        if (hide && parent && matchNode(parent)) {
          hide = false
        }
        if (hide && node.isParent) {
          for (let i = 0; i < node.children.length; i++) {
            let item = node.children[i]
            if (matchNode(item)) {
              hide = false
              break
            }
          }

        }
        return hide
      }

      let h = ztreeObj.getNodesByFilter(get_hide_service_node)
      ztreeObj.hideNodes(h)
      ztreeObj.expandAll(true);
    },
    tabClick(tag, key) {
      let name = "key"
      if (tag == this.service_tree_ref) {
        name = "service"
      } else {
        name = "key"
      }
      let node = this.get_node(tag, key, name)
      if (node) {
        this.select_node(tag, node)
      }
    },

    get_ztree_obj(tag) {
      let ztree = this.$refs[tag]
      if (ztree) {
        return ztree.ztreeObj
      }
    },
    select_node(tag, node) {
      let ztreeObj = this.get_ztree_obj(tag)
      if (node) {
        ztreeObj.selectNode(node)
      }

    },
    get_node(tag, key, name = "key") {
      let ztreeObj = this.get_ztree_obj(tag)

      return ztreeObj.getNodeByParam(name, key);
    },
    open_flow() {
      this.flow_show = true
      this.get_flow_data()
    },

    async get_flow_data() {
      this.flow_loading = true
      let response = await API.TEMPLATE({
        "service": "config.flow_nodes",
        // "target":"monitor.oracle_delay_monitor_create",
        "target": this.target,
      })
      this.flow_loading = false
      let data = response.data
      if (data.success) {

        this.nodes = data.data.nodes
        this.links = data.data.links
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
      this.add_editor_file(node["name"], this.file_path, this.file_tree_ref, node["key"])


    },
    async add_editor_file(file_name, path, tag, treeId, content = null) {
      // 如果已经存在打开文件，就选中，否则请求服务器
      if (this.$refs.file_group.has_file(path)) {
        this.$refs.file_group.set_active_path(path)
      } else {
        if (content == null) {
          content = await this.get_file_content(path)
        }

        let file = {
          filename: file_name,
          path: path,
          content: content,
          tag: tag,
          treeId: treeId
        }
        this.$refs.file_group.add_file(file)
      }


    },
    async get_file_content(path) {

      this.file_content_loading = true
      let response = await API.TEMPLATE({
        "service": "config.service_content",
        "path": path
      })
      this.file_content_loading = false
      let data = response.data
      if (data.success) {
        // this.file_options["language"] = this.get_editor_type()
        return data.data
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
    service_node_right_click(evt, treeId, node) {
      if (node.isParent) {
        return
      }
      console.log(node)
      let treeObj = this.get_ztree_obj(this.service_tree_ref)
      treeObj.selectNode(node);
      this.serviceTreeVisible = true
      this.serviceTreeLeft = evt.clientX
      this.serviceTreeTop = evt.clientY

    },

    service_node_click(evt, treeId, node) {

      if (node.level < 1) {
        return
      }
      let service = node["key"]
      let parent = node.getParentNode()
      let group = parent["key"]
      let names = [node["key"]]
      while (parent) {
        let node = parent
        names.unshift(node["key"])
        parent = node.getParentNode()
      }
      let path = names.join("/") + ".api"
      let data = this.get_data(group, service)
      this.show_type = "config"
      // this.file_options["language"]="json"
      let api = JSON.stringify(data, null, "\t")
      let service_key = node["service"]
      this.add_editor_file(service_key, path, this.service_tree_ref, service_key, api)


    },
    fileVisible(val) {
      this.fileActive = val
    }
  }
}
