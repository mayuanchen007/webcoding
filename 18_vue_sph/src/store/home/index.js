import { getTypeNav } from '@/api/index'
const state = {
    categoryList: []
}
const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    }
}
const actions = {
    async getCategoryList({ commit }) {
        const res = await getTypeNav();
        if (res.code === 200) {
            commit("CATEGORYLIST", res.data)
        }
    }
}
const getters = {

}

export default { state, actions, mutations, getters }