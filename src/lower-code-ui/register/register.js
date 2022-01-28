//
let registerData = undefined
class Register {
  constructor() {
    this.loadRegister()
  }

  getTagName() {
    return "tag"
  }

  getComponentName() {
    return "component"
  }

  getTag(item) {
    if (item) {
      return item[this.getTagName()]
    }
  }

  getRegConfig(tag) {
    if (registerData[tag]) {
      return registerData[tag]
    }
  }

  getRegComponent(tag) {

    let config = this.getRegConfig(tag)
    if (config) {
      let component = config[this.getComponentName()]
      if (!component) {
        console.error(config)
        console.error("没有找到" + this.getComponentName() + "字段")
      }
      return component
    }
  }

  loadRegister() {
    //如果已经处理过，就取缓存变量对象
    if (registerData) {
      return registerData
    }
    let context = require.context('./local', true, /\.json$/);
    registerData = {}
    let fileList = context.keys()
    for (let i = 0; i < fileList.length; i++) {
      let fileName = fileList[i]
      let content = context(fileName)
      //动态获取配置文件内容
      content.map(item => {
        let tag = this.getTag(item)
        if (tag) {
          registerData[tag] = item
        } else {
          console.error(item)
          console.error("没有配置tag 标签注册失败")
        }

      })


    }
    return registerData
  }
}

export default Register

