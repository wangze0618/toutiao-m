<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" class="page-nav-bar" title="登录">
      <template #left>
        <i class="toutiao toutiao-zuojiantou"></i>
        <span style="color: #fff" class="left-text">返回</span>
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        key=""
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            v-if="isShowCountDown"
            :time="time"
            @finish="isShowCountDown = false"
            format="ss s"
          />
          <van-button
            v-else
            class="yan-button"
            color="#ededed"
            native-type="button"
            size="small"
            round
            @click="sendMsg"
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
import { loginAPI, codeAPI } from "../../api/index";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      isShowCountDown: false,
      time: 6000,
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "不能为空",
          },
          {
            pattern:
              /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        code: [
          {
            required: true,
            message: "不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位验证码",
          },
        ],
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

      // 请求登录
      try {
        const res = await loginAPI(this.user);
        Toast.success("登录成功！");
        this.$store.commit("setUser", res.data.data);
        this.$router.push({ name: "my" });
      } catch (error) {
        if (error.response.status === 400) {
          Toast.fail("手机号或验证码错误！");
        } else {
          Toast.fail("登录失败！");
        }
      }
    },
    async sendMsg() {
      try {
        await this.$refs.loginForm.validate("mobile");
        this.isShowCountDown = true;
      } catch (error) {
        return;
      }
      try {
        await codeAPI(this.user.mobile);
        Toast.success("发送成功！");
        this.time = 6000;
      } catch (error) {
        if (error.response.status === 429) {
          Toast.fail("请一分钟后再试一次！");
          this.time = 60000;
        } else {
          Toast.fail("手机号不正确！");
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.toutiao-zuojiantou {
  color: #fff;
}
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