<template>
  <div class="sidebar-bottom">
    <div id="menu">
      <ul>
        <li >管理群组</li>
        <li @click="contactDelete()">删除群组</li>
      </ul>
    </div>
    <div class="tab">
      <div class="send-group">
        <!--<Button type="text" size="large">群组发送</Button>-->
        <input class="button-group" type="button" value="群组发送" @click="change('Chatgroup')"/>
      </div>
      <div class="send-template">
        <!--<Button type="text" size="large">模板群发</Button>-->
        <input class="button-group" type="button" value="模板群发" @click="change('Chattemplate')"/>
      </div>
    </div>
    <div class="search">
      <input class="search-input" placeholder="搜索">
    </div>
    <component v-bind:is="currentView"></component>
  </div>

</template>
<script>
  import chatgroup from './chatgroup/chat'
  import chattemplate from './chattemplate/chattemplate'
  export default {
    name: 'app',
    data () {
      return {
        modalDelete: false,
        currentView: 'Chattemplate'
      }
    },
    components: {
      Chatgroup: chatgroup,
      Chattemplate: chattemplate
    },
    mounted: function () {
      document.getElementsByTagName('body')[0].addEventListener('click', function () {
        document.getElementById('menu').style.display = 'none'
      })
    },
    methods: {
      show: function (i, ev) {
        ev = ev || window.event
        var odiv1 = document.getElementById('menu')
        odiv1.style.left = ev.clientX + 'px'
        odiv1.style.top = ev.clientY + 'px'
        odiv1.style.display = 'block'
        this.clickindex = i
      },
      DeleteItems (list, delItem) {
        return list.filter((item) => {
          return item !== delItem
        })
      },
      contactDelete: function () {
        let chats = this.chats
        let clickindex = this.clickindex
        this.chats = this.DeleteItems(chats, clickindex)
        var odiv1 = document.getElementById('menu')
        odiv1.style.display = 'none'
      },
      beginChat: function (i) {
        this.$bus.$emit('chat', i)
      },
      change: function (v) {
        this.currentView = v
      }
    }
  }
</script>

<style scoped>
* {padding: 0;margin: 0;}
ul {list-style: none;}
.sidebar-bottom {
  padding-left: 10px;
}
.list li {
  padding: 3px 0;
  border: none;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 20px;
}
.list li:hover {
  background-color: white;
  color: #000000;
}
#menu {
  position: absolute;
  color: #3c3c3c;
  background: white;
  display: none;
  border-radius: 5px;
}
#menu ul li {
  font-size: 12px;
  line-height: 30px;
  width: 120px;
  padding: 2px 7px;
  border-bottom: 1px solid #292c35;
  cursor: pointer;
}
#menu ul li:hover {
  background-color: #eeeeee;
  border-radius: 5px;
}
.send-group {
  float: left;
  border-right: solid 1px #979797;
  padding-right: 30px;
}

.button-group {
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  color: white;
  font-size: 20px;
}
.send-template {
  padding-left: 30px;
}

.search {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.search-input {
  height: 37px;
  width: 256px;
  background: #49526A;
}
.tab {
  height: 34px;
  color: white;
  display: flex;
  justify-content: center;
}
@media (max-height: 800px), (max-width: 1000px){
    .chat {
      height: 350px;
    }
}
::-webkit-scrollbar{width:6px;height: 6px;
-webkit-border-radius: 50%;}
::-webkit-scrollbar-track{background-color:#9e9fa1;}
::-webkit-scrollbar-thumb{-webkit-border-radius: 3px;background-color: #58595e;}
::-webkit-scrollbar-thumb:hover {background-color:#58595e}

</style>
