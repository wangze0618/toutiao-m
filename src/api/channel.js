import axios from '../utils/request';

// 获取全部频道列表
export const getAllChannels = () => {
    return axios({
        method: 'get',
        url: '/app/v1_0/channels',
    })
}