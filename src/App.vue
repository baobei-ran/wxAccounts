<template>
  <div id="app">
      <keep-alive>
          <router-view v-if='$route.meta.keeepAlive'></router-view>
      </keep-alive>
      <router-view v-if='!$route.meta.keeepAlive'></router-view>
      <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
@function rem($px) {
  @return $px / 50 + rem;
}


html, body, #app {
  width:100%;
  height: 100%;
  display: -webkit-box; 
  display: -moz-box; 
  display: -webkit-flex; 
  display: -moz-flex; 
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
#paa {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  -webkit-overflow-scrolling: touch;
  -moz-overflow-scrolling: touch;
  -ms-flex-overflow-scrolling: touch;
}
select {
  background: #fff;
}
// 去掉滚动条
::-webkit-scrollbar{width:0;height:1px}
::-webkit-scrollbar-thumb{border-radius:5px;-webkit-box-shadow:inset 0 0 5px rgba(0,0,0,.2);background:rgba(0,0,0,.2)}
button:active{
  -webkit-tap-highlight-color: transparent;
}
</style>
