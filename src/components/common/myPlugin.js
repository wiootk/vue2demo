(function() {
    var MyPlugin = {}
    MyPlugin.install = function(Vue, options) {
        // 全局方法或属性
        //组件外使用 Vue.test();
            Vue.test = function() {
                alert("123")
            },

            // 2. 全局资源(指令，过滤器)
            // <div v-test></div>
            Vue.directive('test', {
                isFn: true,
                acceptStatement: true,
                bind(el, binding, vnode, oldVnode) {
                    // 逻辑...
                    console.log("添加全局资源");
                },
                update: function(fn) {},
                unbind: function() {}
            })
          // 3. 注入组件
          //在 vue 初始化对象的时候，把 Vue.mixin 的参数 复制到了初始化对象中
        Vue.mixin({
                created: function() {
                    // 逻辑...
                    // console.log("注入组件");
                }
            })
            //添加实例方法
            //组件内 this.doubleNumber(2);
        Vue.prototype.doubleNumber = function(val) {
            if (typeof val === 'number') {
                return val * 2;
            } else if (!isNaN(Number(val))) {
                return Number(val) * 2;
            } else {
                return null
            }
        }
    }
    if (typeof exports == "object") {
        module.exports = MyPlugin
    } else if (typeof define == "function" && define.amd) {
        define([], function() {
            return MyPlugin
        })
    } else if (window.Vue) {
        window.MyPlugin = MyPlugin
        Vue.use(MyPlugin)
    }
})()