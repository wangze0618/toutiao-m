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

    <!-- 选择文件 -->
    <input
      type="file"
      @change="onChangeFile"
      hidden
      name="avatar"
      ref="avatar"
    />
    <!-- /选择文件 -->

    <!-- 个人信息 -->
    <van-cell
      class="touxiang"
      @click="$refs.avatar.click()"
      title="头像"
      is-link
    >
      <template #default>
        <van-image
          class="touxiang-image"
          round
          width="30px"
          height="30px"
          fit="cover"
          :src="user.photo"
        />
      </template>
    </van-cell>
    <van-cell
      title="昵称"
      @click="isUpdateNameShow = true"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isUpdateSexShow = true"
      :value="gender"
      is-link
    />
    <van-cell
      title="生日"
      @click="isUpdateDateShow = true"
      :value="user.birthday"
      is-link
    />
    <!-- /个人信息 -->

    <!-- 更新昵称 -->
    <van-popup
      position="bottom"
      style="height: 100%"
      v-model="isUpdateNameShow"
    >
      <update-name
        :user="user"
        @closePop="isUpdateNameShow = false"
        @updateName="updateName"
      ></update-name>
    </van-popup>
    <!-- /更新昵称 -->

    <!-- 更新性别 -->
    <van-popup position="bottom" style="height: 50%" v-model="isUpdateSexShow">
      <update-sex
        :user="user"
        @updateSex="updateSex"
        @closePop="isUpdateSexShow = false"
      ></update-sex>
    </van-popup>
    <!-- /更新性别 -->

    <!-- 更新生日 -->
    <van-popup position="bottom" style="height: 50%" v-model="isUpdateDateShow">
      <update-date @updateDate="updateDate" :user="user"></update-date>
    </van-popup>
    <!-- /更新生日 -->

    <!-- 更新头像 -->
    <van-popup
      position="bottom"
      style="height: 100%"
      v-model="isUpdateAvatarShow"
    >
      <update-avatar
        v-if="isUpdateAvatarShow"
        @cancel="isUpdateAvatarShow = false"
        @closePop="isUpdateAvatarShow = false"
        :blobDate="blobImg"
        @updateAva="updateAva"
      ></update-avatar>
    </van-popup>
    <!-- /更新头像 -->
  </div>
</template>

<script>
import { userInfoAPI } from "../../api";
import updateName from "../user-profile/components/update-name.vue";
import UpdateAvatar from "./components/update-avatar.vue";
import UpdateDate from "./components/update-date.vue";
import updateSex from "./components/update-sex.vue";

export default {
  components: { updateName, updateSex, UpdateDate, UpdateAvatar },
  name: "UserProfile",
  data() {
    return {
      user: {}, // 用户个人信息
      isUpdateNameShow: false,
      isUpdateSexShow: false,
      isUpdateDateShow: false,
      isUpdateAvatarShow: false,
      blobImg: null,
    };
  },
  methods: {
    updateAva(ava) {
      this.user.photo = ava;
    },

    // 监听input-file的change事件
    onChangeFile() {
      const file = this.$refs.avatar.files[0];
      const blobData = window.URL.createObjectURL(file);
      this.blobImg = blobData;
      this.isUpdateAvatarShow = true;
      // 当选择同一个文件后，弹层不出来，可以手动让value清空来解决
      this.$refs.avatar.value = "";
    },
    updateDate(date) {
      this.user.birthday = date;
      this.isUpdateDateShow = false;
    },
    updateSex(sex) {
      this.user.gender = sex;
      this.isUpdateSexShow = false;
    },
    updateName(name) {
      this.user.name = name;
      this.isUpdateNameShow = false;
    },

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
  computed: {
    gender: {
      get() {
        if (this.user.gender == 1) {
          return "女";
        } else {
          return "男";
        }
      },
    },
  },
};
</script>

<style lang="less">
.van-popup {
  background-color: #f5f7f9;
}
.touxiang {
  align-items: center;
  /deep/ .van-cell__value {
    display: grid;
    justify-items: end;
  }
}
</style>
