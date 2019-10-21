import axios from "axios";
import qs from "qs";
import { Toast } from 'vant';


/****** 创建axios实例 ******/
const service = axios.create({
    baseURL: process.env.API_ROOT,  // api的base_url
    timeout: 5000  // 请求超时时间
});


/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
}, error => {  //请求错误处理
    this.$toast.fail('服务器错误！！！');
    Promise.reject(error)
});


/**
 * 响应拦截
 */
service.interceptors.response.use(response => {
    const status = response.status;
    if (status === 200) {
        return response
    } else {
        this.$toast.fail(statusText)
    }
    return response
}, error => {
    return Promise.reject(error)
})
export default service;
