<template>
  <div class="pay-box">
    <!-- 输入框及键盘 -->
    <div :class="payPopOptions.isShow? 'pay-wrapper pay-wrapper-active' : 'pay-wrapper'">
      <div class="pay-container" v-if="status">
        <div class="pay-title">
          {{title}}
          <div class="close-pay" @click="closePay">
            <svg t="1501505446265" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1904" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" class="icon"><path data-v-7c990886="" d="M550.659 490.565l324.395-324.386c10.945-10.945 10.945-28.699 0-39.644-10.948-10.95-28.704-10.95-39.648-0.004L511.01 450.916 186.625 126.53c-10.946-10.947-28.703-10.947-39.648 0-10.946 10.95-10.946 28.703 0 39.648l324.385 324.386-324.385 324.401c-10.946 10.944-10.946 28.703 0 39.65 10.945 10.943 28.702 10.943 39.648 0L511.01 530.213l324.396 324.401c10.944 10.944 28.7 10.944 39.648 0 10.945-10.946 10.945-28.705 0-39.649L550.66 490.565z" p-id="1905"></path></svg>
          </div>
        </div>
        <div class="pay-input-wrapper">
          <div class="pay-input" v-for="(item, index) in pwdLength" :key="index">
            <input type="password" :value="val[index]" disabled>
          </div>
        </div>
        <div class="pay-keyboard-wrapper">
          <div class="pay-keyboard">
            <div class="pay-key" v-for="item in keyBoards" :key="item" @click="val2input(item)">
              {{item}}
            </div>
          </div>
          <div class="pay-keyboard-bottom">
            <div class="pay-key-bottom pay-key-blank"></div>
            <div class="pay-key-bottom pay-key-middle" @click="val2input('0')">0</div>
            <div class="pay-key-bottom pay-key-del" @click="delVal" v-html="del"></div>
          </div>
        </div>
      </div>
      <!-- 结果显示 -->
      <div class="pay-result" v-if="!status">
        <div class="loader"></div>
        <div>{{loadingTxt}}</div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="gray-wrapper" v-show="payPopOptions.isShow"></div>
  </div>
</template>

<script>
  export default {
    name: 'vue-pay-pop',
    props: ['payPopOptions'],
    data () {
      return {
        //可选参数，支持改变
        //顶部文字
        title: this.payPopOptions.title || '请输入支付密码',
        //密码长度
        pwdLength: this.payPopOptions.pwdLength || 6,
        //底部删除按钮
        del: this.payPopOptions.del || '<svg t="1524794920212" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1048" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="30"><defs><style type="text/css"></style></defs><path d="M798.675138 191.774745c44.172035 0 80.109526 35.753295 80.109526 79.69918l0 445.373557c0 43.945885-35.93749 79.69918-80.109526 79.69918L382.443295 796.546661c-25.555026 0-49.780777-12.279674-64.804958-32.845059L154.967444 541.013801c-20.472264-28.025287-20.472264-65.680908 0-93.707219L317.638337 224.617757c15.023158-20.566408 39.249933-32.843012 64.804958-32.843012L798.675138 191.774745M798.675138 177.709401 382.443295 177.709401c-30.16502 0-58.508555 14.365172-76.240405 38.641065L143.531997 439.038268c-24.009833 32.865525-24.009833 77.378321 0 110.245893l162.670893 222.685755c17.732873 24.276916 46.075385 38.641065 76.240405 38.641065l416.231843 0c52.051493 0 94.247524-41.977044 94.247524-93.762477l0-445.373557C892.922662 219.688491 850.726631 177.709401 798.675138 177.709401L798.675138 177.709401zM475.470015 356.690772l218.792075 218.791052c10.984169 10.986215 10.984169 28.795836 0 39.780005-10.986215 10.986215-28.795836 10.986215-39.781028 0L435.69001 396.470777c-10.986215-10.984169-10.986215-28.795836 0-39.780005C446.674179 345.704556 464.485847 345.704556 475.470015 356.690772zM437.268972 578.919109l223.685525-224.042659c11.228739-11.247158 29.438473-11.247158 40.669258 0 11.230786 11.249205 11.230786 29.487591 0 40.73475L477.93823 619.654882c-11.228739 11.249205-29.438473 11.249205-40.669258 0C426.039209 608.404654 426.039209 590.167291 437.268972 578.919109z" p-id="1049" fill="#1296db"></path></svg>',
        //默认等候文字
        loadingTxt: this.payPopOptions.loadingTxt || '请稍候...',
        //默认等候时间
        loadingTime: this.payPopOptions.loadingTime || 1000,
        //显示结果后，多久重回默认
        resultTime: this.payPopOptions.resultTime || 1000,
        //成功文字
        successTxt: this.payPopOptions.successTxt || '支付成功',
        //失败文字
        failTxt: this.payPopOptions.failTxt || '支付失败',
        //默认参数，无法改变
        //键盘数字(1~9)
        keyBoards: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        //键入的值
        val: [],
        //默认输入框与等待层是否显示
        status: true
      }
    },
    methods: {
      val2input(item) {
        this.val.push(item)
        if (this.val.length == this.pwdLength) {
          //打开等待层
          this.status = false
          //输入完毕后将值传递给父组件
          this.$emit('inputDown', this.val.join(''))
          //清空数据
          this.val = []
        }
      },
      delVal () {
        if (this.val.length > 0) this.val.pop()
      },
      closePay () {
        this.payPopOptions.isShow = false;
      },
      $payStatus(flag = false) {
        const that = this
        //模拟等候feel
        setTimeout(() => {
          if (flag) {
            //成功
            this.loadingTxt = this.successTxt
            //关闭输入层，重置等待语
            setTimeout(function() {
              that.payPopOptions.isShow = !flag
              that.status = true
              that.loadingTxt = that.payPopOptions.loadingTxt || '请稍候...'
            }, this.resultTime)
          } else {
            //失败
            this.loadingTxt = this.failTxt
            //重新打开输入层，重置等待语
            setTimeout(function() {
              that.status = true
              that.loadingTxt = that.payPopOptions.loadingTxt || '请稍候...'
            }, this.resultTime)
          }
        }, this.loadingTime)
      }
    }
  }
