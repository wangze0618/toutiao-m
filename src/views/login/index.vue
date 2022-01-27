<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号">
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>

      <van-field v-model="user.code" name="code" placeholder="请输入验证码">
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-button class="yan-button" color="#ededed" size="small" round
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div class="btn-login" style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from "../../api/index";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      Toast.loading({
        message: "登录中！",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await loginAPI(this.user);
        Toast.success("登录成功！");
        console.log(res);
      } catch (error) {
        if (error.response.status === 400) {
          Toast.fail("手机号或验证码错误！");
        } else {
          Toast.fail("登录失败！");
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.toutiao {
  font-size: 0.5rem;
}

.yan-button {
  .van-button__text {
    color: #666;
  }
}
/deep/ .van-field__left-icon {
  display: flex;
  align-items: center;
}
/deep/ .van-cell:nth-child(2) {
  .van-cell__value {
    .van-field__body {
      input {
        border-right: 1px solid #ededed;
      }
    }
  }
}
.btn-login {
  padding: 10px 0;
  .van-button--info {
    border-radius: 5px;
    border-color: #6db4fb;
    background-color: #6db4fb;
  }
}
</style>