<template>
  <div>
    <div class="main">
      <div class="left fl">
        <sidebar :list='list' @Personal="PersonalShow"></sidebar>
      </div>
      <div class="right fl">
        <personal v-if="showPerson"></personal>
        <rightcontent v-else></rightcontent>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import sidebar from './sidebar/sidebar'
  import rightcontent from './content/content'
  import personal from './personCenter/personCenter.vue'
  import API from '@/common/API/api'
  export default {
    name: 'app',
    data () {
      return {
        login: true,
        list: false,
        showPerson: false
      }
    },
    components: {
      sidebar,
      rightcontent,
      personal
    },
    methods: {
      PersonalShow () {
        console.log('1')
        fetch(API.info, {
          method: 'GET',
          headers: {
            'Content-Type': 'aplication/json',
            'token': localStorage.getItem('token')
          }
        }).then((res) => res.json())
          .then((json) => {
            console.log(json)
            if (json.code === 0) {
              localStorage.setItem('mobile', json.data.user.mobile)
              console.log('2')
            }
          })
        this.showPerson = true
      }
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
    width: 1024px;
    margin: 0 auto;
    background: white;
    border: 1px solid #979797;
    border-radius: 5px;
  }
  .left {
    width: 320px;
    background: #596179;
  }
  .right {
    width: 700px;
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
</style>
