<template>
  <div class="create-container">
    <div class="contain">
      <div class="contain-head">
        模板名称
        <input class="create-input" type="text" v-model="templateName">
      </div>
      <div class="buttons">
        <button class="cancel-change-button" @click="$emit('closeCreate')">
          <!--closeCreate方法定义在chattemplate组件中-->
          取消
        </button>
        <button class="ok-change-button" @click="sureRename">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        templateName: ''
      }
    },
    methods: {
      sureRename () {
        console.log(this.templateName)
        this.$emit('addTemplate', this.templateName)
  //        将模板名称传值到父组件
        this.$emit('closeCreate')
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }
  .create-container {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    background-color: rgba(51, 51, 51, .5);
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .contain {
    z-index: 101;
    display: table-cell;
    vertical-align: middle;
    margin:0 auto;
    width: 360px;
    height: 160px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #596179;
    background: #FFFFFF;
    border: .5px solid #596179;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  }
  .contain-head {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #596179;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .create-input {
    width: 140px;
    border: none;
    outline: none;
    border-bottom: 1px solid #596179;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
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
    border-right: 1px solid rgba(89,97,121,0.38);
    width: 160px;
    margin-left: 10px;
  }
  .ok-change-button {
    width: 160px;
    padding-right: 50px;
  }
</style>
