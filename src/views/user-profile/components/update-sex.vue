<template>
  <div class="update-sex">
    <van-picker
      title="标题"
      :default-index="user.gender"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('closePop')"
    ></van-picker>
  </div>
</template>

<script>
import { updateUserSexAPI } from "../../../api";
export default {
  name: "UpdateSex",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      sex: this.user.gender,
    };
  },
  methods: {
    async onConfirm(value, index) {
      try {
        this.sex = index;
        await updateUserSexAPI(this.sex);
        this.$emit("updateSex", this.sex);
      } catch (error) {
        this.$toast.fail("更改失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>