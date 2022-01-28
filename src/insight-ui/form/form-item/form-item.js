import {FormItem} from "element-ui"
import NiIcon from "../../icon"
export default {
  extends: FormItem,
  components:{
    NiIcon
  },
  props:{
    errorMsg:{
      type:String,
      default: undefined
    },
    rules:{

      default(){
          return []
      }
    },
    inlineMessage:{
      type:Boolean,
      default(){
        return true
      }
    },
   size:{
   	type:String,
     default:function(){
       return "mini"
     }
   },
    helpInfo:{
      type:String,
      default(){
        return ""
      }
    },

    err_icon:{
      type:String,
      default(){
        return "#cms_butongguo"
      }
    }
  },
  mounted(){


     if(this.rules.push && this.errorMsg){
       this.rules.push({ required: true, message: this.errorMsg, trigger: ['blur','change'] })
     }
  }

}
