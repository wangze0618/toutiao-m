import request from "../utils/request";

// 获取文章详情
export const getArticle = (article_id) => {
  return request({
    method: "get",
    url: `/app/v1_0/articles/${article_id}`,
  });
};

// 收藏文章
export const collectArticle = (target) => {
  return request({
    method: "post",
    url: `/app/v1_0/article/collections`,
    data: {
      target,
    },
  });
};

// 取消收藏文章
export const unCollectArticle = (target) => {
  return request({
    method: "delete",
    url: `/app/v1_0/article/collections/${target}`,
  });
};

// 点赞文章
export const likeArticle = (target) => {
  return request({
    method: "post",
    url: `/app/v1_0/article/likings`,
    data: {
      target,
    },
  });
};

// 取消点赞文章
export const unLikeArticle = (target) => {
  return request({
    method: "delete",
    url: `/app/v1_0/article/likings/${target}`,
  });
};
