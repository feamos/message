<template>
  <div>
    <div id="menu">
      <ul>
        <li >管理群组</li>
        <li @click="contactDelete()">删除群组</li>
      </ul>
    </div>
    <div class="chat" id="chat1">
        <ul class="list">
            <li v-for="(chat,index) in chats" @contextmenu.prevent="show(chat)"
                @click="beginChat(chat)">{{chat.name+index}}</li>
        </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      modalDelete: false,
      chats: [
        {
          name: 'Tracy',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['1']
        },
        {
          name: 'Chris',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['2']
        },
        {
          name: 'Bill',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['3']
        },
        {
          name: 'Tracy',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['4']
        },
        {
          name: 'Chris',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['Tracy']
        },
        {
          name: 'Bill',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['Tracy']
        },
        {
          name: 'Tracy',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['Tracy']
        },
        {
          name: 'Chris',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['Tracy']
        },
        {
          name: 'Bill',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['Tracy']
        },
        {
          name: 'Tracy',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['Tracy']
        },
        {
          name: 'Chris',
          mobiles: ['18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130',
            '18716028979',
            '13572300560',
            '15229534130'
          ],
          messages: ['Tracy']
        }
      ]
    }
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
.list li {
    /*padding: 18px 0px;*/
    /*border-bottom: 1px solid #292c35;*/
    /*text-align:center;*/
    /*cursor: pointer;*/
  padding: 12px 0;
  border-bottom: 1px solid #292C33;
  cursor: pointer;
  transition: background-color .1s;
  list-style-type: none;
  /*background-color: #2e3238;*/
  line-height: 30px;
  display: inline-block;
  /*margin: 0 0 0 15px;*/
  width: 100%;
  text-align: center;
}
.list li:hover {
  background-color: #6f7073;
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
@media (max-height: 800px), (max-width: 1000px){
    .chat {
      height: 495px;
    }
}
::-webkit-scrollbar{width:6px;height: 6px;
-webkit-border-radius: 50%;}
::-webkit-scrollbar-track{background-color:#9e9fa1;}
::-webkit-scrollbar-thumb{-webkit-border-radius: 3px;background-color: #58595e;}
::-webkit-scrollbar-thumb:hover {background-color:#58595e}

</style>
