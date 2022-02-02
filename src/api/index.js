import { login, code, user, getUserChannels, getArticels } from './user.js';
import { getAllChannels } from './channel';
// 登录注册API
export const loginAPI = login

// 获取验证码
export const codeAPI = code

// 获取用户个人信息
export const userAPI = user

// 获取用户频道列表
export const getUserChannelsAPI = getUserChannels

// 获取文章列表
export const getArticlesAPI = getArticels

// 获取全部频道列表
export const getAllChannelsAPI = getAllChannels