<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticlesAPI } from "../../../api";
export default {
  name: "ArticleList",
  props: ["channelsList", "id"],
  data() {
    return {
      channels: this.channelsList,
      index: this.id,
      list: [],
      loading: false,
      finished: false,
      time: 1556789000001,
      error: false,
    };
  },
  created() {
    // console.log(this.channels, 12312);
  },

  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        const { data } = await getArticlesAPI({
          channel_id: this.index,
          timestamp: this.time || Date.now(),
          with_top: 0,
        });
        // console.log(data);
        // 把请求数据放到list数组里
        const result = data.data.results;
        // console.log(result);
        this.list.push(...result);
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (result.length) {
          this.time = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        // console.log("请求失败！");
        console.log(this.list);
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>