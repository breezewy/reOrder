<template>
  <div class="tabbar">
    <van-tabbar v-model="active" router>
      <van-tabbar-item name="list" icon="home-o" :to="{path:`/home/${id}`}">票型列表</van-tabbar-item>
      <van-tabbar-item name="booked" icon="search" to="/booked">已预约订单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);

export default {
  name: "tabbar",
  data() {
    return {
      active: "list",
      id:""
    };
  },
  created(){
    this.id = sessionStorage.getItem("id");
  },
  //tab切换时候，根据当前页面的路由，决定tab是否为高亮
  mounted() {
    let url = window.location.href;
    if (url.indexOf("/home") !== -1) {
      this.active = "list";
    } else if (url.indexOf("/booked") !== -1) {
      this.active = "booked";
    }
  }
};
</script>


<style lang="scss" scoped>
/deep/ .van-tabbar-item{
   font-size: 0.7rem;
}
</style>