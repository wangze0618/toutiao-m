<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      :disabled="!message.trim().length"
      class="post-btn"
      @click="onPost"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentAPI } from "../../../api/index";
export default {
  name: "CommentPost",
  components: {},
  props: ["target"],
  data() {
    return {
      message: "",
    };
  },
  inject: ["articleId"],
  methods: {
    async onPost() {
      try {
        const { data } = await addCommentAPI({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null,
        });
        this.message = "";
        this.$emit("postSuccess", data.data);
        this.$toast.success("发布成功");
      } catch (error) {
        this.$toast.fail("发布失败，请重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
