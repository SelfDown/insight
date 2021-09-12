import axios from 'axios'
import qs from "qs"
let base = '/omnis';
//通用方法


export const POST = (url, params) => {

  return axios.post(`${base}${url}`, params)
}

export const POST_PARAMS = (url, params) => {

  return axios.post(`${base}${url}`, qs.stringify(params))
}
export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params:params})
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {data:params})
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params)
}
export const TEMPLATE=(params) => {

  return axios.post(`${base}/template_data/data`, params)
}

/**
* 主要用于文件上传
*/
export const POST_FORM = (url, form) => {
	 let requestConfig = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    }
  return axios.post(`${base}${url}`, form,requestConfig)
}