</script>

<style>
  .gray-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9;
  }
  .pay-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -400px;
    height: 400px;
    background: #fff;
    border-top: 1px solid #c7c7c7;
    z-index: 99;
    overflow: hidden;
    transition: transform .2s;
    transform: translateY(0);
  }
  .pay-wrapper-active {
    transition: transform .2s;
    transform: translateY(-400px);
  }
  .pay-title {
    line-height: 1;
    padding: 10px 0;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #c7c7c7;
  }
  .close-pay {
    float: right;
    margin-right: 5%;
  }
  .pay-input-wrapper {
    position: relative;
    display: flex;
    width: 80%;
    margin: 0 auto;
    margin-top: 60px;
  }
  .pay-input-wrapper:before {
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    content: "";
    border: 1px solid #c7c7c7;
    transform: scale(.5);
    color: #c7c7c7;
    transform-origin: left top;
    z-index: 1000;
  }
  .pay-input {
    position: relative;
    flex: 1;
    height: 45px;
  }
  .pay-input:before {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #c7c7c7;
    transform: scaleX(.5);
    color: #c7c7c7;
    transform-origin: 0 0;
  }
  .pay-input input {
    width: 100%;
    height: 100%;
    font-size: 30px;
    text-align: center;
    background: none;
    outline: none;
    border: none;
  }
  .pay-keyboard-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .pay-keyboard,
  .pay-keyboard-bottom {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    background-color: #f2f8fa;
  }
  .pay-keyboard:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    color: #c7c7c7;
    transform: scaleY(.5);
    content: "";
    border-top: 1px solid #c7c7c7;
    z-index: 1000;
  }
  .pay-key,
  .pay-key-bottom {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 33.33333333%;
    height: 50px;
    font-size: 16px;
    background-color: #fff;
    cursor: pointer;
  }
  .pay-key-blank,
  .pay-key-del {
    background-color: #f2f8fa;
  }
  .pay-key:before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    color: #c7c7c7;
    transform: scaleY(.5);
    content: "";
    border-top: 1px solid #c7c7c7;
    z-index: 1000;
  }
  .pay-key:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #c7c7c7;
    transform: scaleX(.5);
    color: #c7c7c7;
    z-index: 1000;
  }
  .pay-key-middle:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #c7c7c7;
    transform: scaleX(.5);
    color: #c7c7c7;
    z-index: 1000;
  }
  .pay-key-middle:after {
    position: absolute;
    top: 0;
    right: -2px;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #c7c7c7;
    transform: scaleX(.5);
    color: #c7c7c7;
    z-index: 1000;
  }
  .pay-result {
    text-align: center;
  }
  .loader {
    width:25px;
    height:25px;
    display:inline-block;
    padding:0px;
    margin-top: 50px;
    border-radius:100%;
    border:5px solid;
    border-top-color:rgba(254, 168, 23, 0.65);
    border-bottom-color:rgba(57, 154, 219, 0.65);
    border-left-color:rgba(188, 84, 93, 0.95);
    border-right-color:rgba(137, 188, 79, 0.95);
    -webkit-animation: loader 2s ease-in-out infinite alternate;
    animation: loader 2s ease-in-out infinite alternate;
  }
  @keyframes loader {
    from {transform: rotate(0deg);}
    to {transform: rotate(720deg);}
  }
</style>
