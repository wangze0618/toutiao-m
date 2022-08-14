<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      @click-left="$router.back()"
      left-arrow
      title="文章详情"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <follow-user
            :authorId="article.aut_id"
            :isFollowed="article.is_followed"
            @updateFollowState="article.is_followed = $event"
          >
          </follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          ref="articleContent"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <comment-list
          @commentCount="commentCount = $event.total_count"
          @getCommentList="getCommentList"
          @ReplyClick="onReplyClick"
          :source="article.art_id"
          :list="this.commentList"
          @count="commentCount = $event"
        ></comment-list>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div v-else-if="errState == 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleById()"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        @click="isPostShow = true"
        class="comment-btn"
        type="default"
        round
        size="small"
        >写评论</van-button
      >
      <van-popup v-model="isPostShow" position="bottom">
        <comment-post @postSuccess="postSuccess" :target="article.art_id">
        </comment-post>
      </van-popup>
      <van-icon name="comment-o" :badge="commentCount" color="#777" />
      <collect-article
        :article_id="article.art_id"
        :is_Collected="article.is_collected"
        @updateCollect="updateCollect"
      ></collect-article>
      <like-article
        @updateLike="updateLike"
        :likeAttitude="article.attitude"
        :art_id="article.art_id"
      ></like-article>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 90%">
      <comment-reply
        v-if="isReplyShow"
        @closePop="isReplyShow = false"
        :comment="currentCommentList"
      ></comment-reply>
    </van-popup>
    <!--/评论回复 -->
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { getArticleByIdAPI } from "../../api/index";
import followUser from "../../components/follow-user/index.vue";
import collectArticle from "../../components/collect-article/index.vue";
import likeArticle from "../../components/like-article/index.vue";
import CommentPost from "./components/comment-post.vue";
import commentList from "./components/comment-list.vue";
import CommentReply from "./components/comment-reply.vue";

export default {
  name: "ArticleIndex",
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    CommentPost,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      loading: true,
      errState: 0,
      commentCount: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      currentCommentList: [],
    };
  },
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById();
  },
  mounted() {},
  methods: {
    onReplyClick(comment) {
      this.currentCommentList = comment;
      this.isReplyShow = true;
    },
    getCommentList(val) {
      this.commentList = val;
      this.commentCount = this.commentList.length;
    },
    postSuccess(val) {
      this.isPostShow = false;
      this.commentList.unshift(val.new_obj);
    },
    updateCollect(val) {
      this.article.is_collected = val;
    },
    updateLike(val) {
      this.article.attitude = val;
    },
    async getArticleById() {
      this.loading = true;
      try {
        const { data } = await getArticleByIdAPI(this.articleId);
        this.article = data.data;
      } catch (error) {
        if (error.response && error.response.status == 404) {
          this.errState = 404;
        }
        console.log(error.response);
      }
      this.loading = false;
      this.$nextTick(() => {
        this.getArticleContent();
      });
    },
    getArticleContent() {
      const content = this.$refs.articleContent;
      const imgList = content.querySelectorAll("img");
      const imgSrc = [];

      imgList.forEach((e, i) => {
        imgSrc.push(e.src);
        e.onclick = () => {
          ImagePreview({
            images: imgSrc,
            onClose() {
              console.log("close");
            },
            startPosition: i,
          });
        };
      });
    },
  },
};
</script>

<style scoped lang="less">
// @import "../../style/markdown.css";
/deep/ li {
  font-size: 30px;
}
/deep/ img {
  width: 100% !important;
}
/deep/ p {
  font-size: 24px;
}
/deep/ pre {
  border-radius: 10px;
  padding: 20px;
  display: inline-block;
  width: auto;
  background-color: #e5e5e5;
}
/deep/ h3 {
  font-size: 28px;
  font-weight: 600;
}
/deep/ code {
  overflow-x: scroll;
  width: 100%;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  font-size: 24px;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: calc(92px);
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: calc(17px);
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 32px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: calc(170px);
        height: calc(58px);
      }
    }

    .article-content {
      padding: calc(55px) calc(32px);
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: calc(122px);
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: calc(33px) 0 calc(46px);
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: calc(282px);
      height: 46px;
      border: 1px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 20px;
        background-color: #e22829;
      }
    }
  }
}
</style>
