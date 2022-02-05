import {
  login,
  code,
  user,
  getUserChannels,
  getArticels,
  addFollow,
  unFollow,
} from "./user.js";
import { getAllChannels, addUserChannel, delUserChannel } from "./channel";
import { getSuggestion, getSearchResult } from "./search";
import {
  getArticle,
  collectArticle,
  unCollectArticle,
  likeArticle,
  unLikeArticle,
} from "./article";

// 登录注册API
export const loginAPI = login;

// 获取验证码
export const codeAPI = code;

// 获取用户个人信息
export const userAPI = user;

// 关注用户
export const addFollowAPI = addFollow;

// 取关用户
export const unFollowAPI = unFollow;

// 获取用户频道列表
export const getUserChannelsAPI = getUserChannels;

// 获取文章列表
export const getArticlesAPI = getArticels;

// 获取全部频道列表
export const getAllChannelsAPI = getAllChannels;

// 添加用户频道
export const addUserChannelAPI = addUserChannel;

// 删除用户频道
export const delUserChannelAPI = delUserChannel;

// 获取搜索建议
export const getSuggestionAPI = getSuggestion;

// 获取搜索建议
export const getSearchResultAPI = getSearchResult;

// 获取文章详情
export const getArticleByIdAPI = getArticle;

// 收藏文章
export const collectArticleAPI = collectArticle;

// 取消收藏文章
export const unCollectArticleAPI = unCollectArticle;

// 点赞文章
export const likeArticleAPI = likeArticle;

// 取消点赞文章
export const unLikeArticleAPI = unLikeArticle;
