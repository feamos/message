<template>
  <div class="app-container">
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import sidebar from './components/home/sidebar/sidebar'
  import rightContent from './components/home/content/content'
  import login from './components/user/login'
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
      rightContent,
      login
    }

  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .app-container {
    background-image: url("../src/images/background_vague.png");
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
    overflow: scroll;
  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 768px;
    min-height: 600px;
  }

  @media (max-height: 800px), (max-width: 1000px) {
    #app {
      padding-top: 10px;
      height: 100%;
    }

  }

</style>
