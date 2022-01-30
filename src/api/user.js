import axios from '../utils/request';
import store from '../store/index'
export const login = (data) => {
    return axios({
        method: 'post',
        url: '/app/v1_0/authorizations',
        data
    })
}
export const code = (mobile) => {
    return axios({
        method: 'get',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}
export const user = () => {
    return axios({
        method: 'get',
        url: `/app/v1_0/user`,
        headers: {
            Authorization: `Bearer ${store.state.user.token}`
        }
    })
}
