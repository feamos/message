<template>
  <div>
    <div class="main">
      <div class="left fl">
        <sidebar :list='list'></sidebar>
      </div>
      <div class="right fl">
        <rightcontent></rightcontent>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import sidebar from './sidebar/sidebar'
  import rightcontent from './content/content'
  export default {
    name: 'app',
    data () {
      return {
        login: true,
        list: false
      }
    },
    components: {
      sidebar,
      rightcontent
    }

  }
</script>

<style scoped>
  *{padding: 0;margin: 0;}
  .fl {
    float: left;
  }
  br {clear:both;}

  .main {
    max-width: 1000px;
    min-width: 800px;
    height: 100%;
    margin: 0 auto;
  }
  .right {
    width: 720px;
    height: 767px;
    background-color: #eeeeee;
  }
  @media (max-height: 800px), (max-width: 1000px){
    #app {
      padding-top: 10px;
      height: 100%;
    }
    .right {
      height:617px;
    }
  }
  body {
    background-image: url("../../images/background_vague.png");
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
</style>
