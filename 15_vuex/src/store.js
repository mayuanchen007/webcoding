import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        add(state) {
            state.count++;
        },
        addN(state, step) {
            state.count += step;
        },
        sub(state) {
            state.count--;
        },
        subN(state, step) {
            state.count -= step;
        }
    },
    actions: {
        addAsync(context) {
            setTimeout(() => {
                context.commit('add');
            }, 2000);
        },
        addAsyncN(context, step) {
            setTimeout(() => {
                context.commit('addN', step)
            }, 2000);
        },
        subAsync(context) {
            setTimeout(() => {
                context.commit('sub');
            }, 2000);
        },
        subAsyncN(context, step) {
            setTimeout(() => {
                context.commit('subN', step)
            }, 2000);
        }
    },
    getters: {
        showNum: state => {
            return state.count
        }
    }
})