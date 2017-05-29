<template>
  <div class="change-pass" @click="$emit('closeNewMsg')">
    <!--在遮罩层定义点击事件，关闭模态框-->
    <div class="contain">
      <div class="temp-head">
        <button class="rename" @click.stop="renameTemplate">重命名</button>
        <input class="rename-input" v-if="renameTemp" @click.stop=""
               type="text" placeholder="修改模板" />
        <!--修饰符.stop阻止事件冒泡-->
        <span v-else>{{selectTemplate}}</span>
        <button class="delete-tmp" @click.stop="deleteTemp">删除</button>
      </div>
      <ul class="template-ul">
        <li v-for="(tempName, index) in tempNames" class="template-li"
            :class="{ active: tempName.isActive }"
            @click.stop="selectShowTemplate(tempName.templa, index)">{{tempName.templa}}
        </li>
      </ul>
      <div class="new-temp-container">
        <button class="new-temp-button" @click.stop="$emit('createTemplate')">新建模板</button>
        <!--新建模板的事件定义在父组件chattemplate中-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pass: '',
        ensurepass: '',
        renameTemp: false,
        createTemp: false,
        selectTemplate: '某模板',
        selectTempName: ''
      }
    },
    props: ['tempNames'],
    methods: {
      deleteTemp (index) {
        this.tempNames.splice(index, 1)
      },
      renameTemplate () {
        this.renameTemp = true
      },
      selectShowTemplate (tempName, index) {
        this.selectTemplate = tempName
        this.$emit('selectLi', index)
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
    height: 260px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #596179;
    background: #FFFFFF;
    border: .5px solid #596179;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  }

  .rename-input {
    width: 54px;
    border: none;
    outline: none;
    line-height: 47px;
    font-size: 14px;
    color: #BDBDBD;
  }

  .temp-head {
    display: flex;
    justify-content: space-between;
    height: 47px;
    line-height: 47px;
    border-bottom: .5px solid #596179;
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
    height: 150px;
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

  .new-temp-container {
    text-align: center;
    height: 49px;
    line-height: 49px;
    margin-top: 20px;
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

</style>
