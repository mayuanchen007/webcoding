<template>
  <div id="app">
      <Headers></Headers>
      <router-view></router-view>
      <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Headers from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  data(){
    return {}
  },
  components:{
    Headers  ,
    Footer
  }
}
</script>

<style>

</style>
