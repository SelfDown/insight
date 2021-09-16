export default {
  props: {
    y: {
      type: String,
      default(){

        return '0px'
      }
    },

    icon: {
      type: String,
      default() {
        return '#the_third_icontijiao2'
      }
    },
    size: {
      type: String,
      default() {

        return null
      }
    },
    iconStyle: {
      type: Object,
      default() {
        let s = {
          padding: '0px 2px',
          width: '1.4rem',
          height: '1.4rem',
          'margin-top': '-2px',
          transform: 'translateY(2px)'
        }

        if (this.y) {
          s['transform'] = 'translateY(' + this.y + ')'
        }
        return s
        //     let s = null
        //     if (this.size == "mini") {
        //          s= {
        //             'padding': '0px 2px',
        //             'width': '1.4rem',
        //             'height': '1.4rem',
        //             'margin-top': '-2px',
        //             'transform': 'translateY(2px)'
        //         }
        //     }if(this.size =="small"){
        //          s =  {
        //             'padding': '0px 2px',
        //             'width': '1.4rem',
        //             'height': '1.4rem',
        //             'margin-top': '-2px',
        //             'transform': 'translateY(6px)'
        //         }
        //     } else {
        //          s=  { padding: '4px 16px' }
        //     }

        //     // if(this.y){
        //     //     s["transform"] = 'translateY('+this.y+')'
        //     // }

        //     return s
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    nClick() {
      this.$emit('click')
    }
  }
}
