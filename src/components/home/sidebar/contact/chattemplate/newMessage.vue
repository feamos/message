<template>
  <div class="change-pass" @click="$emit('closeNewMsg')">
    <!--在遮罩层定义点击事件，关闭模态框-->
    <div class="contain" @click.stop="">
      <!--修饰符.stop阻止事件冒泡-->
      <ul class="template-ul" @click.stop="">
        <li v-for="(tempName, index) in tempNames" class="template-li"
            :class="{ active: tempName.isActive }"
            @click.stop="selectShowTemplate(tempName.templa, index, tempName)"
            @mouseenter="$emit('hoverIntemplate', index)"
            @mouseleave="$emit('hoverOuttemplate', index)">
          <transition name="fade">
            <button v-show="tempName.renameButton" class="rename"
                    @click.stop="$emit('renameInput',index)">重命名</button>
          </transition>
          <input class="rename-input" v-if="tempName.renameTemp" @click.stop=""
                 type="text" placeholder="修改"
                 v-model="changeTemplateName"
                 @keyup.enter="changeTemplate(index)"/>
          <!--绑定回车事件修改模板名称-->
          <span v-else>{{tempName.templa}}</span>
          <transition name="fade">
            <button v-show="tempName.renameButton" class="delete-tmp"
                    @click.stop="deleteTemp(index)">删除</button>
          </transition>
          <div class="sure-delete-temp" v-if="showDeleteTemp" @click.stop="">
            <!--删除模板确定模态框显示-->
            <div class="sure-delete-contain">
              <div class="warn-text-contain">
                <span class="warn-text">确定删除该模板吗？</span>
              </div>
              <Checkbox class="no-mention">以后不再提示</Checkbox>
              <div class="buttons">
                <button class="cancel-change-button" @click="showDeleteTemp=false">
                  取消
                </button>
                <button class="ok-change-button" @click="sureDelete(item)">确定</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="new-temp-container">
        <button class="new-temp-button" @click.stop="$emit('createTemplate')">新建模板</button>
        <!--新建模板的事件定义在父组件chattemplate中-->
      </div>
    </div>
    <addtemp v-if="addTemp" @confirmAdd="$emit('addTemplate');addTemp = false" @cancelAdd="addTemp = false"></addtemp>
  </div>
</template>

<script>
  import addtemp from './addtemp.vue'
  export default {
    data () {
      return {
        pass: '',
        ensurepass: '',
        addTemp: false,
        renameTemp: false,
        createTemp: false,
        showDeleteTemp: false,
        item: Number,
//        显示二次确定删除模板
        changeTemplateName: ''
//        修改模板名称
      }
    },
    components: {
      addtemp
    },
    props: ['tempNames'],
    methods: {
//      删除弹出二次确定框
      deleteTemp (index) {
        this.showDeleteTemp = true
        this.item = index
      },
      sureDelete (index) {
        this.showDeleteTemp = false
        this.$emit('deleteTempName', index)
      },
      selectShowTemplate (tempName, index, temp) {
        this.selectTemplate = tempName
        this.$emit('selectLi', index)
        this.sendTemp(temp)
      },
      changeTemplate (index) {
        console.log(index)
        this.$emit('changeTempName', this.changeTemplateName, index)
      },
      //      修改模板名称
      sendTemp (i) {
        this.$bus.$emit('sendTemp', i)
        this.addTemp = true
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
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    display: flex;
    background-color: rgba(51, 51, 51, .5);
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .contain {
    z-index: 99;
    display: table-cell;
    vertical-align: middle;
    position: absolute;
    bottom: 10%;
    left: 30%;
    margin: 0 auto;
    width: 200px;
    height: 250px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #596179;
    background: #FFFFFF;
    border: .5px solid #596179;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  }

  .sure-delete-temp {
    z-index: 120;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(51, 51, 51, .2);
    justify-content: center;
    align-items: center;
  }
  .sure-delete-contain {
    position: fixed;
    z-index: 121;
    width: 320px;
    height: 160px;
    background: #FFFFFF;
    border: 1px solid #979797;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    border-radius: 10px;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
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
  .rename-input {
    width: 74px;
    font-size: 14px;
    height: 37px;
    border: none;
    border-bottom: solid 1px #596179;
    outline: none;
    border-radius: 5px;
  }

  .rename, .delete-tmp {
    font-size: 14px;
    color: #BDBDBD;
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
    font-family: PingFangSC-Regular;
  }

  .rename:hover, .delete-tmp:hover{
    color: #CDE7E9;
  }

  .template-ul {
    overflow: auto;
    height: 200px;
  }

  .template-li, .template-li:link {
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #596179;
    height: 47px;
    line-height: 47px;
    border-bottom: 1px solid #596179;
    cursor: pointer;
  }

  .template-li:hover, .template-li:target, .active {
    background: #CDE7E9;
  }
  .active {
    background: #A9CDCF;
  }

  .new-temp-container {
    text-align: center;
    height: 49px;
    line-height: 49px;
    border-top: 1px solid #D8D8D8;
  }

  .new-temp-button {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: rgba(89, 97, 121, 0.58);
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .warn-text-contain {
    margin-top: 10px;
  }
  .warn-text {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #596179;
    position: relative;
  }
  .no-mention {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #596179;
  }
  .warn-text .no-mention {
    position: absolute;
    margin-left: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
