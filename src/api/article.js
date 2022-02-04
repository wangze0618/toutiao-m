import request from '../utils/request';

// 获取文章详情
export const getArticle = (article_id) => {
    return request({
        method: 'get',
        url: `/app/v1_0/articles/${article_id}`,
    })
}