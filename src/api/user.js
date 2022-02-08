import request from "../utils/request";
// import store from '../store/index'
// GET-> params | POST->data
// 登录接口
export const login = (data) => {
  return request({
    method: "post",
    url: "/app/v1_0/authorizations",
    data,
  });
};
// 请求验证码
export const code = (mobile) => {
  return request({
    method: "get",
    url: `/app/v1_0/sms/codes/${mobile}`,
  });
};
// 获取用户个人信息
export const user = () => {
  return request({
    method: "get",
    url: `/app/v1_0/user`,
  });
};
// 获取用户频道
export const getUserChannels = () => {
  return request({
    method: "get",
    url: "/app/v1_0/user/channels",
  });
};
// 获取用户频道
export const getArticels = (params) => {
  return request({
    method: "get",
    url: "/app/v1_1/articles",
    params,
  });
};

// 关注用户
export const addFollow = (target) => {
  return request({
    method: "post",
    url: "/app/v1_0/user/followings",
    data: {
      target,
    },
  });
};

// 取关用户
export const unFollow = (target) => {
  return request({
    method: "delete",
    url: `/app/v1_0/user/followings/${target}`,
  });
};

// 用户个人
export const userInfo = () => {
  return request({
    method: "get",
    url: `/app/v1_0/user/profile`,
  });
};

// 修改用户个人姓名
export const updateUserName = (name) => {
  return request({
    method: "patch",
    url: `/app/v1_0/user/profile`,
    data: { name },
  });
};

// 修改用户个人性别
export const updateUserSex = (gender) => {
  return request({
    method: "patch",
    url: `/app/v1_0/user/profile`,
    data: { gender },
  });
};

// 修改用户个人生日
export const updateUserBirthDay = (date) => {
  return request({
    method: "patch",
    url: `/app/v1_0/user/profile`,
    data: { date },
  });
};

// 修改用户个人头像
export const updateUserAvatar = (photo) => {
  return request({
    method: "patch",
    url: `/app/v1_0/user/photo`,
    data: { photo },
  });
};
