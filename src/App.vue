<template>
  <div id="app">
    <img class="logo-bg" :src="src" v-if="hasPath()">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      src:'https://static.dmqwl.com/reOrder_header.jpg'
    }
  },
  created(){
    this.changeSrc()
  },
  methods:{
    hasPath(){
      // return window.location.href.indexOf('programme') == '-1'? true : false 
      if(window.location.href.indexOf('programme') != '-1'){
        return false
      }else if(window.location.href.indexOf('traffic') != '-1'){
        return false
      }else {
        return true
      }
    },
    changeSrc(){
        if(window.location.href.indexOf('orderSeat') != '-1' || window.location.href.indexOf('parkOrder') != '-1'){
            this.src = 'https://static.dmqwl.com/orderSeat_header.png'
        }
    }
  }
};
</script>

<style lang="scss">
html,body{
  height:100%;
  background:url('https://static.dmqwl.com/reOrder_body.jpg') fixed;
  background-size: cover;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 0.6rem;
  .logo-bg{
    width:100%;
  }
}
</style>
