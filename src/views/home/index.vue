<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <template #title>
        <van-button class="search-button" round size="small">
          <template #default>
            <i class="toutiao toutiao-sousuo"></i>
            <span class="search-text">搜索</span>
          </template>
        </van-button>
      </template>
    </van-nav-bar>
    <van-tabs class="tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :channelsList="channels" :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="gengduo">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelsAPI } from "../../api/index";
import ArticleList from "./components/ArticleList.vue";

export default {
  name: "HomeIndex",
  components: { ArticleList },
  data() {
    return {
      value: "",
      active: 0,
      channels: [],
    };
  },
  created() {
    this.getUserChannel();
  },
  methods: {
    async getUserChannel() {
      const { data } = await getUserChannelsAPI();
      this.channels = data.data.channels;
      // console.log(this.channels);
    },
  },
};
</script>

<style lang='less' scoped>
.home-container {
  padding-bottom: 50px;
}
/deep/ .gengduo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 41px;
  position: fixed;
  right: 0;
  opacity: 0.9;
  background: #fff;
  & i {
    font-size: 20px;
  }
  &:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    left: 0;
    background: url("../../assets/gradient-gray-line.png");
    background-size: contain;
  }
}
/deep/ .van-tabs__line {
  width: 17px;
  height: 3px;
  background-color: #3296fa;
  margin-bottom: 2px;
}
/deep/ .van-tab--active {
  color: #333 !important;
}
.tabs {
  /deep/ .van-tabs__nav {
    height: 41px;
  }
  /deep/ .van-tab {
    color: #777;
    font-size: 15px;
    min-width: 100px;
    border-right: 1px solid #edeff3;
  }
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.search-button {
  font-size: 14px;
  width: calc(555px / 2);
  height: calc(64px / 2);
  color: #fff;
  background-color: #5babfb;
  border-color: #5babfb;
}
.search-text {
  padding-left: 3px;
}
/deep/ .van-button__text {
  display: flex;
  align-items: center;
}
</style>