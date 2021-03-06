import {
  login,
  code,
  user,
  getUserChannels,
  getArticels,
  addFollow,
  unFollow,
  userInfo,
  updateUserName,
  updateUserSex,
  updateUserBirthDay,
  updateUserAvatar,
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
import {
  getComment,
  addCommentLike,
  cancelCommentLike,
  addComment,
} from "./comment";

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

// 获取文章评论
export const getCommentAPI = getComment;

// 对评论或评论回复点赞
export const addCommentLikeAPI = addCommentLike;

// 取消对评论或评论回复点赞
export const cancelCommentLikeAPI = cancelCommentLike;

// 发布文章评论或评论回复
export const addCommentAPI = addComment;

// 获取用户信息
export const userInfoAPI = userInfo;

// 修改用户个人姓名
export const updateUserNameAPI = updateUserName;

// 修改用户个人性别
export const updateUserSexAPI = updateUserSex;

// 修改用户个人生日
export const updateUserBirthDayAPI = updateUserBirthDay;

// 修改用户个人头像
export const updateUserAvatarAPI = updateUserAvatar;
