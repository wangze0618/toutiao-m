<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #default>
          <span>全部删除</span>
          <span>完成</span>
          <van-icon name="delete" />
        </template>
        <van-icon name="delete" />
      </van-cell>

      <van-cell title="1">
        <template #right-icon>
          <van-icon name="close" />
        </template>
      </van-cell>
      <van-cell title="1">
        <template #right-icon>
          <van-icon name="close" />
        </template>
      </van-cell>
      <van-cell title="1">
        <template #right-icon>
          <van-icon name="close" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
};
</script>

<style lang="less" scoped>
</style>