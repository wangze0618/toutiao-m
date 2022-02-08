<template>
  <div class="comment-list">
    <van-list
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <ComponentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @ReplyClick="$emit('ReplyClick', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getCommentAPI } from "../../../api/index";
import ComponentItem from "./component-item.vue";
export default {
  components: { ComponentItem },
  name: "commentList",
  created() {
    this.loading = true;
    this.onLoad();
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      error: false,
    };
  },
  props: {
    source: {
      type: [Object, Array, String, Number],
      required: true,
    },
    type: {
      type: String,
      default: "a",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求数据
        const { data } = await getCommentAPI({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: 10,
        });
        // 2. 添加数据到列表中
        this.list.push(...data.data.results);

        // 3. 将loading设置为false
        this.loading = false;

        // 4. 判断是否还有数据
        if (data.data.results.length) {
          // 有的话，就更新获取下一页数据的页码offset
          this.offset = data.data.last_id;
        } else {
          // 没有的话，就设定结束
          this.finished = true;
        }
        this.$emit("postSuccess", data.data);
        this.$emit("count", this.list.length);
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>