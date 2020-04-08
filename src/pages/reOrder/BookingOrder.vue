<template>
  <div class="bookingContainer">
    <div class="main" v-if="hideCalendar">
      <div class="edit">
        <van-cell-group>
          <van-cell  :value="ticketName" />
          <van-field
            v-model="date"
            clearable
            label="预约日期"
            right-icon="arrow-down"
            :placeholder="defaultDateText"
            disabled
            @click="selectDate"
            @click-right-icon="selectDate"
          />
          <van-field
            v-model="times"
            clearable
            disabled
            label="预约场次"
            right-icon="arrow-down"
            :placeholder="defaultShowText"
            @click="selectShow"
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
          <van-field label="联系人" :readonly="userInfo.updateLinkInfo" v-model="userInfo.name" placeholder="请输入联系人" />
          <van-field label="手机号" type="tel" :readonly="userInfo.updateLinkInfo" v-model="userInfo.mobile" placeholder="请输入手机号" />
          <van-field label="证件类型" :readonly="userInfo.updateLinkInfo"  v-model="getCertificateType"  right-icon="arrow-down" @click="handleClickRightIcon"/>
          <van-field label="证件号" :readonly="userInfo.updateLinkInfo" v-model="userInfo.idCard" placeholder="请输入证件号" />
          <van-action-sheet
            v-model="showActionSheet"
            :actions="actions"
            cancel-text="取消"
            @select="onSelect"
          />
        </van-cell-group>
      </div>

      <div class="subbmit" @click="handleClick">
        <span>预约</span>
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
      <van-radio-group v-model="radio" v-if="showList.length>0">
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
    <van-dialog
        v-model="showConfirm"
        title="确定预约吗？"
        show-cancel-button
        @confirm="goBooking"
      >
        <div class="confirm">
           <div class="item">
             <span class="item-title">预约日期：</span>
             <span class="item-content">{{this.date}}</span>
           </div>
            <div class="item" v-if="this.times != ''">
             <span class="item-title">预约场次：</span>
             <span class="item-content">{{this.times}}</span>
           </div>
            <div class="item">
             <span class="item-title">预约数量：</span>
             <span class="item-content">{{this.number}}</span>
           </div>
        </div>
    </van-dialog>
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
import { Loading } from 'vant';
import { ActionSheet } from 'vant';

import {
  getCalendar,
  getShow,
  getUserOrderInfo,
  downOrder
} from "../../utils/api";
import { FormatDate } from "../../utils/Format";

// import Calendar from "v-calendar/lib/components/calendar.umd";
// import DatePicker from "v-calendar/lib/components/date-picker.umd";

import { Dialog } from 'vant';

