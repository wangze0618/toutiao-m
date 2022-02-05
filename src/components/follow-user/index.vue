<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      :loading="followLoading"
      size="small"
      icon="plus"
      v-if="!this.currentFollowState"
      @click="onFollow"
      >关注</van-button
    >
    <van-button
      v-else
      @click="onFollow"
      :loading="followLoading"
      class="follow-btn"
      round
      size="small"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { addFollowAPI, unFollowAPI } from "../../api";
export default {
  props: ["authorId", "isFollowed"],
  data() {
    return {
      followLoading: false,
      currentFollowState: this.currentFollowState,
    };
  },
  methods: {
    async onFollow() {
      try {
        if (this.currentFollowState) {
          this.followLoading = true;
          await unFollowAPI(this.authorId);
          this.currentFollowState = false;
        } else {
          this.followLoading = true;
          const { data } = await addFollowAPI(this.authorId);
          if (data.data.target) {
            this.currentFollowState = true;
          }
        }
        this.$emit("updateFollowState", !this.currentFollowState);
      } catch (error) {
        if (error.response && error.response.status == 410) {
          this.$toast.fail("你不能关注你自己");
        } else {
          this.$toast.fail("操作失败，请重试");
        }
        console.log(error.response);
      }
      this.followLoading = false;
    },
  },
};
</script>

<style>
</style>