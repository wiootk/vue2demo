import 'babel-polyfill'
import Vue from 'vue'
import App from './index.vue'
import router from './components/router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(router)
Vue.use(Vuex)
new Vue({
    el: '#index',
    router,
    render: h => h(App)
})