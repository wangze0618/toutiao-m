import { login, code, user, getUserChannels, getArticels } from './user.js';
import { getAllChannels, addUserChannel, delUserChannel } from './channel';
import { getSuggestion, getSearchResult } from './search';
import { getArticle } from './article';

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

// 添加用户频道
export const addUserChannelAPI = addUserChannel

// 删除用户频道
export const delUserChannelAPI = delUserChannel

// 获取搜索建议
export const getSuggestionAPI = getSuggestion

// 获取搜索建议
export const getSearchResultAPI = getSearchResult

// 获取文章详情
export const getArticleByIdAPI = getArticle
