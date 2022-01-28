import {Form} from "element-ui"

export default {
  extends: Form,
  props:{
   size:{
   	type:String,
     default:function(){
       return "mini"
     }
   }
  }


}
