// 封装请求模块
import axios from 'axios';
import store from '../store/index'
axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net'
axios.defaults.headers = { Authorization: `Bearer ${store.state.user.token}` }
export default axios