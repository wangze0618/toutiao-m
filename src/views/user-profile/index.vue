<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="nav-bar"
      @click-left="$router.back()"
      title="个人信息"
      left-text="返回"
      left-arrow
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell class="touxiang" title="头像" is-link>
      <template #default>
        <van-image
          class="touxiang-image"
          round
          width="30px"
          height="30px"
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </template>
    </van-cell>
    <van-cell title="昵称" value="内容" is-link />
    <van-cell title="性别" value="内容" is-link />
    <van-cell title="生日" value="内容" is-link />
    <!-- /个人信息 -->
  </div>
</template>

<script>
import { userInfoAPI } from "../../api";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {}, // 用户个人信息
    };
  },
  methods: {
    // 获取个人信息
    async getUserInfo() {
      try {
        const { data } = await userInfoAPI();
        this.user = data.data;
      } catch (error) {
        this.$toast.fail("获取信息失败");
      }
    },
  },
  created() {
    // 获取个人信息
    this.getUserInfo();
  },
};
</script>

<style lang='less' scoped>
.touxiang {
  align-items: center;
  /deep/ .van-cell__value {
    display: grid;
    justify-items: end;
  }
}
/deep/ .van-nav-bar__left {
  i,
  span {
    color: #fff;
  }
}
/deep/ .van-ellipsis {
  color: #fff;
}
.nav-bar {
  background-color: #3a9cff;
}
</style>