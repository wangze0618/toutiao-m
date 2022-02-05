<template>
  <van-icon
    @click="onLike"
    :loading="loading"
    :color="this.likeAttitude === 1 ? '#ffa500' : ''"
    :name="this.likeAttitude === 1 ? 'good-job' : 'good-job-o'"
  />
</template>

<script>
import { likeArticleAPI, unLikeArticleAPI } from "../../api";
export default {
  name: "like-article",
  props: ["likeAttitude", "art_id"],
  data() {
    return {
      loading: false,
      likeState: Number,
    };
  },
  methods: {
    async onLike() {
      this.loading = true;
      try {
        if (this.likeAttitude === 1) {
          // 取消点赞
          await unLikeArticleAPI(this.art_id);
          this.likeState = -1;
        } else if (this.likeAttitude === -1) {
          // 点赞
          await likeArticleAPI(this.art_id);
          this.likeState = 1;
        }
      } catch (error) {
        this.$toast.fail("操作失败，请重试");
      }
      this.$toast.success(this.likeState === 1 ? "点赞成功" : "取消点赞");
      this.loading = false;
      this.$emit("updateLike", this.likeState);
    },
  },
};
</script>

<style>
</style>