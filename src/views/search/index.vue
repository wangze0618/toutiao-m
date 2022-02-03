<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        @focus="search_main"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
      >
      </van-search>
    </form>
    <!-- /搜索框 -->

    <!-- 搜索结果 -->
    <search-result :searchText="searchText" v-if="isResultShow"></search-result>
    <!-- /历史记录 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
export default {
  name: "SearchIndex",
  components: { SearchHistory, SearchResult, SearchSuggestion },
  data() {
    return {
      searchText: "",
      isResultShow: false,
    };
  },
  methods: {
    search_main() {
      this.isResultShow = false;
    },
    onSearch(val) {
      console.log(val);
      this.searchText = val;
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang='less'>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>