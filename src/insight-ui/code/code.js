import 'codemirror/theme/monokai.css'
import 'codemirror/theme/3024-day.css'
import 'codemirror/theme/paraiso-light.css'
import 'codemirror/theme/duotone-light.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'


export default {
  props: {

    file_data: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: true,
    },
    lineNumbers: {
      type: Boolean,
      default: true,
    },
    show_type: {
      type: String,
      default: "shell"
    },
    formater_sql: {
      type: Boolean,
      default: true
    },

    theme: {
      type: String,
      default: "monokai"
    },
    mime: {
      type: String,
      default: "python"
    },
    codeStyle: {
      type: Object,
      default() {
        return {

          height: "600px",
          width: "100%"
        }
      }

    }
  },
  data() {
    return {
      CodeMirror: null,
      editors: 'false',
      code: '',
      ref:"code_" + require('node-uuid').v4(),
    }
  },

  model: {
    prop: 'file_data',
    event: 'file_data_change'
  },
  watch: {
    file_data: function (val) {

      this.setValue(val)
      // //聚焦一下否则不显示数据
      // this.editors.setValue(val);
      // let _this = this
      // setTimeout(() => {
      //
      //   _this.editors.refresh(val);
      //
      //
      // }, 100)


    },

  },
  created(){

  },
  mounted() {

    this.init()

  },
  methods: {
    setValue(val) {

      if (val === null || val === '') {
        val = ""
      }
      setTimeout(() => {
        this.editors.setValue(val);
      }, 50)
      this.code = val


    },
    scroll_to_bottom() {
      this.$nextTick(() => {

        document.getElementsByClassName("CodeMirror-scroll")[0].scrollTop = document.getElementsByClassName("CodeMirror-scroll")[0].scrollHeight
      })

    },
    init() {
      this.import_lib()
      this.create_edit()
      // setTimeout(()=>{
      //   this.create_edit()
      // },200)

    },
    import_lib() {

      let CodeMirror = require('codemirror/lib/codemirror')
      require('codemirror/addon/edit/matchbrackets')
      require('codemirror/addon/selection/active-line')

      require('codemirror/mode/sql/sql')
      require('codemirror/addon/hint/sql-hint')

      require('codemirror/mode/python/python')

      require('codemirror/mode/yaml/yaml')
      require('codemirror/mode/vue/vue')

      require('codemirror/mode/htmlmixed/htmlmixed')
      require('codemirror/mode/javascript/javascript')
      require('codemirror/addon/hint/show-hint')
      require('codemirror/addon/hint/xml-hint')
      this.CodeMirror = CodeMirror



    },
    create_edit() {


      this.editors = this.CodeMirror.fromTextArea(this.$refs[this.ref], {
        mode: this.mime, // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: this.lineNumbers,
        matchBrackets: true,
        theme: this.theme,
        autofocus: true,
        readOnly: this.readOnly,
        // extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
        hintOptions: {
          // 自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
      })
      this.editors.on("change", () => {
        //编译器内容更改事件
        this.code = this.editors.getValue()
        this.$emit("file_data_change", this.code)
      });
      this.editors.setSize("100%", "100%");


      this.setValue(this.file_data)


    },
  }
}
