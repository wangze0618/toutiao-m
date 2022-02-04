<template>
  <van-cell class="cell-nav" :to="`/article/${article.art_id}`">
    <template #title>
      <span class="cell-title van-multi-ellipsis--l2">{{
        articles.title
      }}</span>
    </template>
    <template #label>
      <div class="cell-images" v-if="articles.cover.type == 3">
        <div
          class="cell-images-nav"
          v-for="(img, index) in articles.cover.images"
          :key="index"
        >
          <van-image width="110" height="110" :src="img" fit="cover" />
        </div>
      </div>
      <div class="label-sapn">
        <span>{{ articles.is_top == 1 ? "置顶" : "" }}</span>
        <span>{{ articles.aut_name }}</span>
        <span>{{ articles.comm_count }}评论</span>
        <span>{{ articles.pubdate | relativeTime }}</span>
      </div>
    </template>
    <van-image
      class="right-cover"
      v-if="articles.cover.type == 1"
      :src="articles.cover.images[0]"
      fit="cover"
    />
  </van-cell>
</template>

<script>
export default {
  created() {
    // console.log(this.articles);
  },
  data() {
    return {
      articles: this.article,
    };
  },
  props: ["article"],

  name: "articleItem",
};
</script>

<style lang='less' scoped>
.van-cell__label {
  span + span {
    margin-right: 5px;
  }
}
.label-span {
  font-size: calc(22px / 2);
  color: #b4b4b4;
}
.right-cover {
  width: calc(232px / 2);
  height: calc(146px / 2);
}
.van-cell__value {
  flex: unset;
  width: calc(232px / 2);
  height: calc(146px / 2);
  padding-left: calc(25px / 2);
}
.cell-nav {
  /deep/ .cell-title {
    font-size: 16px;
    color: #3a3a3a;
  }
}
/deep/ .cell-images {
  display: flex;
  justify-content: center;
  .cell-images-nav {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}
</style>