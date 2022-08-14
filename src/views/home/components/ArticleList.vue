<template>
  <div class="article-container">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articleItem
          v-for="(article, index) in list"
          :article="article"
          :key="index"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from "../../../api";
import articleItem from "../../../components/article-item/index.vue";
export default {
  name: "ArticleList",
  props: ["channelsList", "id"],
  components: { articleItem },
  data() {
    return {
      channels: this.channelsList,
      index: this.id,
      list: [],
      loading: false,
      finished: false,
      time: 1556789000001,
      error: false,
      isLoading: false,
      successText: "",
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
          with_top: 1,
        });
        // 把请求数据放到list数组里
        const result = data.data.results;
        this.list.push(...result);
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (result.length) {
          // 获取下一页的时间戳
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
    async onRefresh() {
      try {
        // 异步更新数据
        const { data } = await getArticlesAPI({
          channel_id: this.index,
          timestamp: this.time,
          with_top: 1,
        });
        // 把请求数据放到list数组里
        const { results } = data.data;
        this.list.unshift(...results);
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (results.length) {
          // 获取下一页的时间戳
          this.time = data.data.pre_timestamp;
          this.isLoading = false;
          this.successText = `刷新成功，更新了${results.length}条数据`;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        this.isLoading = false;
        this.successText = `刷新失败`;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-container {
  height: 79vh;
  overflow-y: auto;
  padding-top: 90px;
  &::-webkit-scrollbar{
  width:0 !important}
}
</style>