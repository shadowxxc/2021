<template>
  <div >
      <button @click="cihui">词--</button>
      <button @click="showTiaojian">筛选</button>
      <button @click="guolv">过滤</button>
      <button @click="allUid">统计uid</button>
      <button @click="clear">清空缓存</button>

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
        <button @click="byUser1">用户</button>
        <br/>
      </div>
      
      <div class="tiaojian" v-show="alluid">
        <div v-for="(item, index) in userList" :key="index+'-'+item.earnid"  class="li">
          {{index}}
        </div>
        <div v-for="(item, index) in userList" :key="index+'-'+item.earnid"  class="li">
          {{index}}：次数{{item.times}},￥{{item.price}}
        </div>
      </div>

      <div class="tiaojian" v-show="cibox">
        <button @click="reci(item)" v-for="(item, index) in ciList" :key="index">
          {{item}}
        </button>
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
      ciList: word,
      current:{},
      tiaojian: false,
      cibox: false,
      alluid: false,
      min: null,
      max: null,
      search: '',
      userList:{},
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
    },
    guolv(){
      this.list = filter(this.list)
    },
    clear(){
       localStorage.removeItem('del')
       localStorage.removeItem('finish')
       localStorage.removeItem('finish_uid')
    },
    cihui(){
      this.cibox = !this.cibox
      // this.list = searchAllWord(this.list)
    },
    reci(data){
      this.list = search(this.list, data)
    },
    byUser1(){
      this.list = byUser(this.list)
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