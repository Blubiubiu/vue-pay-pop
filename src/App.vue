<template>
  <div id="app">
    <div @click="showPayPop">点击弹出支付框</div>
    <vue-pay-pop ref="pay" :payPopOptions="payPopOptions" @inputDown="inputDown"></vue-pay-pop>

  </div>
</template>

<script>
import vuePayPop from './lib/vue-pay-pop'

export default {
  name: 'app',
  data () {
    return {
      payPopOptions: {
        title: '请输入支付密码',
        pwdNum: 6,
        isPay: true,
        txt: '请稍候',
        show: false,
        del: 'x'
      },

    }
  },
  components: {
    vuePayPop
  },
  methods: {
    inputDown(val) {
      this.payPopOptions.isPay = false;
      //模拟检查数据
      setTimeout(() => {
        if (val == '111111') {
          this.$refs.pay.$payStatus('验证通过', false)
        } else {
          this.$refs.pay.$payStatus('验证失败', true)
        }
      }, 1000)
    },
    showPayPop() {
      this.payPopOptions.show = true;
    }
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

</style>
