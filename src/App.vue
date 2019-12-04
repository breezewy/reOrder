<template>
  <div id="app">
    <img class="logo-bg" src="./assets/header-bg.jpg" v-if="hasString()">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods:{
    hasString(){
      return window.location.href.indexOf('programme') == '-1'? true : false
    }
  }
};
</script>

<style lang="scss">
html,body{
  height:100%;
  /* background: #1e94db; */
  background:url('./assets/body-bg.jpg') fixed;
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
