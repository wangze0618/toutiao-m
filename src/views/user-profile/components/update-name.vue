<template>
  <div class="update-name">
    <van-nav-bar
      class="nav-bar"
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('closePop')"
      @click-right="updateName"
    ></van-nav-bar>
    <div class="field-wrap">
      <van-field
        class="field"
        v-model="localNewName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserNameAPI } from "../../../api";
export default {
  name: "UpdateName",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localNewName: this.user.name,
    };
  },
  methods: {
    async updateName() {
      this.$toast({
        duration: 0,
        message: "保存中",
        forbidClick: true,
      });
      try {
        if (this.localNewName.trim().length) {
          await updateUserNameAPI(this.localNewName.trim());
          this.$emit("updateName", this.localNewName);
          this.$toast.success("更改成功");
        } else {
          this.$toast.fail("昵称不能为空");
          return;
        }
      } catch (error) {
        this.$toast.fail("更改失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 8px;
  .field {
    border-radius: 10px;
  }
}
.update-name {
  .nav-bar {
    /deep/ .van-nav-bar__title {
      color: #000;
    }
    /deep/ .van-nav-bar__text {
      color: #1989fa;
    }
  }
}
</style>
