<template>
  <div class="reply-navbar">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <template #left>
        <van-icon @click="$emit('closePop')" name="cross" color="blue" />
      </template>
    </van-nav-bar>
    <div class="scroll-wrap">
      <component-item :comment="this.comment"></component-item>
      <van-cell title="全部回复" />

      <comment-list :source="comment.com_id" type="c"></comment-list>
    </div>
    <div class="post-wrap">
      <van-button size="small" @click="isPostShow = true" round type="default"
        >写评论</van-button
      >
    </div>

    <!-- 发布评论 -->
    <van-popup position="bottom" v-model="isPostShow">
      <comment-post
        @postSuccess="postSuccess"
        :target="comment.com_id"
        :list="this.commentList"
      ></comment-post>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import componentItem from "./component-item.vue";
import commentList from "./comment-list.vue";
import commentPost from "./comment-post.vue";

export default {
  components: { componentItem, commentList, commentPost },
  name: "CommentReply",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  methods: {
    postSuccess(data) {
      this.comment.reply_count++;
      this.isPostShow = false;
      this.commentList.unshift(data.new_obj);
    },
  },
};
</script>

<style lang='less' scoped>
.scroll-wrap {
  position: fixed;
  right: 0;
  top: 220px;
  left: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: red;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ebedf0;
  button {
    width: 60%;
  }
}
</style>