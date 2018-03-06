<template>
    <div class="main">
        <h1>{{ $route.params.name }} </h1>
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