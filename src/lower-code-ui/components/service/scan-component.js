let _com = undefined
export default class ScanComponent {
  constructor() {

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
        console.error("加载" + fileName + "没有找到name 属性")
        console.error(component)
        continue
      }
      //判断是否有路径
      let path = component.path
      if (!component.path) {
        console.error("加载" + fileName + "没有找到path 属性")
        console.error(component)
        continue
      }
      _com.push(component)

    }
    return _com

  }


}
