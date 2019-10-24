<template>
  <div class="bookedContainer" v-wechat-title="$route.meta.title">
    <ul>
      <li v-for="item of childOrder" :key="item.id">
        <div class="header">
          <p class="name">{{item.name}}</p>
        </div>
        <div class="content clearfix">
          <div class="left">
            <p class="clearfix">
              <span>订单号:</span>
              <span>{{item.id}}</span>
            </p>
            <p class="clearfix">
              <span>游玩日期:</span>
              <span>{{item.playTime}}</span>
            </p>
            <p class="clearfix" v-if="item.showTime">
              <span>场次:</span>
              <span>{{item.showTime}}</span>
            </p>
            <p class="clearfix">
              <span>数量:</span>
              <span>{{item.number}} 张</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <Tabbar />
  </div>
</template>

<script>
import { getOrder } from "../../utils/api";
import Tabbar from "../../components/Tabbar";
export default {
  data() {
    return {
      childOrder: [],
      id: ""
    };
  },
  components: {
    Tabbar
  },
  created() {
    this.id = sessionStorage.getItem("orderId");
    this.getOrder(this.id);
  },
  methods: {
    getOrder(id) {
      getOrder(id).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
        }
        this.childOrder = res.data.data;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.bookedContainer{
  background: #1e94db;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem 0.5rem 0;

ul {
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
    }
  }
}
}
</style>