<template>
  <div class="homeContainer">
    <div class="header">
      <!-- <p class="header-title">{{dmqTicket.productName}}</p> -->
      <p class="header-title">宋城千古情</p>
      <div class="header-detail">
          <span class="detail-title">独木桥订单ID：</span><span class="detail-content">{{dmqTicket.dmqOrderId}}</span>
      </div>
       <div class="header-detail">
          <span class="detail-title">电话号：</span><span class="detail-content">{{dmqTicket.mobile}}</span>
      </div>
       <div class="header-detail">
          <span class="detail-title">证件号：</span><span class="detail-content">{{dmqTicket.idCard}}</span>
      </div>
       <div class="header-detail" v-if="dmqTicket == 2">
          <span class="detail-title">可预约数量：</span><span class="detail-content">{{dmqTicket.count}}</span>
      </div>
    </div>

    <ul class="relate" v-if="ticketList&&ticketList.length>0">
      <li class="item" v-for="item of ticketList" :key="item.id">
        <p class="item-name">{{item.name}}</p>
        <div class="item-detail">
          <div class="left" v-if="dmqTicket !== 2">
            <span class="detail-title">可预约数量：</span ><span class="detail-content">{{item.number}}</span>
          </div>
          <div class="right">
              <span class="btn"  @click="handleBook(item)">去预约</span>
          </div>
        </div>
      </li>
    </ul>
    <Tabbar />
  </div>
</template>

<script>
import { getReOrder, getTicket } from "../utils/api";
import Tabbar from "../components/Tabbar";
export default {
  name: "home",
  data() {
    return {
      id: "",
      ticketList: [],
      dmqTicket:{}
    };
  },
  components: {
    Tabbar
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let pageUrl = window.location.href;
      let index = pageUrl.lastIndexOf("/");
      let orderID = pageUrl.slice(index + 1);
      sessionStorage.setItem("id", orderID);
      // let orderID = "f39244240ad60e4bca564ee1955b372d2bae248aa52e6034";
      this.isLoading = true;
      getReOrder({ orderNo: orderID }).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
          return;
        }
        this.dmqTicket = res.data.data
        this.id = res.data.data.id;
        sessionStorage.setItem("orderId", this.id);
        getTicket(this.id).then(res => {
          if (res.data.code != 200) {
            this.$toast.fail(res.data.error);
          }
          this.ticketList = res.data.data;
        });
      });
    },
    handleBook(item) {
      sessionStorage.setItem("item", JSON.stringify(item));
      this.$router.push({
        name: "booking"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.homeContainer {
  background: #1e94db;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem 0.5rem 0;
  .header{
    background:#fff;
    padding: 0.4rem;
    border-radius: 0.2rem;
    margin-bottom: 1rem;
    .header-title{
      line-height: 1rem;
    }
    .header-detail{
      margin-top:0.5rem;
      display: flex;
      .detail-title{
        display: inline-block;
        color: #9c9c9c;
        width:4.5rem;
      }
      .detail-content{
        flex:1;
      }
    }
  
  }
  .relate{
    background:#fff;
    padding: 0.4rem;
    border-radius: 0.2rem;
    .item{
      background:#eee;
      padding:0.3rem  0.3rem 0.2rem;
      .item-name{
        line-height: 1rem;
      }
      .item-detail{
        line-height: 1.5rem;
        display: flex;
        .left{
          flex:1;
          height:1.5rem;
          line-height: 1.5rem;
          .detail-title{
            color:#9c9c9c;
          }
        }
        .right{
          flex:1;
          text-align:right;
          height:1.5rem;
          line-height: 1.5rem;
          .btn{
            color:#fff;
            padding:0.2rem 1.2rem;
            background: -webkit-linear-gradient(to right, #fdc830, #f37335);
            background: -o-linear-gradient(to right, #fdc830, #f37335);
            background: -moz-linear-gradient(to right, #fdc830, #f37335);
            background: linear-gradient(to right, #fdc830, #f37335);
            border-radius:0.7rem;
          }
        }
      }
    }
  }
}
</style>
