<template>
  <van-icon
    @click="changeCollect"
    :loading="loading"
    :color="this.is_Collected ? '#ffa500' : ''"
    :name="this.is_Collected ? 'star' : 'star-o'"
  />
</template>

<script>
import { collectArticleAPI, unCollectArticleAPI } from "../../api/index";
export default {
  name: "collect-article",
  props: ["is_Collected", "article_id"],
  data() {
    return {
      collectState: this.is_Collected,
      loading: false,
    };
  },
  methods: {
    async changeCollect() {
      try {
        if (this.is_Collected) {
          this.loading = true;
          await unCollectArticleAPI(this.article_id);
          this.$toast.success("取消成功");
        } else {
          await collectArticleAPI(this.article_id);
          this.$toast.success("收藏成功");
        }
      } catch (error) {
        this.$toast.fail("操作失败，请重试");
      }
      this.loading = false;
      this.collectState = !this.collectState;
      this.$emit("updateCollect", this.collectState);
    },
  },
};
</script>

<style lang='less' scoped>
</style>