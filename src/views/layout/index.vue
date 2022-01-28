<template>
  <div class="layui-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <van-tabbar router v-model="active">
      <van-tabbar-item replace to="/"
        >首页
        <template #icon> <i class="toutiao toutiao-shouye"></i> </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/qa"
        >问答
        <template #icon> <i class="toutiao toutiao-wenda"></i> </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/video"
        >视频
        <template #icon> <i class="toutiao toutiao-shipin"></i> </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/my"
        >我的
        <template #icon> <i class="toutiao toutiao-wode"></i> </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
 
<script>
export default {
  name: "LayoutIndex",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang='less' scoped>
.toutiao {
  font-size: 0.6rem;
}
</style>