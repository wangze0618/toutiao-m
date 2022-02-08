<template>
  <div class="update-date">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="dateConfirm"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
import { updateUserBirthDayAPI } from "../../../api/index";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.user.birthday),
    };
  },
  methods: {
    async dateConfirm(value) {
      try {
        await updateUserBirthDayAPI(dayjs(value).format("YYYY-MM-DD"));
        this.$emit("updateDate", dayjs(value).format("YYYY-MM-DD"));
      } catch (error) {
        this.$toast.fail("更改失败");
      }
    },
  },
};
</script>

<style></style>
