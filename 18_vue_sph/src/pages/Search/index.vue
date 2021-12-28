<template>
    <div>
     <h1>{{$route.params.keywords}}</h1>
    <h1>{{$route.query.keywords}}</h1>
    <h3>{{keywords}}</h3>
    </div>
   
</template>
<script>
export default {
   props:['keywords']
}
</script>
<style lang="less" scoped>

</style>