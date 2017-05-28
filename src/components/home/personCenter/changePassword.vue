<template>
  <div class="change-pass">
    <div class="contain">
      <form method="post" @submit.prevent="onSubmit()">
        <!--@submit.prevent中的.prevent修饰符表示提交事件不再重载页面-->
        <div class="form-password">
          <label>
            旧密码
            <input
              v-model.trim="pass"
              type="password"
              name="email">
          </label>
        </div>
        <div class="form-newpass">
          <label>
            新密码
            <input
              v-model.trim="pass"
              type="password">
            <!--  placeholder 属性提供可描述输入字段预期值的提示信息（hint）。
                  该提示会在输入字段为空时显示，并会在字段获得焦点时消失。-->
          </label>
        </div>
        <div class="form-surepass">
          <label>
            确认新密码
            <input
              v-model.trim="ensurepass" type="password">
          </label>
        </div>
        <div class="buttons">
            <button class="cancel-change-button" @click="$emit('closeChange')">
              取消
            </button>
            <button class="ok-change-button">确定</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        pass: '',
        ensurepass: ''
      }
    },
    methods: {
      toLogin () {
        this.$nextTick(() => {
          this.$router.push('/home')
        })
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }
  .change-pass {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(51, 51, 51, .5);
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
    margin-top: 0px;
  }

  .contain {
    z-index: 9999;
    display: table-cell;
    vertical-align: middle;
    position: fixed;
    margin:0 auto;
    width: 320px;
    height: 240px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .6);
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #596179;
  }
  form input {
    /*指定对象为内联块元素*/
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #596179;
    outline: 0;
    width: 139px;
  }

  .form-password, .form-newpass, .form-surepass {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
  .cancel-change-button, .ok-change-button {
    border: none;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #596179;
    background: none;
    outline: none;
  }
  .cancel-change-button:hover, .ok-change-button:hover {
    color: #A9CDCF;
  }
  .cancel-change-button {
    border-right: 2px solid rgba(89,97,121,0.38);
    width: 158px;
  }
  .ok-change-button {
    width: 158px;
  }

</style>
