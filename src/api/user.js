import axios from '../utils/request';
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