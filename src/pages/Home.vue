<template>
  <div class="homeContainer">
    <ul>
      <li v-for="item of ticketList" :key="item.id">
        <div class="header">
          <p class="name">{{item.name}}</p>
        </div>
        <div class="content clearfix">
          <div class="left">
            <p>
              <span>订单号:</span>
              <span>{{id}}</span>
            </p>
            <p>
              <span>购买数量:</span>
              <span>{{item.number}} 张</span>
            </p>
          </div>
          <div class="right" @click="handleBook(item)" ref="btn">
            <span>预约</span>
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
      ticketList: []
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
        this.id = res.data.data;
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
      if (item.number == 0) {
        document.querySelector(".right span").style.background =
          "linear-gradient(to right, #bdc3c7, #2c3e50)";
        return;
      }
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
  ul {
    background: #1e94db;
    height: 100vh;
    box-sizing: border-box;
    padding: 1rem 0.5rem 0;
    li {
      background: #fff;
      padding: 0.4rem;
      border-radius: 0.2rem;
      margin-bottom: 0.5rem;
      .header {
        .name {
          text-align: left;
          line-height: 1rem;
        }
      }
      .content {
        margin-top: 0.5rem;
        .left {
          float: left;
          p {
            line-height: 1rem;
            span:first-child {
              float: left;
              display: block;
              width: 3rem;
              text-align: left;
              color: #9c9c9c;
            }
          }
        }
        .right {
          float: left;
          position: relative;
          top: 0.6rem;
          left: 1rem;
          span {
            color: #fff;
            display: block;
            text-align: center;
            background: -webkit-linear-gradient(to right, #fdc830, #f37335);
            background: -o-linear-gradient(to right, #fdc830, #f37335);
            background: -moz-linear-gradient(to right, #fdc830, #f37335);
            background: linear-gradient(to right, #fdc830, #f37335);
            padding: 0.2rem 1.1rem;
            border-radius: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
