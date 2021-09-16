import {Splitpanes, Pane} from 'splitpanes'
import ITabs from "../tabs"
import ITabPane from "../tabs/tab-pane"
import IIcon from "../icon"
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
  }
]


export default {
  components: {
    Splitpanes,
    Pane,
    ITabs,
    ITabPane,
    IIcon,
    IMonaco
  },
  data() {
    return {
      current_group: "default",
      groups: [
        {
          group: "default",
          active: "first",
          files: []
        }
      ],
      codeStyle: {
        height: Common.getTableHeight(-102) + "px",
        width: "100%"
      },

    }
  },
  methods: {
    removeTab(path, group_name) {
      let group = this.get_group(group_name)
      for (let i = 0; i < group.files.length; i++) {
        let file = group.files[i]
        if (file["name"] == path) {
          group.files.remove(file)
          break
        }
      }
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
    get_file_obj(filename, path, content, default_file_type = "python", tag = "") {

      let f = this.get_file_config(path, default_file_type)
      let o = {
        "tag": tag,
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
      let group_name = file["group_name"]
      if (!group_name) {
        group_name = "default"
      }
      let default_file_type = file["default_file_type"]
      if (!default_file_type) {
        default_file_type = "python"
      }


      let group = this.get_group(group_name)
      let file_obj = this.get_file_obj(filename, path, content, default_file_type, tag)
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
