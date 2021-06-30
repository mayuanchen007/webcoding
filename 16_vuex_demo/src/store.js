import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        list: [],
        inputValue: 'aaa',
        nextId: 5,
        flag: 'all'
    },
    mutations: {
        initList(state, list) {
            state.list = list;
        },
        getInputValue(state, value) {
            state.inputValue = value;
        },
        addItem(state) {
            const obj = {
                "id": state.nextId,
                "info": state.inputValue,
                "done": false
            }
            state.list.push(obj);
            state.nextId++;
        },
        removeItemByid(state, id) {
            let index = state.list.findIndex(x => {
                return x.id === id;
            });
            console.log(index);
            if (index !== -1) {
                state.list.splice(index, 1);
            }
        },
        changeIsDoneById(state, param) {
            const index = state.list.findIndex(x => {
                return x.id === param.id
            });
            if (index !== -1) {
                state.list[index].done = param.done
            }
        },
        changStatus(state, flag) {
            state.flag = flag;
        },
        // 清除已完成的任务
        cleanDone(state) {
            state.list = state.list.filter(x => x.done === false)
        }
    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                context.commit('initList', data);
            });
        }
    },
    getters: {
        sumWWC(state) {
            return state.list.filter(x => {
                return x.done;
            }).length;
        },
        getList(state) {
            if (state.flag === 'all') {
                return state.list;
            }
            if (state.flag === 'do') {
                return state.list.filter(x => x.done)
            }
            if (state.flag === 'undo') {
                return state.list.filter(x => !x.done)
            }
            return state.list;
        }
    }
})