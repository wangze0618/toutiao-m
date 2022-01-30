<template>
  <div class="My-container">
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="linkTo">
        <img class="login-img" src="~@/assets/mobile.png" alt="" />
        <span class="login-text">登录 / 注册</span>
      </div>
    </div>

    <!-- 已登录状态 -->
    <div v-else class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image fit="cover" class="img-left" round :src="userInfo.photo" />
          <span class="left-text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-state">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <van-grid class="grid-nav" clickable :column-num="2">
      <van-grid-item icon="photo-o" text="文字">
        <template #default>
          <i class="toutiao toutiao-shoucang grid-icon"></i>
          <span class="grid-text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template #default>
          <i class="toutiao toutiao-lishi grid-icon"></i>
          <span class="grid-text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知、小智同学、退出登录 -->
    <van-cell class="msg-cell" title="消息通知" is-link />
    <van-cell class="xiaozhi-cell" title="小智同学" is-link />
    <van-cell
      class="logout-cell"
      @click="logout"
      v-if="$store.state.user"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { removeItem } from "../../utils/storage";
import { userAPI } from "../../api/index.js";
export default {
  name: "MyIndex",
  data() {
    return {
      userInfo: {},
    };
  },
  async created() {
    if (this.user) {
      // console.log(this.user);
      // this.getUserInfo();
      try {
        const res = await userAPI();
        console.log(res);
        this.userInfo = res.data.data;
      } catch (error) {
        this.$toast.fail("获取数据失败，请稍后再试！");
      }
    }
  },
  methods: {
    linkTo() {
      this.$router.push({
        path: "/login",
      });
    },
    logout() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "确定要退出登录吗？",
        })
        .then(() => {
          // on confirm
          this.$store.state.user = null; // 清除Vuex
          removeItem("TOUTIAO_USER"); // 清除本地存储
          // this.$store.commit("setUser", "");
        })
        .catch(() => {
          return;
          // on cancel
        });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang='less' scoped>
.msg-cell {
  margin-top: 10px;
}
.logout-cell {
  text-align: center;
  margin-top: 5px;
  color: #eb5253;
}
.grid-nav {
  user-select: none;
  div:nth-child(1) > div > i {
    color: #eb5253;
  }
  div:nth-child(2) > div > i {
    color: #ff9d1d;
  }
}
.grid-nav {
  height: 70px;
}
.grid-icon {
  font-size: calc(45px / 2);
}
.grid-text {
  margin-top: 2px;
  font-size: 14px;
}
.user-info {
  flex-direction: column;
  .base-info {
    .left {
      .img-left {
        height: calc(132px / 2);
        width: calc(132px / 2);
        border: 1px solid #ffffff36;
      }
      display: flex;
      align-items: center;
      .left-text {
        user-select: none;
        font-size: 15px;
        color: #fff;
        padding-left: 12px;
      }
      display: flex;
    }
    .right {
      margin-left: auto;
      display: flex;
      justify-content: flex-end;
    }
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 125px;
    width: 100%;
    // background-color: pink;
    padding: 76px 32px 23px;
  }
  .data-state {
    box-sizing: border-box;
    display: flex;
    height: 75px;
    width: 100%;
    // background-color: blue;
    .data-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      user-select: none;
      color: #fff;
      .count {
        font-size: 24px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
}
.header {
  height: 200px;
  background: url("~@/assets/banner.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .login-img {
      width: calc(132px / 2);
      height: calc(132px / 2);
    }
    .login-text {
      margin-top: 7.5px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>