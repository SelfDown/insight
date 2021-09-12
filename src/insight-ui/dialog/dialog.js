  import NiButton from "../button"

	
	export default{
    components:{
      NiButton,
    },
		props:{
      icon:{
        type:String,
      },
			rightOpenWidth:{
				type:String,
				default:"70%"
			},
      right_open_height:{
				type:String,
				default:"99.32%"
			},
      right_open_top:{
				type:String,
				default:"2px"
			},
			visible:{
				type:Boolean,
				default:false,
			},

      beforeClose: Function,

      title:{
			  type:String,
				default:""
      },
		},
		data(){
			return {
				right_open_style:{},
        body_height: "100%",
			}
		},
		watch:{
			visible(value){
				if(value){
					this.right_open_style ={
            "width": this.rightOpenWidth,
            "height": this.right_open_height,
            "top": this.right_open_top
          }
					this.get_body_height()
				}else{
					this.right_open_style = {}
				}
				
			}
		},

    mounted(){
      this.get_body_height()

    },

    methods:{

      get_body_height(){
        this.$nextTick(() =>{
          let tool_el = this.$el.querySelector(".tool")
          let footer_el = this.$el.querySelector(".ni-dialog__footer")
          this.body_height = this.$el.offsetHeight - (tool_el ? tool_el.offsetHeight : 0) -
            (footer_el ? footer_el.offsetHeight : 0) + "px"
        })
      },

      // 点击关闭按钮
      handle_close(){
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.close);
        } else {
          this.close();
        }
      },

      // 关闭
      close(){
        this.$emit('update:visible', false);
      },
    },
	}
