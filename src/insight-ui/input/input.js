import {Input} from "element-ui"

export default {
  extends: Input,
  props:{
   size:{
   	type:String,
     default:function(){
       return "mini"
     }
   }
  }


}
