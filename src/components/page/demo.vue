<template>
    <div class="main">
        <h1>{{ $route.params.id2 }}  </h1>
        <router-link to="/demo">子路由</router-link>
        <hr>pathDemo
        <router-view name='pathDemo'></router-view>
        <hr>default
         <router-view></router-view>
    </div>
    </div>
</template>
<script>
export default {
    name: 'main',
    data() {
        return {
            msg: 'main'
        }
    },
    watch: {
        '$route' (to, from) {
            // 对路由参数变化作出响应...
        }
    }
}
</script>
<style scoped>
</style>