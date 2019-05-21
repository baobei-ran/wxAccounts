
// 创建 filter.js 文件
// 全局时间过滤器
import Vue from 'vue'

Vue.filter('filterTime', function(time) {
    if (!time) {
        return;
    }
    var date = new Date(time*1000)
    var dateNumFun = (num) => num < 10 ? '0' + num : num 
           var Y = date.getFullYear(),
               M = dateNumFun(date.getMonth() + 1),
               D = dateNumFun(date.getDate()),
               h = dateNumFun(date.getHours()),
               m = dateNumFun(date.getMinutes()),
               s = dateNumFun(date.getSeconds())
    return Y+'-'+M+'-'+D +' '+h+':'+m+':'+s
})


Vue.filter('money', function(val) {
    val = val.toString().replace(/\$|\,/g,'');
    if(isNaN(val)) {
      val = "0";  
    } 
    let sign = (val == (val = Math.abs(val)));
    val = Math.floor(val*100+0.50000000001);
    let cents = val%100;
    val = Math.floor(val/100).toString();
    if(cents<10) {
       cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
        val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
    }

    return (((sign)?'':'-') + val + '.' + cents);   // 过滤金钱只保留两位小数
})
