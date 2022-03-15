import axios from 'axios'

import {BASEURL,TIMEOUT} from './constant'
//不用默认的实例axios,自己创建一个
const instance = axios.create({
    baseURL:BASEURL,
    timeout:TIMEOUT,

})
//添加拦截器
instance.interceptors.request.use(config=>{
    //发送网络请求时添加Loading组件
    
    //判断是否有token，进行添加或者跳转到登录页面

    //对请求参数进行序列化
    // console.log("进行了请求拦截");
    return config
},err=>{

})

instance.interceptors.response.use(res=>{
    return res.data
},err=>{
    if (err && err.response) {
        switch (err.response.status) {
          case 400:
            console.log("400错误");
            break;
          case 401:
            console.log("401错误");
            break;
          default:
            console.log("其他错误");
        }
      }
      return err;
})




export default instance