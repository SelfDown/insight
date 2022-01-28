import formItem from './form-item.vue'
formItem.install = function (Vue) {
  Vue.component(formItem.name, formItem);
};
export default formItem
