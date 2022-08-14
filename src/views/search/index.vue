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
    <search-history
      @updateSearchHistory="updateSearchHistory"
      :searchHistory="searchHistory"
      v-else
      @search="onSearch"
    ></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import { setItem, getItem } from "../../utils/storage";
export default {
  name: "SearchIndex",
  components: { SearchHistory, SearchResult, SearchSuggestion },
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistory: getItem("TOUTIAO_SEARCH_HISTORIES") || [],
    };
  },
  methods: {
    updateSearchHistory() {
      this.searchHistory = [];
    },
    search_main() {
      this.isResultShow = false;
    },
    onSearch(val) {
      this.searchText = val;
      const val_index = this.searchHistory.indexOf(val);
      if (val_index == -1) {
        this.searchHistory.unshift(val);
      } else {
        this.searchHistory.splice(val_index, 1);
      }
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
  watch: {
    searchHistory: {
      handler(val) {
        setItem("TOUTIAO_SEARCH_HISTORIES", val);
      },
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
}
</style>
