<template>
    <div class="rightcontent">
        <div class="head">
            <div class="title">
                <span href="javascript:;" @click="list1 = !list1">{{ chat.name }}<img src="./title.png" height="10" width="10" alt=""></span>
                <div class="mobile" v-if="list1">
                  <img src="./add.png" alt=""><li v-for="mobile in chat.mobiles">{{mobile}}</li>
                </div>
            </div>
        </div>
        <div class="middle">
          <div class="message-wrap" v-for="message in chat.messages">
            <div class="midd-message">
              {{message}}
            </div>
            <br class="clfl">
          </div>
        </div>
        <div class="bottom">
            <div>
                <textarea id="editArea" v-model="message"></textarea>
            </div>
            <div class="send">
                <span @click="checkMessage(chat.messages)">发送</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      list1: false,
      message: '',
      chat: {
        type: Object,
        name: '发起聊天',
        mobiles: [],
        messages: []
      }
    }
  },
  mounted: function () {
    this.$bus.on('chat', (msg) => {
      this.chat = msg
    })
  },
  methods: {
    checkMessage (msg) {
      if (this.message && this.chat.mobiles[0] > 0) {
        this.sendMessage(msg)
      }
    },
    sendMessage (msg) {
      msg.push(this.message)
      this.message = ''
    }
  }
}
</script>

<style scoped>
 .rightcontent {
    display: block;
    color: #000000;
    height: 617px;
 }
 .clfl {
   clear:both;
 }
 .head {
    position: relative;
    text-align: center;
    margin: 0 19px;
    padding: 10px 0px;
    line-height: 30px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid #d6d6d6;
 }
 .head span {
    cursor: pointer;
 }
 .head img {
    margin-left: 3px;
 }
 .head .mobile {
   padding:10px 20px 0 20px;
   position: absolute;
   top:50px;
 }
 .head .mobile img {
   float: left;
   cursor: pointer;
 }
 .head .mobile li{
   float: left;
   list-style: none;
   line-height: 30px;
   padding:2px 5px;
   background: #fff;
   font-size:12px;
   border:1px solid #d6d6d6;
   border-radius: 5px;
   margin-left: 5px;
   margin-bottom: 5px;
 }
 .middle {
    height: 516px;
    border-bottom: 1px solid #d6d6d6;
    padding: 0 10px;
    padding-top: 20px;
   overflow: auto;
 }
 .message-wrap {
   padding: 6px 5px;
   width: 100%;
   right: 0;
   min-height: 50px;
   margin: 10px 0;
 }
 .middle .midd-message {
   /*max-width:75%;*/
   /*margin-right: 5%;*/
   /*border:1px solid #d6d6d6;*/
   /*padding:7px 7px;*/
   /*border-radius: 5px;*/
   /*font-size: 14px;*/
   /*word-wrap: break-word;*/
   /*word-break: normal;*/
   /*float: right;*/
   display: inline-block;
   /*position: relative;*/
   padding: 0 10px;
   max-width: calc(100% - 70px);
   line-height: 2.5;
   font-size: 12px;
   text-align: left;
   word-break: break-all;
   /*自动换行，允许在单词内换行*/
   background-color: #fafafa;
   border-radius: 4px;
   float: right;
   margin-right: 20px;
 }
 .bottom {
    width: 720px;
    height: 181px;
 }
 #editArea {
    resize: none;
    height: 104px;
    width: 700px;
    padding: 10px 10px 10px 10px;
    font-size: 14px;
    color: #333;
    overflow: auto;
    background-color: #eeeeee;
    border: 0;
    overflow-y:auto;
    overflow-x:hidden;
    white-space: pre-wrap;
    word-break: normal;
    letter-spacing: 1px;
 }
 textarea:focus {
    outline: none;
 }
 .send {
    text-align:right;
    padding-right: 20px;
 }
 .send span {
    display: inline-block;
    width: 90px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #d6d6d6;
    margin-top: 5px;
    background: #fff;
    border-radius: 5px;
 }
 .send span:hover {
    background: #eeeeee;
    cursor: pointer;
 }
 @media (max-height: 800px), (max-width: 1000px){
    .rightcontent {
        height: 617px;
    }
    .middle {
        height: 396px;
        /*border-bottom: 1px solid #d6d6d6;   */
    }
    #editArea {
        height: 80px;
    }
}
</style>
