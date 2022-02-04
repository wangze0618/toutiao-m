import request from '../utils/request';

// 获取全部频道列表
export const getAllChannels = () => {
    return request({
        method: 'get',
        url: '/app/v1_0/channels',
    })
}
// 添加用户频道
export const addUserChannel = (channel) => {
    return request({
        method: 'patch',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}
// 添加用户频道
export const delUserChannel = (target) => {
    return request({
        method: 'delete',
        url: `/app/v1_0/user/channels/${target}`,
    })
}
