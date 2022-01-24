import {ILowerCode} from "@/insight-ui";

export default {
  components: {ILowerCode},
  data() {
    return {
      config: {
        "description": "页面",
        "type": "page",
        "items": [{
          "description": "左右布局",
          "type": "lr-layout",
          "items": [{
            "position": "left",
            "description": "左侧面板内容",
            "type": "panel",
            "items": [{
              "description": "搜索用户表单",
              "type": "form",
              "items": [{
                "type": "input",
                "label": "用户名",
                "name": "nick",
                "placeholder": "请输入用户名称"
              }, {
                "type": "input",
                "label": "账号",
                "name": "username",
                "placeholder": "请输入账号"
              }]
            }, {
              "description": "用户列表",
              "type": "table",
              "items": [{
                "type": "selection",
                "label": "#"
              }, {
                "type": "index",
                "label": "#"
              }, {
                "type": "column",
                "prop": "nick",
                "label": "用户名"
              }, {
                "type": "column",
                "prop": "username",
                "label": "账号"
              }]
            }]
          },
            {
              "position": "right",
              "description": "右侧面板内容",
              "type": "panel",
              "items": [{
                "description": "添加用户表单",
                "type": "form",
                "items": [{
                  "type": "input",
                  "label": "用户名",
                  "name": "nick",
                  "placeholder": "请输入用户名称"
                }, {
                  "type": "input",
                  "label": "账号",
                  "name": "username",
                  "placeholder": "请输入账号"
                }]
              }]
            }

          ]

        }]
      }

    }
  }
}
