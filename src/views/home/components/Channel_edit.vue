<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="channel-my-text" :border="false">
      <template #title>
        <div class="cell-left">
          <span>我的频道</span>
        </div>
      </template>
      <template #default>
        <div class="cell-right">
          <van-button
            @click="isEdit = !isEdit"
            class="btn"
            type="danger"
            size="mini"
            plain
            round
            >{{ !isEdit ? "编辑" : "完成" }}</van-button
          >
        </div>
      </template>
    </van-cell>
    <van-grid class="grid channel-my-grid" :column-num="4" :gutter="10">
      <van-grid-item
        :class="active == index ? 'active' : ''"
        class="grid-item"
        v-for="(value, index) in ChannelList"
        :key="index"
        @click="myPage(value, index)"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
        <template #icon>
          <van-icon
            v-show="isEdit && !fixedChannel.includes(value.id)"
            name="close"
          /> </template
      ></van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell class="channel-recom-text" :border="false">
      <template #title>
        <div class="cell-left">
          <span>频道推荐</span>
        </div>
      </template>
    </van-cell>
    <van-grid class="grid channel-recom-grid" :column-num="4" :gutter="10">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="value in recomChannels"
        :key="value.id"
        :text="value.name"
        @click="addChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  addUserChannelAPI,
  getAllChannelsAPI,
  delUserChannelAPI,
} from "../../../api/index";
import { setItem } from "../../../utils/storage.js";
export default {
  data() {
    return {
      fixedChannel: [0],
      isEdit: false,
      AllChannels: [],
      ChannelList: this.myChannels,
    };
  },
  created() {
    this.getAllChannels();
  },
  methods: {
    // 删除
    myPage(value, index) {
      if (this.isEdit == false) {
        // 非编辑状态 ，切换页面
        this.$emit("changeActive", index, false);
      } else {
        // 编辑状态
        if (this.fixedChannel.includes(value.id)) {
          return;
        }
        if (index <= this.active) {
          this.active = this.active - 1;
        }

        this.$emit("changeActive", this.active);
        this.ChannelList.splice(index, 1);
        this.delChannel(value.id);
      }
    },
    async delChannel(id) {
      try {
        if (this.user) {
          // 已登录状态
          await delUserChannelAPI(id);
        } else {
          // 未登录状态
          setItem("TOUTIAO_CHANNELS", this.myChannels);
        }
      } catch (error) {
        this.$toast.fail("操作失败");
      }
    },
    async addChannel(value) {
      this.ChannelList.push(value);

      // 数据持久化
      if (this.user) {
        // 已登录
        try {
          await addUserChannelAPI({
            id: value.id,
            seq: this.myChannels.length,
          });
        } catch (error) {
          this.$toast.fail("保存失败");
        }
      } else {
        // 未登录
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    async getAllChannels() {
      try {
        const { data } = await getAllChannelsAPI();
        this.AllChannels = data.data.channels;
      } catch (error) {
        console.log(error);
        this.$toast("获取失败");
      }
    },
  },
  computed: {
    ...mapState(["user"]),
    recomChannels() {
      return this.AllChannels.filter((f) => {
        return !this.ChannelList.find((e) => {
          return f.id == e.id;
        });
      });

      //   const channels = [];
      //   this.AllChannels.forEach((ele) => {
      //     const ret = this.ChannelList.find((myChannel) => {
      //       return myChannel.id === ele.id;
      //     });
      //     if (!ret) {
      //       channels.push(ele);
      //     }
      //   });
      //   return channels;
    },
  },
  name: "ChannelEdit",
  props: {
    active: {
      type: Number,
    },
    myChannels: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #f85959;
}
* {
  user-select: none;
}
.cell-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.text {
  margin-top: 0;
  white-space: nowrap;
  font-size: 28px;
}
.channel-my-grid {
  .grid-item {
    /deep/ .van-grid-item__content {
      background: #f4f5f6;
      position: relative;
      span {
        margin-top: 0;
      }
      i {
        position: absolute;
        top: -0.5rem;
        right: -1.313rem;
        font-size: 36px;
        z-index: 2;
        color: #333;
      }
    }
  }
}
.grid-item {
  width: 160px;
  height: 76px;
  border-radius: 10px !important;
}
.cell-left {
  font-size: 32px;
  color: #333;
}
.channel-recom-grid {
  /deep/ .van-grid-item__content {
    white-space: nowrap;
    flex-direction: row;
    background-color: #f4f5f6;
    i {
      font-size: 0.39rem;
    }
    span {
      margin-top: 0;
      margin-left: 6px;
      color: #222;
    }
  }
  .grid {
    span {
      margin-top: 0;
      color: #222;
    }
  }
}
/deep/ .cell-right {
  .btn {
    width: calc(104px);
    height: calc(48px);
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
}
.channel-edit {
  padding: 85px 0;
}
</style>
