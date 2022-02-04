// 封装请求模块
import axios from 'axios';
import store from '../store/index'
import JSONBig from 'json-bigint'
// axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net'
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net/',
    transformResponse: [function (data) {
        try {
            return JSONBig.parse(data)
        } catch (error) {
            return data
        }
    }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    const user = store.state.user
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
}, error => {
    return Promise.reject(error);
});


// axios.defaults.headers = { Authorization: `Bearer ${store.state.user.token}` }
export default request

