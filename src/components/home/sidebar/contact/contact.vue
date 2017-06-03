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
        <input class="button-group"
               :class="{active: isSelect}" type="button" value="群组发送" @click="changeChatgroup"/>
      </div>
      <div class="send-template">
        <input class="button-group"
               :class="{active: isSelected}" type="button" value="模板群发" @click="changeChattemplate"/>
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
        hidFlag: true,
        modalDelete: false,
        currentView: 'Chatgroup',
        isSelect: false,
        isSelected: false
      }
    },
    components: {
      Chatgroup: chatgroup,
      Chattemplate: chattemplate
    },
    methods: {
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
      changeChatgroup () {
        this.currentView = 'Chatgroup'
        this.isSelect = true
        this.isSelected = false
      },
      changeChattemplate () {
        this.currentView = 'Chattemplate'
        this.isSelected = true
        this.isSelect = false
      }
    }
  }
</script>

<style scoped>
* {padding: 0;margin: 0;}
ul {list-style: none;}
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
.sidebar-bottom {
  position: relative;
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
.active {
  color: #CDE7E9;
}
.button-group:hover {
  color: #CDE7E9;
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
  border: 1px solid #d6d6d6;
  outline: none;
  padding: 3px 0 3px 5px;
  line-height: 37px;
  font-size: 18px;
  color: #fff;
  border-radius: 5px;
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
