import vuePayPop from './vue-pay-pop.vue' // 导入组件
const PayPop = {
    install(Vue, options) {
        Vue.component(vuePayPop.name, vuePayPop) // vuePayPop.name 组件的name属性
        // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
        // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
        // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
    },
    render(h) {
      return h('div', {
        class: 'vuepaypop'
      }, [])
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.PayPop = PayPop
    Vue.use(PayPop)
}
export default PayPop

export {
  vuePayPop
}
