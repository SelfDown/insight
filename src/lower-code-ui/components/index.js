let components = {}
import scanComponents from "./service/scan-component"
const scan = new scanComponents()
let _components = scan.getComponents()

_components.map(item => {
  components[`${item.name}`] = () => import(`${item.path}`)
})
export default {
  ...components
}
