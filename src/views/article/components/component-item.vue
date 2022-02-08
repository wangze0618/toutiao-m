<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list>
      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          fit="cover"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              comment.pubdate | relativeTime
            }}</span>
            <van-button
              size="mini"
              type="default"
              @click="$emit('ReplyClick', comment)"
              >回复 {{ comment.reply_count }}</van-button
            >
          </p>
        </div>

        <!-- 点赞 -->
        <van-button
          @click="onCommentLike"
          class="like-btn"
          :class="{ liked: comment.is_liking }"
          :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
          >{{ comment.like_count || "赞" }}</van-button
        >
        <!-- /点赞 -->
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { addCommentLikeAPI, cancelCommentLikeAPI } from "../../../api";
export default {
  name: "CommentItem",
  props: ["comment"],
  data() {
    return {
      commentLoading: false,
    };
  },

  methods: {
    async onCommentLike() {
      this.commentLoading = true;
      try {
        if (this.comment.is_liking) {
          // 取消点赞
          await cancelCommentLikeAPI(this.comment.com_id);
          this.comment.like_count--;
        } else {
          // 点赞
          await addCommentLikeAPI(this.comment.com_id);
          this.comment.like_count++;
        }
      } catch (error) {
        console.log(error.response);
        this.$toast.fail("操作失败，请重试");
      }
      this.comment.is_liking = !this.comment.is_liking;
      this.commentLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.like-btn {
  border: none;
  border-radius: 20px;
}
.liked {
  color: #ffa500;
}
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>