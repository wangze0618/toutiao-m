import request from "../utils/request";

// 评论请求
export const getComment = (params) => {
  return request({
    method: "get",
    url: "/app/v1_0/comments",
    params,
  });
};

// 对评论或评论回复点赞
export const addCommentLike = (target) => {
  return request({
    method: "post",
    url: "/app/v1_0/comment/likings",
    data: { target },
  });
};

// 取消对评论或评论回复点赞
export const cancelCommentLike = (target) => {
  return request({
    method: "delete",
    url: `/app/v1_0/comment/likings/${target}`,
  });
};

// 发布文章评论或评论回复
export const addComment = (data) => {
  return request({
    method: "post",
    url: "/app/v1_0/comments",
    data,
  });
};
