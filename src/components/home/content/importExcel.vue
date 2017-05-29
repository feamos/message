<template>
  <div class="change-pass" @click="$emit('cancel')">
    <div class="contain" @click.stop="">
      <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
      </Upload>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        upload: false,
        pass: '',
        ensurepass: ''
      }
    },
    updated: function () {
      this.$bus.$emit('quickDel', this.checkBox)
    },
    methods: {
      cancel: function () {
        alert('fjiso')
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
  }

  .contain {
    z-index: 9999;
    display: flex;
    vertical-align: middle;
    padding: 20px 20px 0px 20px;
    position: fixed;
    margin:0 auto;
    width: 320px;
    height: 160px;
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
  .contain p {
    text-align: center;
    padding-bottom: 10px;
  }
  .contain .select {
    text-align: right;
  }
  .select label {
    font-size: 10px;
    vertical-align: middle;
  }
  .contain ul {
    padding: 20px 0px 0 0px;
    letter-spacing: -0.5em;
  }
  .contain ul li {
    width: 49%;
    text-align: center;
    display: inline-block;
    letter-spacing: normal;
  }
  .contain ul span {

    display: inline-block;
    border-right: 2px solid rgba(89,97,121,0.38);
  }
  .contain ul li:hover {
    background: #fff;
    color: #000;
    cursor: pointer;
  }
</style>
