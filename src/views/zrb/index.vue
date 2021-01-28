<template>
  <div >
      <button @click="showTiaojian">筛选</button>
      <button @click="allUid">统计uid</button>

      <div class="tiaojian" v-show="tiaojian">
        最小值：<input type="number" v-model="min"/>
        <br/>
        最大值：<input type="number" v-model="max"/>
        <br/>
        <button @click="bySort(1)">递减</button>
        <button @click="bySort(2)">递增</button>
        <br/>
        关键字：<input type="text" v-model="search"/>
        <button @click="bySearch">搜索</button>
        <br/>
        <button @click="reset">还原</button>
        <br/>
      </div>
      
      <div class="tiaojian" v-show="alluid">
        <div v-for="(item, index) in userList" :key="index+'-'+item.earnid"  class="li">
          {{item}}{{index}}
        </div>
      </div>

      <div class="list">
        <div v-for="(item, index) in list" :key="index+'-'+item.earnid"  class="li">
          <div class="button-box">
            <a :href="'http://m.zrb.net/next/task_detail?earnid='+item.earnid+'&iswww=1#index_section'"  target="_blank" class="title">{{index}}：{{ item.title }}</a>
            <a :href="'http://m.zrb.net/home/ciruser?type=0&zrbsign=0&zrbId='+item.uid+'&pinglunType=1#index_section'"  target="_blank" >发布人</a>
          </div>
          <div class="button-box">
            <button @click="finish(index, item.earnid, item.uid, item.money)">完成</button>
            <button @click="del(index,item.earnid)">删除</button>
          </div>
        </div>
      </div>
  </div>
</template>


<script>

export default {
  name: 'insert',
  data () {
    return {
      list: res,
      current:{},
      tiaojian: false,
      alluid: false,
      min: null,
      max: null,
      search: '',
      userList:{}
    }
  },
   methods: {
    showTiaojian(){
      this.tiaojian = !this.tiaojian
    },
    bySort(type){
      this.list = sortByMoney(this.list, this.min, this.max, type)
    },
    bySearch(){
      this.list = search(this.list, this.search)
    },
    reset(){
      this.list = window.res
    },
    del(index, id){
      this.list.splice(index, 1)
      let st = localStorage.getItem('del'); 
      st = JSON.parse(st) || []
      st.push(id)
      localStorage.setItem('del' , JSON.stringify(st));
    },
    finish(index, id, uid, price){
      this.list.splice(index, 1)
      
      let st = localStorage.getItem('finish'); 
      st = JSON.parse(st) || []
      st.push(id)
      localStorage.setItem('finish' , JSON.stringify(st));

      let user = localStorage.getItem('finish_uid'); 
      user = JSON.parse(user) || {}
      if (typeof user[uid] === 'object') {
        user[uid].times = user[uid].times++
        user[uid].price = user[uid].price++
      }else{
        user[uid] = {
          times: 1,
          price: price
        }
      }
      localStorage.setItem('finish_uid' , JSON.stringify(user));
    },
    allUid(){
      this.alluid = !this.alluid
      if (!this.alluid) {
        return
      }
      let user = localStorage.getItem('finish_uid'); 
      user = JSON.parse(user)
      this.userList = user
    }
  }

}
</script>

<style >
body,html{
  margin: 0;
  padding: 0;
}

#app{
  margin:0
}
button{
  margin: 10px;
}
.list{
  margin:10px
}
.li{
  padding-bottom: 4px;
  text-align: left;
  background: powderblue;
  margin-top: 5px;
  border-radius: 5px;

}
.title{
  padding-right: 30px;
  flex:1
}
.tiaojian{
  background: lightgrey;
}
.button-box{
  display: flex;
  justify-content: right;
}
.button-box button{
  flex:1
}
</style>