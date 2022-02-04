<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      error-text="加载失败，请点击重试"
      :error.sync="error"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from "../../../api/index";
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResultAPI({
          page: this.page,
          per_page: 20,
          q: this.searchText,
        });

        //2.将数据添加到数组中
        const { results } = data.data;
        this.list.push(...results);

        // 3.将本次的loading设置为关闭
        this.loading = false;

        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++;
        } else {
          // 如果没有，则将加载状态finished 设置成true
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>