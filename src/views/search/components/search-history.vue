<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #default>
          <div v-show="isDeleteShow">
            <span @click="$emit('updateSearchHistory')">全部删除</span>
            &nbsp;
            <span @click="isDeleteShow = false">完成</span>
          </div>
          <van-icon
            v-show="!isDeleteShow"
            @click="isDeleteShow = true"
            name="delete"
          />
        </template>
      </van-cell>

      <van-cell
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="deleteItem(index, item)"
        :title="item"
      >
        <template #right-icon>
          <van-icon v-show="isDeleteShow" name="close" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: ["searchHistory"],
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    deleteItem(index, item) {
      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1);
      } else {
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-cell {
  align-items: center;
}
/deep/ .van-cell-group {
  align-items: center;
}
</style>