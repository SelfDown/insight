import * as monaco from "monaco-editor";
let sqlStr =
  "ADD EXCEPT PERCENT ALL EXEC PLAN ALTER EXECUTE PRECISION AND EXISTS PRIMARY ANY EXIT PRINT AS FETCH PROC ASC FILE PROCEDURE AUTHORIZATION FILLFACTOR PUBLIC BACKUP FOR RAISERROR BEGIN FOREIGN READ BETWEEN FREETEXT READTEXT BREAK FREETEXTTABLE RECONFIGURE BROWSE FROM REFERENCES BULK FULL REPLICATION BY FUNCTION RESTORE CASCADE GOTO RESTRICT CASE GRANT RETURN CHECK GROUP REVOKE CHECKPOINT HAVING RIGHT CLOSE HOLDLOCK ROLLBACK CLUSTERED IDENTITY ROWCOUNT COALESCE IDENTITY_INSERT ROWGUIDCOL COLLATE IDENTITYCOL RULE COLUMN IF SAVE COMMIT IN SCHEMA COMPUTE INDEX SELECT CONSTRAINT INNER SESSION_USER CONTAINS INSERT SET CONTAINSTABLE INTERSECT SETUSER CONTINUE INTO SHUTDOWN CONVERT IS SOME CREATE JOIN STATISTICS CROSS KEY SYSTEM_USER CURRENT KILL TABLE CURRENT_DATE LEFT TEXTSIZE CURRENT_TIME LIKE THEN CURRENT_TIMESTAMP LINENO TO CURRENT_USER LOAD TOP CURSOR NATIONAL TRAN DATABASE NOCHECK TRANSACTION DBCC NONCLUSTERED TRIGGER DEALLOCATE NOT TRUNCATE DECLARE NULL TSEQUAL DEFAULT NULLIF UNION DELETE OF UNIQUE DENY OFF UPDATE DESC OFFSETS UPDATETEXT DISK ON USE DISTINCT OPEN USER DISTRIBUTED OPENDATASOURCE VALUES DOUBLE OPENQUERY VARYING DROP OPENROWSET VIEW DUMMY OPENXML WAITFOR DUMP OPTION WHEN ELSE OR WHERE END ORDER WHILE ERRLVL OUTER WITH ESCAPE OVER WRITETEXT";
export default {
  name: "monaco",

  props: {
    options: {
      type: Object,
      default() {
        return {
          language: "java", // shell、sql、python
          readOnly: true, // 不能编辑
        };
      }
    },

    value: {
      type: String,
      default: ""
    }
  },
  // model: {
  //   prop: 'value',
  //   event: 'value_change'
  // },

  data() {
    return {
      monacoInstance: null,
      provider: null,
      hints: [
        "SELECT",
        "INSERT",
        "DELETE",
        "UPDATE",
        "CREATE TABLE",
        "DROP TABLE",
        "ALTER TABLE",
        "CREATE VIEW",
        "DROP VIEW",
        "CREATE INDEX",
        "DROP INDEX",
        "CREATE PROCEDURE",
        "DROP PROCEDURE",
        "CREATE TRIGGER",
        "DROP TRIGGER",
        "CREATE SCHEMA",
        "DROP SCHEMA",
        "CREATE DOMAIN",
        "ALTER DOMAIN",
        "DROP DOMAIN",
        "GRANT",
        "DENY",
        "REVOKE",
        "COMMIT",
        "ROLLBACK",
        "SET TRANSACTION",
        "DECLARE",
        "EXPLAN",
        "OPEN",
        "FETCH",
        "CLOSE",
        "PREPARE",
        "EXECUTE",
        "DESCRIBE",
        "FORM",
        "ORDER BY"
      ]
    };
  },
  created() {
    this.initHints();
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  watch: {
    value(val) {
      if(val==null || val==undefined){
          this.monacoInstance.setValue("")
      }
      this.monacoInstance.setValue(val)
    },
    options:{
      handler(val,old){
        this.init()
      },
      deep:true
    }
  },

  methods: {
    dispose() {
      if (this.monacoInstance) {
        if (this.monacoInstance.getModel()) {
          this.monacoInstance.getModel().dispose();
        }
        this.monacoInstance.dispose();
        this.monacoInstance = null;
        if (this.provider) {
          this.provider.dispose();
          this.provider = null
        }
      }
    },
    initHints() {
      let sqlArr = sqlStr.split(" ");
      this.hints = Array.from(new Set([...this.hints, ...sqlArr])).sort();
    },
    init() {
      let that = this;
      this.dispose();
      // let createCompleters = textUntilPosition => {
      //   //过滤特殊字符
      //   let _textUntilPosition = textUntilPosition
      //     .replace(/[\*\[\]@\$\(\)]/g, "")
      //     .replace(/(\s+|\.)/g, " ");
      //   //切割成数组
      //   let arr = _textUntilPosition.split(" ");
      //   //取当前输入值
      //   let activeStr = arr[arr.length - 1];
      //   //获得输入值的长度
      //   let len = activeStr.length;
      //
      //   //获得编辑区域内已经存在的内容
      //   let rexp = new RegExp('([^\\w]|^)' + activeStr + '\\w*', "gim");
      //   let match = that.value.match(rexp);
      //   let _hints = !match ? [] : match.map(ele => {
      //     let rexp = new RegExp(activeStr, "gim");
      //     let search = ele.search(rexp);
      //     return ele.substr(search)
      //   })
      //
      //   //查找匹配当前输入值的元素
      //   let hints = Array.from(new Set([...that.hints, ..._hints])).sort().filter(ele => {
      //     let rexp = new RegExp(ele.substr(0, len), "gim");
      //     return match && match.length === 1 && ele === activeStr || ele.length === 1
      //       ? false
      //       : activeStr.match(rexp);
      //   });
      //   //添加内容提示
      //   let res = hints.map(ele => {
      //     return {
      //       label: ele,
      //       kind: that.hints.indexOf(ele) > -1 ? monaco.languages.CompletionItemKind.Keyword : monaco.languages.CompletionItemKind.Text,
      //       documentation: ele,
      //       insertText: ele
      //     };
      //   });
      //   return res;
      // };
      // this.provider = monaco.languages.registerCompletionItemProvider("sql", {
      //   provideCompletionItems(model, position) {
      //     var textUntilPosition = model.getValueInRange({
      //       startLineNumber: position.lineNumber,
      //       startColumn: 1,
      //       endLineNumber: position.lineNumber,
      //       endColumn: position.column
      //     });
      //     var suggestions = createCompleters(textUntilPosition);
      //     return {
      //       suggestions: suggestions
      //     };
      //
      //     return createCompleters(textUntilPosition);
      //   }
      // });

      // 初始化编辑器实例
      this.monacoInstance = monaco.editor.create(this.$refs["container"], {
        value: this.value,
        theme: "vs-dark",
        autoIndex: true,
        automaticLayout:true,
        ...this.options
      });

      // 监听编辑器content变化事件
      this.monacoInstance.onDidChangeModelContent(() => {
        let value = this.monacoInstance.getValue()
        this.$emit("contentChange", value);
        // this.$emit("value_change", value)
      });
    }
  }
};
