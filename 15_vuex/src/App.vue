<template>
  <div>
    <add></add>

    <hr>
    <my-sub></my-sub>
  </div>
</template>

<script>
import add from './components/add.vue';
import sub from './components/sub.vue'
export default {
  name: 'app',
  components: {
    add,
    'my-sub':sub
  }
}
</script>

<style>

</style>
