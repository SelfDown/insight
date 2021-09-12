/**
 *
 * @param all_height table 的总高度
 * @param data       table 数据
 * @param index      匹配的行数
 * @returns {number}  高度
 */
export const getFisrtMachTopHeight = (all_height, data, index) => {
  return (all_height / data.length) * index
}

/**
 *
 * @param search_value 搜索的字符串內容
 * @param table_datatable 数据
 * @param col_name table 列名
 * @returns {number}  匹配的序号
 */
export const getFirstMatchIndex = (search_value, table_data, col_name) => {
  for (let i = 0; i < table_data.length; i++) {
    let text = table_data[i][col_name]

    if (text.indexOf(search_value) >= 0) {
      return i
    }
  }
}

/**
 *
 * @param name
 * @param value
 */
export const setCookie = (name, value) => {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}
// /**
//  *
//  * @param name
//  * @returns {string|null}
//  */
// export const getCookie = (name) => {
//   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//   if (arr = document.cookie.match(reg))
//     return unescape(arr[2]);
//   else
//     return null;
// }
// /**
//  *
//  * @param name
//  */
// export const delCookie = (name) => {
//   var exp = new Date();
//   exp.setTime(exp.getTime() - 1);
//   var cval = getCookie(name);
//   if (cval != null)
//     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
// }

export const setLocalStorage = (name, value) => {
  window.localStorage.setItem(name, value)
}
export const getLocalStorage = name => {
  return window.localStorage.getItem(name)
}

export const getTableHeight = the_height => {
  return window.innerHeight + the_height + 15
}

export const getTableWidth = the_width => {
  return window.innerWidth + the_width + 'px'
}
