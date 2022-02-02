// 封装请求模块
import axios from 'axios';
import store from '../store/index'
axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net'

// 请求拦截器
axios.interceptors.request.use(config => {
    const user = store.state.user
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// axios.defaults.headers = { Authorization: `Bearer ${store.state.user.token}` }
export default axios

