import Vue from 'vue'
import Router from 'vue-router'

import demo from './page/demo'
import demo2 from './page/demo2'
Vue.use(Router)
export default new Router({
    routes: [{
        path: '/',
        component: demo
    }, {
        // /user/:username/post/:post_id
        path: '/demo/:id',
        component: demo,
        children: [{
            path: '/:name',
            components: {
                pathDemo: demo2,
                default: demo
            }
        }]
    }]
})