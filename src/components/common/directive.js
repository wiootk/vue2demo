import $ from 'jquery'
import Vue from 'vue'
Vue.directive('example', {
    // deep: true, //相关属性也是一个对象
    twoWay: true, //双向绑定
    acceptStatement: true, //让指令像 v-on 一样接受内联语句
    // isLiteral: true, //值被看成字符串,不会建立数据监视 
    //<div v-my-directive="a++"></div>
    bind: function(el, binding, vnode) { //初始化动作
        // this.handler = function() {
        //     this.set(el.value) //赋值
        // }.bind(this)
// el.addEventListener('input', this.handler);
el.innerHTML=binding.value;
    },
    // this.vm.$on('rotate', () => { })
    inserted() { //被绑定元素插入父节点时调用
        // console.log('inserted');
    },
    update(el, binding, vnode, oldVnode) { //模板更新和绑定数据改变时触发        
        //       this.vm.$emit('crop', event)       
    },
    componentUpdated() { //模板完成一次更新周期时调用
        // console.log('componentUpdated');
    },
    unbind: function() { //指令与元素解绑时调用
        // this.vm.$off('rotate')
        this.el.removeEventListener('input', this.handler)
    }
})
Vue.directive('options', function(el, binding) {
    let value = binding.value.value;
    let lable = binding.value.lable;
    let opts = binding.value.options;
    let optStr = '<option value=""></option>';
    if (Array.isArray(opts)) {
        for (let opt of opts) {
            optStr += '<option value="' + opt[value || 'id'] + '">' + opt[lable || 'lable'] + '</option>';
        }
        $(el).empty();
        $(el).append(optStr);
    } else {
        console.log('指令（v-options）参数有误！！！');
    }
})
// $(el).trigger("input");
// el.dispatchEvent(new Event('change', { target: el.target })) ;
// el.dispatchEvent(new Event('input', { target: el.target }));

Vue.directive('focus', {
    isLiteral: true, //值被看成字符串,不会建立数据监视 
    //   inserted:  
    function(el, binding) {
        el.focus();
        // el.style.backgroundColor = binding.value.color
    }
})
Vue.directive('example2', {
 params: ['a'],
 paramWatchers: {
  a: function (val, oldVal) {
   console.log('a changed!')
  }
 }
})