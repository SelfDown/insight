let _com = undefined
let _dict = undefined
export default class ScanComponent {
  constructor() {

  }

  getComponentByType(type) {
    // 如果初始化过了，则返回之前的数据
    if (_dict) {
      return _dict[type]
    }
    _dict = {}
    let components = this.getComponents()
    components.map(item => {
      _dict[item.type] = item
    })
    let component = _dict[type]
    if (component) {
      return component
    } else {
      console.error("没有注册 " + type + "组件")
    }
  }

  getComponents() {
    if (_com) {
      return _com
    }
    _com = []
    //扫描上级目录的json文件
    let context = require.context('..', true, /\.json$/);
    let fileList = context.keys()
    for (let i = 0; i < fileList.length; i++) {
      let fileName = fileList[i]
      let component = context(fileName)
      let name = component.name
      //判断是否有名称
      if (!name) {
        console.error("加载" + fileName + "没有找到 【name】 属性")
        console.error(component)
        continue
      }
      //判断是否有路径
      let path = component.path
      if (!component.path) {
        console.error("加载" + fileName + "没有找到 【path】 属性")
        console.error(component)
        continue
      }      //判断是否有路径
      let type = component.type
      if (!component.type) {
        console.error("加载" + fileName + "没有找到 【type】 属性")
        console.error(component)
        continue
      }
      _com.push(component)

    }
    return _com

  }


}
