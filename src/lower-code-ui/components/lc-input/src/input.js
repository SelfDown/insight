import {
  IInput
} from "@/insight-ui"
import component from "../../mixin/component";

export default {
  components: {
    IInput
  },
  mixins: [component],
  data() {
    return {
      dataValue: ""
    }
  },
  watch:{
    dataValue(val){
      console.log(val)
    }
  },
  render(h){
    return <i-input {...{ attrs: this.config }} vModel={this.dataValue}/>
  }

}
