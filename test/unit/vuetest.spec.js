	import Vue from 'vue'
　　import MainApp from '../../src/App.vue'
　　describe('MainApp', () => {
　　  it('has a created hook', () => {
　　    expect(typeof MainApp.created).to.equal('function')
　　  })
　　  it('sets the correct default data', () => {
　　    const defaultData = MainApp.data()
　　    expect(defaultData.msg).to.equal('Welcome')
　　  })
　　  it('sets new text when created', () => {
　　    const vm = new Vue(MainApp).$mount()
　　    expect(vm.msg).to.equal('Bye Spec')
　　  })
　　  it('renders the correct text', () => {
　　    const Ctor = Vue.extend(MainApp)
　　    const vm = new Ctor().$mount()
　　    expect(vm.$el.textContent).to.equal('Bye Spec')
　　  })
　　})