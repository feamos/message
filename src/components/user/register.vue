<template>
    <div class="register">
      <div class="contain">
        <h1 class="title">快 速 注 册</h1>
        <form method="post" @submit.prevent="onSubmit()">
          <!--@submit.prevent中的.prevent修饰符表示提交事件不再重载页面-->
          <div class="form-mobile">
            <label>
              <input
                v-model.trim="mobile"
                type="text"
                name="email"
                placeholder="输入手机号">
              <!--  placeholder 属性提供可描述输入字段预期值的提示信息（hint）。
                    该提示会在输入字段为空时显示，并会在字段获得焦点时消失。-->
            </label>
          </div>
          <div class="form-identify">
            <label>
                <input
                  v-model.trim="identify" type="text"
                  placeholder="输入验证码">
              <button class="get-idencode">获取验证码</button>
            </label>
          </div>
          <div class="form-next">
            <button class="next" type="submit" @click="goNext">
              下一步
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
//  import API from '@/common/API/api'
  export default {
    name: 'register',
    data () {
      return {
        mobile: '',
        identify: ''
      }
    },
    methods: {
      goNext () {
//        fetch(API.register, {
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body: JSON.stringify({
//            mobile: this.mobile
//          })
//        }).then((res) => res.json())
//          .then((json) => {
//            console.log(json)
//            if (json.code === SUCCESS) {
//              this.$Message.info('登录成功')
//              this.$router.push('/home')
//            }
//            if (json.code === PASSWD_ERR) {
//              this.$Message.info('用户名或密码错误')
//              this.pass = ''
//            }
//            if (json.code === MOBILE_ERR) {
//              this.$Message.info('用户名不存在')
//              this.mobile = ''
//              this.pass = ''
//            }
//          })
        this.$router.push('/setpass')
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }
  .register {
    background-image: url("../../images/background_vague.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .contain {
    z-index: 9999;
    display: table-cell;
    vertical-align: middle;
    position: fixed;
    margin:0 auto;
    width: 450px;
    height: 360px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .6);
  }

  h1 {
    /*检索或设置对象四边的外延边距,如果提供三个，第一个用于上，第二个用于左、右，第三个用于下。*/
    margin: 5% 0 3%;
    /*设置或检索对象中的文本字体的粗细*/
    font-weight: 100;
    text-align: center;
    font-size: 40px;
  }


  form input::placeholder {
    color: #ccc;
  }

  form input {
    /*指定对象为内联块元素*/
    display: inline-block;
    height: 3.5rem;
    padding: 0 0.8rem;
    box-sizing: border-box;
    font-size: 1.5rem;
    background: #fff;
    border: 0.1rem solid #ccc;
    border-radius: 5px;
    outline: 0;
  }

  .form-mobile input {
    width: 80%;
    margin: 5% 10%;
  }

  .form-identify input {
    width: 38%;
    margin-left: 10%;
  }

  .form-identify {
    height: 3.5rem;
    line-height: 3.5rem;
  }

  .get-idencode {
    width: 37%;
    margin-left: 4%;
    height: 3.3rem;
    line-height: 3.5rem;
    font-size: 1.5rem;
    color: white;
    background-color: #a9cdcf;
    cursor: pointer;
    border-radius: 10px;
  }

  .form-next {
    text-align: center;
    margin-top: 1.5rem;
  }
  .next {
    width: 40%;
    height: 3.3rem;
    font-size: 1.5rem;
    color: white;
    background-color: #a9cdcf;
    cursor: pointer;
    border-radius: 10px;
  }

</style>
