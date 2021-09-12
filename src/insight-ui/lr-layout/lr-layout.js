import { getScreenHeight } from '../tool'
export default {
  data() {
    return {
      isShowAside: true,
      leftStyle: {
        height: getScreenHeight(-68) + 'px'
      },
      rightStyle: {
        height: getScreenHeight(-68) + 'px'
      },
      leftWidthStyle: {
        width: '260px'
      }
    }
  },

  mounted() {},

  watch: {
    leftWidthStyle: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  }
}
