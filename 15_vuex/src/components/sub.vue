<template>
    <div>
        <h3>当前的count值为：{{count}}</h3>
        <button @click="subh">-1</button>
        <button @click="subhN">subN</button>
        <button @click="subAsync1">subAsync</button>
        <button @click="subAsyncN1">subAsyncN</button>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return {}
    },
    computed:{
        ...mapState(['count'])
    },
    methods:{
        ...mapMutations(['sub','subN']),
        subh(){
            this.sub();
        },
        subhN(){
            this.subN(2)
        },
        ...mapActions(['subAsync','subAsyncN']),
        subAsync1(){
            this.subAsync();
        },
        subAsyncN1(){
            this.subAsyncN(5);
        }
    }
}
</script>