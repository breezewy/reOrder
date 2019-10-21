<template>
  <div class="bookingContainer">
    <div class="main" v-if="hideCalendar">
      <div class="edit">
        <van-cell-group>
          <van-cell title="票型" :value="ticketName" />
          <van-field
            v-model="date"
            clearable
            label="预约日期"
            right-icon="arrow-down"
            placeholder="请选择预约日期"
            @click-right-icon="selectDate"
          />
          <van-field
            v-model="times"
            clearable
            label="预约场次"
            right-icon="arrow-down"
            placeholder="请选择预约场次"
            @click-right-icon="selectShow"
            v-if="item.containShow"
          ></van-field>
          <van-cell title="预约数量">
            <van-stepper v-model="number" :max="item.number" />
          </van-cell>
        </van-cell-group>
      </div>
      <div class="info">
        <van-cell-group>
          <van-cell title="联系人" :value="userInfo.name" />
          <van-cell title="联系电话" :value="userInfo.mobile" />
          <van-cell title="证件号" :value="userInfo.idCard" />
        </van-cell-group>
      </div>

      <div class="subbmit" @click="handleClick">
        <span>点击预约</span>
      </div>
    </div>
    <div class="calendar" v-else>
      <DatePicker
        v-model="calendarDate"
        is-inline
        is-expanded
        :rows="3"
        :available-dates="calendarList"
        @input="getDate"
      />
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <p>选择场次</p>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            :title="item.time"
            clickable
            @click="clickRadio(item)"
            v-for="(item,index) in showList"
            :key="index"
          >
            <van-radio slot="right-icon" :name="item.time" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Field } from "vant";
import { Cell, CellGroup } from "vant";
import { RadioGroup, Radio } from "vant";
import { Stepper } from "vant";
import { Divider } from "vant";
import { Popup } from "vant";

import {
  getCalendar,
  getShow,
  getUserOrderInfo,
  downOrder
} from "../utils/api";
import { FormatDate } from "../utils/Format";

import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";

Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Popup);
Vue.use(Divider);
Vue.use(Cell).use(CellGroup);
Vue.use(Field);
Vue.use(Stepper);

export default {
  data() {
    return {
      date: "",
      times: "",
      number: 1,
      ticketName: "",
      id: "",
      calendarList: [],
      hideCalendar: true,
      calendarDate: null,
      show: false,
      radio: "",
      userInfo: {},
      showList: [],
      item: null,
      formats: {
        title: "MMMM YYYY",
        weekdays: "W",
        navMonths: "MMM",
        input: ["L", "YYYY-MM-DD", "YYYY/MM/DD"], // Only for `v-date-picker`
        dayPopover: "L" // Only for `v-date-picker`
      }
    };
  },
  components: {
    Calendar,
    DatePicker
  },
  created() {
    this.item = JSON.parse(sessionStorage.getItem("item"));
    console.log(this.item.containShow);
    this.id = sessionStorage.getItem("orderId");
    this.ticketName = this.item.name;
    this.getCalendarList(this.item.id);
    this.getUserInfo(this.id);
  },
  methods: {
    selectDate() {
      this.calendarDate = null;
      this.hideCalendar = false;
    },
    getCalendarList(id) {
      getCalendar(id).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
        }
        this.calendarList = res.data.data;
      });
    },
    getDate(obj) {
      this.date = FormatDate(obj);
      this.hideCalendar = true;
    },
    selectShow() {
      if (this.date === "") {
        this.$toast.fail("请先选择预约日期");
        return;
      }
      this.show = true;
      let data = {
        date: this.date,
        id: this.item.id
      };
      getShow(data).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
        }
        this.showList = res.data.data;
      });
    },
    getUserInfo(id) {
      getUserOrderInfo(id).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
        }
        this.userInfo = res.data.data;
      });
    },
    clickRadio(item) {
      this.radio = item.time;
      this.times = this.radio;
      this.show = false;
    },
    handleClick() {
      let orderData = {};
      if (this.item.containShow) {
        if (this.date === "") {
          this.$toast.fail("请先选择预约日期");
          return;
        } else if (this.times === "") {
          this.$toast.fail("请先选择预约场次");
          return;
        }
        orderData = {
          number: this.number,
          orderId: this.id,
          playDate: this.date,
          showTime: this.times,
          ticketId: this.item.id
        };
      } else {
        if (this.date === "") {
          this.$toast.fail("请先选择预约日期");
          return;
        }
        orderData = {
          number: this.number,
          orderId: this.id,
          playDate: this.date,
          ticketId: this.item.id
        };
      }

      downOrder(orderData).then(res => {
        if (res.data.code != 200) {
          return this.$toast(res.data.error);
        }
        this.$toast.success("预约成功");
        this.$router.push("/booked");
      });
    }
  }
};
</script>


<style lang="scss">
.main {
  background: #f0eff5;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem 0.5rem 0;
  .edit {
    background: #fff;
    .van-cell {
      .van-cell__title {
        text-align: left;
        flex: 0.55;
      }
      .van-cell__value {
        flex: 1.45;
        text-align: left;
      }
    }
  }
  .info {
    margin-top: 0.5rem;
    .van-cell {
      .van-cell__title {
        text-align: left;
        flex: 0.55;
      }
      .van-cell__value {
        text-align: left;
        flex: 1.45;
      }
    }
  }
  .subbmit {
    margin-top: 1.5rem;
    span {
      display: block;
      width: 60%;
      margin: 0 auto;
      border-radius: 0.5rem;
      padding: 0.5rem 0;
      color: #fff;
      background: -webkit-linear-gradient(to right, #fdc830, #f37335);
      background: -o-linear-gradient(to right, #fdc830, #f37335);
      background: -moz-linear-gradient(to right, #fdc830, #f37335);
      background: linear-gradient(to right, #fdc830, #f37335);
    }
  }
}
.van-popup {
  p {
    line-height: 1rem;
    padding: 0.4rem 0.7rem;
  }
  .van-cell__title {
    text-align: left;
  }
}
</style>