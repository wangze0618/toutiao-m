<template>
  <div class="update-avatar">
    <img :src="blobDate" alt="" ref="img" />
    <div class="avatar-text">
      <div class="cancel" @click="$emit('cancel')">取消</div>
      <div class="confirm" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserAvatarAPI } from "../../../api";
import { Loading, Toast } from "vant";
export default {
  name: "UpdateAvatar",
  props: {
    blobDate: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1, // 查看模式 限制裁剪框不超过画布的大小。
      aspectRatio: 1, // 缩放比例
      dragMode: "move", // 拖动模式 move->移动画布
      background: false, // 取消背景
      autoCropArea: 1, // 固定裁切框大小
      movable: true, // 画布可移动 默认
      cropBoxMovable: false, // 裁切框不可移动
      cropBoxResizable: false, // 裁切框不可缩放
    });
  },
  methods: {
    confirm() {
      this.$toast.loading({
        duration: 0,
        message: "保存中",
        forbidClick: true, // 禁止点击背景
      });

      // 将裁切好的数据以 Blob形式返回
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        try {
          // 接口要求是Content-Type 是 multipart/form-data, 必须传递FormData 对象
          let formData = new FormData();
          formData.append("photo", blob);
          // 直接传入formData对象
          await updateUserAvatarAPI(formData);
        } catch (error) {
          this.$toast.fail("请求失败");
          console.log(error);
        }
        this.$emit("closePop"); // 关闭弹出层
        this.$emit("updateAva", this.blobDate);
        this.$toast.success("更新成功");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.update-avatar {
  background-color: #000;
  height: 100vh;
  img {
    display: block;
    width: 100%;
  }
  .avatar-text {
    padding: 5px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      width: 45px;
      height: 40px;
      font-size: 20px;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>