<template>
  <div class="My-container">
    <div class="header not-login" v-if="this.$store.state.user.length == 0">
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
          <van-button type="default" to="/user/profile" round size="mini"
            >编辑资料</van-button
          >
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
      v-if="$store.state.user.length !== 0"
      title="退出登录"
    />
  </div>
</template>

<script>
// import { Toast } from "vant";
import { mapState } from "vuex";
import { userAPI } from "../../api/index.js";
export default {
  name: "MyIndex",
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    if (this.$store.state.user) {
      this.getInfo();
    }
  },
  methods: {
    async getInfo() {
      try {
        const res = await userAPI();
        this.userInfo = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
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
          this.$store.commit("setUser", "");
        })
        .catch(() => {
          return;
        });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.msg-cell {
  margin-top: 20px;
}
.logout-cell {
  text-align: center;
  margin-top: 10px;
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
  height: 140px;
}
.grid-icon {
  font-size: calc(45px);
}
.grid-text {
  margin-top: 4px;
  font-size: 28px;
}
.user-info {
  flex-direction: column;
  .base-info {
    .left {
      .img-left {
        height: calc(132px);
        width: calc(132px);
        border: 1px solid #ffffff36;
      }
      display: flex;
      align-items: center;
      .left-text {
        user-select: none;
        font-size: 30px;
        color: #fff;
        padding-left: 24px;
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
    height: 250px;
    width: 100%;
    // background-color: pink;
    padding: 152px 64px 46px;
  }
  .data-state {
    box-sizing: border-box;
    display: flex;
    height: 150px;
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
        font-size: 40px;
      }
      .text {
        font-size: 24px;
      }
    }
  }
}
.header {
  height: 400px;
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
      width: 120px;
      height: 120px;
    }
    .login-text {
      margin-top: 15px;
      font-size: 28px;
      color: #fff;
    }
  }
}
</style>