Vue.use(Loading);
Vue.use(Dialog);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Popup);
Vue.use(Divider);
Vue.use(Cell).use(CellGroup);
Vue.use(Field);
Vue.use(Stepper);
Vue.use(ActionSheet)
export default {
  data() {
    return {
      date: "",
      times: "",
      number: 1,
      ticketName: "",
      loading:"",
      id: "",
      calendarList: [],
      defaultDateText:"请选择预约日期",
      defaultShowText:"请选择预约场次",
      hideCalendar: true,
      calendarDate: null,
      show: false,
      showActionSheet:false,
      showConfirm:false,
      radio: "",
      userInfo: {},
      showList: [],
      orderData:{},
      item: null,
      formats: {
        title: "MMMM YYYY",
        weekdays: "W",
        navMonths: "MMM",
        input: ["L", "YYYY-MM-DD", "YYYY/MM/DD"], // Only for `v-date-picker`
        dayPopover: "L" // Only for `v-date-picker`
      },
      actions: [
        { name: '选项', color: '#07c160' },
        { name: '身份证',value:'0'},
        { name: '护照',value:'1'},
        { name: '港澳通行证', value:'2'},
        { name: '台湾通行证',value:'3'}
      ]
    };
  },
  components: {
    Calendar:(resolve) => require(['v-calendar/lib/components/calendar.umd'],resolve),
    DatePicker:(resolve) => require(['v-calendar/lib/components/date-picker.umd'],resolve)
  },
  // components: {
  //   Calendar,
  //   DatePicker
  // },
  created() {
    let type = sessionStorage.getItem('type');
    if(type != 2){
      this.item = JSON.parse(sessionStorage.getItem("item"));
    }else{
      this.item = JSON.parse(sessionStorage.getItem("moreChooseItem"));
    }
    
    this.id = sessionStorage.getItem("orderId");
    this.ticketName = this.item.name;
    this.getCalendarList(this.item.id);
    this.getUserInfo(this.id);
  },
  computed:{
    getCertificateType:{
      get(){
        let type = this.userInfo.certificateType
        return type == '0'?'身份证': type == '1'?'护照': type == '2'?'港澳通行证': type== '3'?'台湾通行证':''
      },
      set(val){
        this.userInfo.certificateType = val
      }
    }
  },
  methods: {
    //点击预约日期行
    selectDate() {
      if(this.calendarList.length == 0){
        return 
      }
      this.calendarDate = null;
      this.hideCalendar = false;
    },
    //接口获取日期数据
    getCalendarList(id) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      getCalendar(id).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
        }
        this.$toast.clear();
        this.calendarList = res.data.data;
        if(this.calendarList.length == 0){
          this.defaultDateText = "暂无可预约日期"
          this.defaultShowText = "暂无可预约场次"
        }
      });
    },
    //点击日历时执行的函数
    getDate(obj) {
      this.date = FormatDate(obj);
      this.hideCalendar = true;
      let data = {
        date: this.date,
        id: this.item.id
      };
    if(this.item.containShow){
          getShow(data).then(res => {
            if (res.data.code != 200) {
              this.$toast.fail(res.data.error);
            }
              this.showList = res.data.data;
            if (this.showList.length == 0){
              this.defaultShowText = "暂无可预约场次"
            }
          });
      }
    
    },
    //点击预约场次行执行的函数
    selectShow() {
      if(this.calendarList.length == 0 || this.showList.length == 0){
        return 
      }
      if (this.date === "") {
        this.$toast.fail("请先选择预约日期");
        return;
      }
      this.show = true;
    },
    //获取用户信息
    getUserInfo(id) {
      getUserOrderInfo(id).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
        }
        this.userInfo = res.data.data;
      });
    },
    //选择场次时执行的函数
    clickRadio(item) {
      this.radio = item.time;
      this.times = this.radio;
      this.show = false;
    },
    //点击预约按钮执行的函数
    handleClick() {
        // 包含演出票
        if (this.item.containShow) {
          if (this.date === "") {
            this.$toast.fail("请先选择预约日期");
            return;
          }
          if (this.times === "") {
            this.$toast.fail("请先选择预约场次");
            return;
          }
          // 不能修改个人信息
          if(this.userInfo.updateLinkInfo){
              this.orderData = {
                number: this.number,
                orderId: this.id,
                playDate: this.date,
                showTime: this.times,
                ticketId: this.item.id
              }
          }else{
              //可以修改个人信息 
              this.orderData = {
                number: this.number,
                orderId: this.id,
                playDate: this.date,
                showTime: this.times,
                ticketId: this.item.id,
                name: this.userInfo.name,
                mobile: this.userInfo.mobile,
                idCard: this.userInfo.idCard,
                certificateType: this.userInfo.certificateType
              }
          }
        // 不含演出票
        } else {
          if (this.date === "") {
            this.$toast.fail("请先选择预约日期");
            return;
          }
          if(this.userInfo.updateLinkInfo){
              this.orderData = {
                number: this.number,
                orderId: this.id,
                playDate: this.date,
                ticketId: this.item.id
              }
          }else{
              this.orderData = {
                number: this.number,
                orderId: this.id,
                playDate: this.date,
                ticketId: this.item.id,
                name: this.userInfo.name,
                mobile: this.userInfo.mobile,
                idCard: this.userInfo.idCard,
                certificateType: this.userInfo.certificateType
              }
          }

        }
        this.showConfirm = true;
    },
    //确认框点击确认时执行的函数
    goBooking(){
        downOrder(this.orderData).then(res => {
          if (res.data.code != 200) {
            return this.$toast(res.data.error);
          }
          this.$toast.success("预约成功");
          this.$router.push("/booked");
        });
    },
    // 点击右箭头时触发
    handleClickRightIcon() {
      if(this.userInfo.updateLinkInfo) return ;
      this.showActionSheet = true
    },
    // 选择证件类型
    onSelect(item) {
      this.userInfo.certificateType = item.value
      this.showActionSheet = false
    }
  }
};
</script>


<style lang="scss" >
.main {
  // background: #f0eff5;
  height: 100vh;
  box-sizing: border-box;
  padding: 0rem 0.5rem 0rem;
  .edit {
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
      background: linear-gradient(to right, #fdc830, #f37335);
      text-align: center;
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
.confirm{
  .item:first-child{
    margin-top:0.5rem;
  }
  .item{
    text-align: center;
    line-height: 1.2rem;
    display: flex;
    .item-title{
      width:50%;
      text-align: right;
      padding-right:0.3rem;
      color:#9c9c9c;
    }
    .item-content{
      flex:1;
      text-align: left;
      padding-left:0.3rem;
    }
  }
}
</style>