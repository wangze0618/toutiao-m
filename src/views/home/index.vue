<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button to="/search" class="search-button" round size="small">
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
        <div class="gengduo" @click.stop="popupShow">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- popup! -->
    <van-popup
      round
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      v-model="isChannelEditShow"
      close-icon-position="top-left"
    >
      <ChannelEdit
        :myChannels="channels"
        @changeActive="changeActive"
        :active="active"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI } from "../../api/index";
import ArticleList from "./components/ArticleList.vue";
import ChannelEdit from "./components/Channel_edit.vue";
import { mapState } from "vuex";
import { getItem } from "../../utils/storage";
export default {
  name: "HomeIndex",
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      value: "",
      active: 0,
      channels: [],
      isChannelEditShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  beforeMount() {
    this.getUserChannel();
  },
  methods: {
    changeActive(index, isChannelEditShow = true) {
      // console.log("home", index);
      this.active = index;
      this.isChannelEditShow = isChannelEditShow;
    },
    popupShow() {
      this.isChannelEditShow = true;
    },

    async getUserChannel() {
      let channels = [];
      if (this.user) {
        const { data } = await getUserChannelsAPI();
        channels = data.data.channels;
      } else {
        // 未登录，判断是否有本地存储列表数据
        const localChannels = getItem("TOUTIAO_CHANNELS");
        if (localChannels) {
          // 如果有，直接使用
          channels = localChannels;
        } else {
          // 如果没有，请求数据
          const { data } = await getUserChannelsAPI();
          channels = data.data.channels;
        }
      }
      this.channels = channels;
    },
  },
};
</script>

<style lang='less' scoped>
.home-container {
  padding-bottom: 20px;
}
/deep/ .gengduo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  position: fixed;
  right: 0;
  opacity: 0.9;
  background: #fff;
  & i {
    font-size: 40px;
  }
  &:before {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    left: 0;
    background: url("../../assets/gradient-gray-line.png");
    background-size: contain;
  }
}
/deep/ .van-tabs__line {
  width: 34px;
  height: 6px;
  background-color: #3296fa;
  margin-bottom: -0.25rem;
}
/deep/ .van-tabs__nav--line {
  padding-bottom: 0;
}
/deep/ .van-tab--active {
  color: #333 !important;
}

.tabs {
  /deep/ .van-tabs__nav {
    position: fixed;
    height: 82px;
    margin-top: 92px;
    z-index: 2;
    left: 0;
    right: 0;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tab {
    // position: fixed;
    color: #777;
    font-size: 30px;
    min-width: 200px;
    border-right: 1px solid #edeff3;
  }
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.search-button {
  font-size: 28px;
  width: calc(555px);
  height: calc(64px);
  color: #fff;
  background-color: #5babfb;
  border-color: #5babfb;
}
.search-text {
  padding-left: 6px;
}
/deep/ .van-button__text {
  display: flex;
  align-items: center;
}
</style>