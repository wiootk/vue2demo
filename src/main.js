import 'babel-polyfill'
import Vue from 'vue'
// import App from './App'
import App from './main.vue'
import router from './components/router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import store from './components/common/vuexStore.js'
Vue.use(VueResource)
Vue.use(router)
Vue.use(Vuex)


import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);


// import pagePlugin from './components/common/pagePlugin'
// Vue.component('page-plugin', pagePlugin)
import plugin from './components/common/plugin'

import directive from './components/common/directive.js'

import filter from './components/common/filter.js'
import MyPlugin from './components/common/myPlugin.js'
Vue.use(MyPlugin)


router.beforeEach((to, from, next) => {
    console.log('路由跳转前的预处理');
    // next({ path: '/' })
    next();
})
Vue.http.interceptors.push((request, next) => {
    console.log('请求前的预处理和配置');
    request.method = 'GET';　
    next((response) => {
        console.log('响应后传给then前对response修改');
        if (!response.ok) {
            console.log('success');
        } else {
            console.log('error');
        }
        return response;
    });
});



new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})