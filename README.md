# vue-pay-pop
<<<<<<< HEAD

> A Vue.js Pay Plugin

<a href="https://www.npmjs.org/package/vue-pay-pop">
  <img src="https://img.shields.io/npm/v/vue-pay-pop.svg">
</a>

![image](https://github.com/Blubiubiu/vue-pay-pop/tree/master/gif/demo.png)


## Install
```shell
npm install vue-pay-pop -S
```

## How To Use

``` javascript
//main.js
import Vue from 'vue'
import vuePayPop from 'vue-pay-pop'

Vue.use(vuePayPop)
```

``` vue
  <!-- app.vue -->
  <template>
    <div id="app">
      <div @click="showPayPop">点击弹出支付框</div>
      <vue-pay-pop ref="pay" :payPopOptions="payPopOptions" ></vue-pay-pop>
    </app>
  </template>
```
``` javascript
  <script>
    export default {
      name: 'app',
      data () {
        return {
          payPopOptions: {
            isShow: false
          },
        }
      },
      inputDown(val) {
      //模拟检查数据
        setTimeout(() => {
          if (val == '111111') {
            this.$refs.pay.$payStatus(true)
          } else {
            this.$refs.pay.$payStatus(false)
          }
        }, 1000)
      },
      showPayPop() {
        this.payPopOptions.isShow = true;
      }
    }
  </script>
```

## options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| isShow | Boolean | false | show or hide |
| title | String | 请输入支付密码 | pay title |
| pwdLength | Number | 6 | password length |
| del | html | svg | delete btn |
| loadingTxt | String | 请稍候... | loading text |
| loadingTime | Number | 1000 | loading time |
| resultTime | Number | 1000 | invert time |
| successTxt | String | 支付成功 | success text |
| failTxt | String | 支付失败 | fail text |


#######
if you find some questions, please contact me!

bling_faker@163.com

if you like it, show me your star, thanks very much


