<template>
    <div>
        <h3>当前的count值为：{{$store.state.count}}</h3>
        <button @click='add'>+1</button>
        <button @click='addN'>addN</button>
        <button @click='addAsync'>addAsync</button>
        <button @click='addAsyncN'>addAsyncN</button>
         <h3>当前getter的count值为：{{$store.state.showNum}}</h3>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
        add(){
            this.$store.commit('add');
        }
        ,addN(){
            this.$store.commit('addN',2)
        },
        addAsync(){
            this.$store.dispatch('addAsync');
        },
        addAsyncN(){
            this.$store.dispatch('addAsyncN',5);
        }

    }
}
</script>