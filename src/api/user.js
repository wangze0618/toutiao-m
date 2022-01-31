import axios from '../utils/request';
// import store from '../store/index'
// 登录接口
export const login = (data) => {
    return axios({
        method: 'post',
        url: '/app/v1_0/authorizations',
        data
    })
}
// 请求验证码
export const code = (mobile) => {
    return axios({
        method: 'get',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}
// 获取用户个人信息
export const user = () => {
    return axios({
        method: 'get',
        url: `/app/v1_0/user`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
// 获取用户频道
export const getUserChannels = () => {
    return axios({
        method: 'get',
        url: '/app/v1_0/user/channels',

    })
}
// 获取用户频道
export const getArticels = (params) => {
    return axios({
        method: 'get',
        url: '/app/v1_1/articles',
        params
    })
}