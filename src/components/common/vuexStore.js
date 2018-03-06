import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const vuexStore = new Vuex.Store({
    state: {
        dic: {}
    },
    mutations: {
        addDic(state, dics) {
            $.extend(state.dic, dics);
        }
    },
    getters: {
        getDic: (state) => (key) => {
            return `${state.dic.lable}---${state.dic.code}----${key} `;
        }
    }
})
export { vuexStore as default };