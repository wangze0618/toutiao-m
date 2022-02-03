<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell
        v-for="(item, index) in suggestion"
        :key="index"
        icon="search"
        @click="$emit('search', item)"
      >
        <template #title>
          <div v-html="highlightText(item)"></div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestionAPI } from "../../../api/index";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestion: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.getSuggestion(value);
      }, 200),
    },
  },
  methods: {
    highlightText(text) {
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(
        reg,
        `<span style="color:#3296fa">${this.searchText}</span>`
      );
      //   console.log(text);
    },
    async getSuggestion(value) {
      try {
        const { data } = await getSuggestionAPI(value);
        this.suggestion = data.data.options;
        console.log(this.suggestion);
      } catch (error) {
        this.$toast.fail("获取失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>