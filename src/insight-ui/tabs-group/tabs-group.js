import {Splitpanes, Pane} from 'splitpanes'
import ITabs from "../tabs"
import ITabPane from "../tabs/tab-pane"
import IIcon from "../icon"
import ILine from "../line"
import IMonaco from "../monaco"
import 'splitpanes/dist/splitpanes.css'
import * as Common from "@/common/index.js"

const postfix = [
  {
    file_type: "json",
    icon: "#i-json",
    fix: [".json"]
  },
  {
    file_type: "yaml",
    icon: "#i-yaml",
    fix: [".yml", ".yaml"]
  },
  {
    file_type: "sql",
    icon: "#i-SQL1",
    fix: [".sql"]
  },
  {
    file_type: "json",
    icon: "#i-API",
    fix: [".api"]

  }
]


export default {
  components: {
    Splitpanes,
    Pane,
    ITabs,
    ITabPane,
    IIcon,
    IMonaco,
    ILine
  },
  data() {
    return {
      current_group: "default",
      current_tab_index: "",
      groups: [
        {
          group: "default",
          active: "first",
          files: []
        }
      ],
      codeStyle: {
        height: Common.getTableHeight(-102) + "px",
        width: "100%",

      },
      left: 0,
      top: 0,
      contextMenuVisible: false,

    }
  },
  methods: {
    closeAll() {
      let group = this.get_group(this.current_group)
      group.files.splice(0, group.files.length)
      this.contextMenuVisible = false
    },
    closeLeft() {
      let group = this.get_group(this.current_group)
      let r = []
      for (let i = 0; i < group.files.length; i++) {
        let file = group.files[i]
        if (i < this.current_tab_index) {
          let path = file["name"]
          r.push({"path": path, "group_name": this.current_group})
        }
      }
      r.map(item => {
        this.removeTab(item["path"], item["group_name"])
      })
      this.contextMenuVisible = false
    },

    closeRight() {


      let group = this.get_group(this.current_group)
      let r = []
      for (let i = 0; i < group.files.length; i++) {
        let file = group.files[i]
        if (i > this.current_tab_index) {
          let path = file["name"]
          r.push({"path": path, "group_name": this.current_group})
        }
      }
      r.map(item => {
        this.removeTab(item["path"], item["group_name"])
      })
      this.contextMenuVisible = false

    },

    closeOther() {

      let group = this.get_group(this.current_group)
      let r = []
      for (let i = 0; i < group.files.length; i++) {
        let file = group.files[i]
        if (i != this.current_tab_index) {
          let path = file["name"]
          r.push({"path": path, "group_name": this.current_group})
        }
      }
      r.map(item => {
        this.removeTab(item["path"], item["group_name"])
      })
      this.contextMenuVisible = false

    },

    hidden_menu(event) {

      let tab_menu = document.getElementById("tab_menu")
      if (tab_menu && !tab_menu.contains(event.target)) {
        this.contextMenuVisible = false
      }
    },
    openContextMenu(e, group_name) {

      if (e.target.id.startsWith("tabs_")) {
        let item = e.target.id.split("_")
        if (item.length >= 2) {
          this.current_tab_index = parseInt(item[2])
        }

        this.contextMenuVisible = true;
        this.left = e.clientX;
        this.top = e.clientY + 10;
        this.current_group = group_name
      } else {
        this.contextMenuVisible = false
      }


    },
    clickTab(path, group_name) {
      let tab = this.get_tab(path["name"], group_name)
      this.$emit("tabClick", tab["tag"], tab["treeId"])


    },
    get_tab(path, group_name) {
      let group = this.get_group(group_name)
      for (let i = 0; i < group.files.length; i++) {
        let file = group.files[i]
        if (file["name"] == path) {
          return file
        }
      }
    },
    get_tab_index(path, group_name) {
      let group = this.get_group(group_name)
      for (let i = 0; i < group.files.length; i++) {
        let file = group.files[i]
        if (file["name"] == path) {
          return i
        }
      }
      return 0
    },
    removeTabByIndex(index, group_name) {
      let group = this.get_group(group_name)
      let tab = group.files[index]
      if (group.active == tab["name"]) {
        let target = 0
        if (group.files.length == 1) {// 只有一个
          target = index
        } else if (group.files.length == index + 1) {//最后一个
          target = index - 1
        } else {//中间位置
          target = index + 1
        }
        group.active = group.files[target]["name"]

      }
      group.files.remove(tab)

    },

    removeTab(path, group_name) {
      let index = this.get_tab_index(path, group_name)
      this.removeTabByIndex(index, group_name)

    },
    get_group_dict() {
      let d = {}
      this.groups.map(group => {
        let key = group["group"]
        d[key] = group
      })
      return d
    },
    get_file_fix(path) {
      return "." + path.split(".").pop().toLowerCase()
    },
    get_file_config(path, default_type) {
      let fix = this.get_file_fix(path)
      let c = {
        "icon": "",
        "file_type": default_type
      }
      for (let pf in postfix) {
        let item = postfix[pf]
        if (item.fix.indexOf(fix) >= 0) {
          c = item
          break
        }
      }
      return c


    },
    get_file_obj(filename, path, content, default_file_type = "python", tag = "", treeId = "") {

      let f = this.get_file_config(path, default_file_type)
      let o = {
        "tag": tag,
        "treeId": treeId,
        "icon": f["icon"],
        "name": path,
        "label": filename,
        "content": content,
        "option": {
          language: f["file_type"],
          theme: 'vs-dark',
          readOnly: false
        }
      }

      return o

    },

    get_group(group) {
      let g_dict = this.get_group_dict()
      return g_dict[group]
    },
    /**
     *  添加面板
     * @param file[filename]
     * @param file[path]
     * @param file[content]
     * @param file[tag] 业务标志
     * @param file[group_name]
     * @param file[default_file_type]
     */

    add_file(file) {
      let filename = file["filename"]
      let path = file["path"]
      let content = file["content"]
      let tag = file["tag"]
      let treeId = file["treeId"]
      let group_name = file["group_name"]
      if (!group_name) {
        group_name = "default"
      }
      let default_file_type = file["default_file_type"]
      if (!default_file_type) {
        default_file_type = "python"
      }


      let group = this.get_group(group_name)
      let file_obj = this.get_file_obj(filename, path, content, default_file_type, tag, treeId)
      group.files.push(file_obj)
      group.active = path
    },

    set_active_path(path, group_name = "default") {
      let group = this.get_group(group_name)
      group["active"] = path
    },

    /**
     * 判断是已经存在这个文件
     * @param path
     * @param group_name
     * @returns {boolean}
     */
    has_file(path, group_name = "default") {
      let group = this.get_group(group_name)
      for (let i = 0; i < group.files.length; i++) {
        let f = group.files[i]
        if (f.name == path) {
          return true
        }
      }
      return false

    }

  }
}
