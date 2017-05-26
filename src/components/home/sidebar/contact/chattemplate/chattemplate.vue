<template>
  <div class="chat">
    <ul>
      <li v-for="(chat,index) in chats" @click="addclass()">{{chat.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        chats: [
          {
            name: '1'
          },
          {
            name: '2'
          },
          {
            name: '3'
          },
          {
            name: 'Chris'
          },
          {
            name: 'Bill'
          },
          {
            name: 'Tracy'
          },
          {
            name: 'Chris'
          },
          {
            name: 'Bill'
          },
          {
            name: 'Tracy'
          },
          {
            name: 'Chris'
          },
          {
            name: 'Bill'
          },
          {
            name: 'Tracy'
          },
          {
            name: 'Chris'
          },
          {
            name: 'Bill'
          },
          {
            name: 'Tracy'
          },
          {
            name: 'Chris'
          },
          {
            name: 'Bill'
          },
          {
            name: 'Tracy'
          },
          {
            name: 'Chris'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  * {padding: 0;margin: 0;}
  ul {list-style: none;}
  .fl {
    float: left;
  }
  .chat {
    clear:both;
    overflow: auto;
    overflow-x: hidden;
    height: 647px;
  }
  @media (max-height: 800px), (max-width: 1000px){
    .chat {
      height: 340px;
    }
  }
  ul li {
    padding: 18px 18px;
    border-bottom: 1px solid #292c35;
    cursor: pointer;
  }
  ::-webkit-scrollbar{width:6px;height: 6px;
    -webkit-border-radius: 50%;}
  ::-webkit-scrollbar-track{background-color:#9e9fa1;}
  ::-webkit-scrollbar-thumb{-webkit-border-radius: 3px;background-color: #58595e;}
  ::-webkit-scrollbar-thumb:hover {background-color:#58595e}

</style>
