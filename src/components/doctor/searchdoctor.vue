<template>
    <!-- 查找更多医生 -->
    <div class="doctor dis_f flex_d">
        <div class="header_box">
            <!-- <div class="header">
                <img @click='Return' v-if='fanhui' src="../../common/img/icon_fh.png" alt="">
                <span>更多医生</span>
            </div> -->
            <div class="header_search dis_f flex_i dis_sb">
                    <!-- <mt-search
                        v-model="searchVal"
                        cancel-text=""
                        @keyup.enter.native="searchs" 
                        placeholder="搜索医生、科室、疾病">
                    </mt-search> -->
                <input class="search_txt flex1" type="search" v-model="searchVal" @keyup.enter="searchs"   placeholder="搜索医生、科室、疾病">
                <label for="" @click='searchs'>搜索</label>
            </div>
                <!-- <div class="sortList">
                    <ul id='tabul' class="dis_f dis_sb flex_i">
                        <li @click='tab(1)' :class="{'action':num == 1}">北京市<img src='../../common/img/icon_gd.png' alt='' v-show='num != 1' /><img v-show='num == 1' src="../../common/img/icon_sxsq.png" alt="" /></li>
                        <li @click='tab(2)' :class="{'action':num == 2}">科室<img src='../../common/img/icon_gd.png' alt='' v-show='num != 2'/><img v-show='num == 2' src="../../common/img/icon_sxsq.png" alt=""/></li>
                        <li @click='tab(3)' :class="{'action':num == 3}">排序<img src='../../common/img/icon_gd.png' alt='' v-show='num != 3'/><img v-show='num == 3' src="../../common/img/icon_sxsq.png" alt=""/></li>
                    </ul>
                    <div class="tabnum" v-if='num == 1'>
                         <div class="tablist">
                             <p v-for='val in shi' :key='val.id' @click='handtabClick'>{{ val.name }}</p>
                         </div>
                        <div>
                            asdhsadhjsk
                        </div>
                    </div>
                    <div class="tabnum" v-if='num == 2'>
                        <div class="tablist">
                             <p v-for='val in shi' :key='val.id' @click='handtabClick'>{{ val.name }}</p>
                         </div>
                        <div></div>
                    </div>
                    <div class="tabnum" v-if='num == 3'>
                        <div class="tablist">
                             <p v-for='val in shi' :key='val.id' @click='handtabClick'>{{ val.name }}</p>
                         </div>
                        <div></div>
                    </div>
                </div> -->
        </div>
        
    <div class="section flex1" ref='scroll' >
        <div class="section_box"  >
            <div class="kong" v-if='!datalist.length'>
                <img src="../../common/img/pic_zwys.png" alt="">
                <p>无数据</p>
            </div>
        
            <div class="doctor_list" v-if='datalist.length'>
                 <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    <div class="list" v-for='(val,i) in datalist' :key='i' >
                        <ul @click='Clickdetail(val.did, i)'>
                            <li>
                                <img :src="$http.baseURL+val.picture" alt="">
                                <dl>
                                    <dt>
                                        <span>{{ val.true_name }}</span>
                                        <b>{{ val.gname }} | {{ val.department_name }}</b>
                                    </dt>
                                    <dd>
                                        {{ val.hospital_name }}
                                    </dd>
                                </dl>
                            </li>
                            <li class="dw_r" v-if='i == 0'></li>
                            <!-- <li class="juli" v-if='i !== 0'>{{ val.distince }}km</li> -->
                            <li class="beadeptat ">擅长：<span> {{ val.title }}</span></li>
                        </ul>
                        <dl class="dls dis_f flex_i dis_sb">
                            <dt>
                                处方数量 <span>{{ val.recount }}</span>
                            </dt>
                            <dt>
                                患者数量 <span>{{ val.fw_doc }}</span>
                            </dt>
                            <dd>
                                平均回复时长 <span>{{ val.reversion_rate }}</span> 
                            </dd>
                        </dl>
                    </div>
                <!-- <div class="drop-up" v-if="!dropup">—— 加载中 ——</div> -->
                <div class="drop-up" v-if="dropup">—— 没有数据了 ——</div>
            </div>
               
            </div>
        </div>
            
    </div>
        <div style='width:100%;height: 200px; display:none;' id="aMap"></div>
    </div>
</template>

<script>
// 节流函数
const delay = (function() {
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export default {
    data () {
        return {
            Visible: false,
            searchVal: '',      // 搜索内容
            datalist: [],    // 数据列表
            num: 0,             // 面包屑
            shi: [
                {id: 1, name: '默认排序'},{id: 2, name: '按咨询量从高到低'},{id: 3, name: '按回复率从高到低'}
            ],
            page: 1,
            limit: 15,
            lon: '116.297176',  // 经度
            lat: '39.825233',    // 纬度
            loading: false,
            allLoaded: false,
            bottomStatus: '',
            fanhui: true,           // 返回按钮
            dropDown: false,        // 下拉
            dropup: false,          //  上拉
            busy: false,
            timerId: ''            // 滚动时间
        }
    },
    
     watch: {
    //watch title change
        searchVal() {
            delay(() => {
                console.log('test')
                this.searchs();
            }, 500);
        },
    },
   
     created () {
        var urldata = this.$route.query
        if (urldata.uid) {
            this.fanhui = false
            this.$cookie.set('userLogins', urldata.uid, 365)
            var self = this;
            self.$http.post('/mobile/wxauth/is_auth', { uid: urldata.uid}).then(res => {
                console.log(res)
                if (res.code == 1) {
                    if (res.auth == 3) {
                        self.$router.replace('/phone?uid='+urldata.uid)
                        return;
                    } 
                    if (res.auth == 2 ) {
                        self.$router.replace('/authentication')
                    }
                }
            })
        } else {
            this.fanhui = true
        }
        //  var uids = this.$cookie.get('userLogins') 
        //     if (!uids || urldata.uid) {
                
        //     }
        // if (urldata) {
        //     if (urldata.auth == 0 || urldata.auth == 3) {
        //         this.$router.replace('/phone?uid='+urldata.uid+"&auth="+ urldata.auth)
        //     } else if (urldata.auth == 2) {
        //         this.$router.replace('/authentication')
        //     }
        // }
            
         var self = this;
         var map, geolocation;
        //加载地图，调用浏览器定位服务   高德地图
        map = new AMap.Map('container', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
            　　　　enableHighAccuracy: true, //是否使用高精度定位，默认:true
            　　　　timeout: 20000, //超过10秒后停止定位，默认：无穷大
            　　　　buttonPosition: 'RB'
            });
            geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', function onComplete(data) {
                var getLongitude = data.position.getLng();
                var getLatitude = data.position.getLat();
                // alert(getLongitude+'---'+getLatitude+'我的天') //弹出获得的经纬度
                self.lon = getLongitude
                self.lat = getLatitude
            }); //返回定位信息
             AMap.event.addListener(geolocation, 'error', function onError(err) {  //返回定位出错信息
                    console.log(err)
             }); 
        });


        
        //  onComplete=function(){},onError=function(){}
         var getLocation = function (){
                var map = new AMap.Map('aMap', {
                    resizeEnable: true,
                    zoom: 16
                    }),
                    geolocation = null,
                    geocoder = null
                // 加载地理位置编码插件
                AMap.service('AMap.Geocoder', function() { //回调函数
                    //实例化Geocoder
                    geocoder = new AMap.Geocoder({
                    city: "010" //城市，默认：“全国”
                    });
                    //TODO: 使用geocoder 对象完成相关功能
                });
                // 加载定位插件
                map.plugin('AMap.Geolocation', function() {
                    // 初始化定位插件
                    geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 1000000, //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, //定位结果缓存0毫秒，默认：0
                    convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true, //显示定位按钮，默认：true
                    buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    // 把定位插件加入地图实例
                    map.addControl(geolocation);
                    // 调用定位
                    geolocation.getCurrentPosition();
                    // 添加地图全局定位事件
                    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
                        function onComplete(data) {     // 获取成功
                            // data是具体的定位信息
                            var latitude = data.position.getLat() // 纬度
                            var longitude = data.position.getLng() // 经度
                            console.log('latitude', latitude, 'longitude', longitude)
                            self.lon = longitude
                            self.lat = latitude
                        }
                
                        function onError(data) {    // 获取失败
                            console.log(data)
                        }
                    })

                    
                
            }
       getLocation()    // 执行
    
        
    },
    mounted () {
       this.initdata()
       this.getLocations()
    },
    activated () {
        this.$refs.scroll.scrollTop = this.$route.meta.y 
        var _this = this;
        this.$refs.scroll.addEventListener('scroll',_this.justifyPos,true )
    },
    deactivated () {
        // 当组件销毁的时候，移除滚动行为监听, 清空定时器；
        // 该方法是绑定到 window 身上，即使跳转到其他组件，仍然会监听页面的滚动行为
        var _this = this;
        this.$refs.scroll.removeEventListener('scroll', _this.justifyPos, true)
        clearTimeout(this.timerId)
    },
    methods: {
       justifyPos (e) {         // 获取滚动的位置信息
                    // 节流；
            if (this.timerId) clearTimeout(this.timerId)
            this.timerId = setTimeout(() => {
                // 获取页面滚动距离之后设置给当前路由的 元信息
                // console.log(e.target.scrollTop)
                var _this = this;
                this.$route.meta.y = e.target.scrollTop
            }, 300)
        },
        
         getLocations() {
            const that = this;
            AMap.plugin("AMap.Geolocation", function() {
                var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 100000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: "RB"
                });

                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, "complete", onComplete);
                AMap.event.addListener(geolocation, "error", onError);

                function onComplete(data) {
                // data是具体的定位信息
                console.log(data);
                    var latitude = data.position.getLat() // 纬度
                    var longitude = data.position.getLng() // 经度
                    console.log('latitude', latitude, 'longitude', longitude)
                    that.lon = longitude
                    that.lat = latitude
                }

                function onError(data) {
                // 定位出错
                console.log(data);
                // 失败之后调用这个方法，使用IP定位获取当前城市信息
                that.getLngLatLocation();
                }
            });
    },
    // IP定位获取当前城市信息
    getLngLatLocation() {
        var that = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log(result)
            var ar = result.rectangle.split(';')[0];
            var ar2 = ar.split(',')
            that.lon = ar2[0]
            that.lat = ar2[1]
            
          }
        });
      });
      
    },
  
        loadMore: function() {
            this.busy = true
            this.page += 1
            this.initdata()
        },
        searchs () {
            // 搜索
            console.log(this.lon, this.lat)
            this.$refs.scroll.scrollTop = 0 // 搜索的时候滚动的top值为零
            var self = this;
             var obj = {page: 1, num: 15, lon: this.lon,lat: this.lat,  name: this.searchVal}
            self.$http.post('/mobile/Wxorder/doc_more', obj).then(res => {
                console.log(res)
                    self.busy = false
                if (res.code == 1) {
                     res.data.map(val => {
                        if (val.reversion_rate != 0) {
                            var tis = Math.round(val.reversion_rate / 60 / 60)
                            console.log(tis)
                            if (tis > 0) {
                                val.reversion_rate = '小于'+ tis + '小时'
                                return;
                            }
                            var ti = Math.round(val.reversion_rate / 60)
                            console.log(ti)
                            if (ti>0) {
                                val.reversion_rate = '小于'+ ti + '分钟'
                            }
                            
                            
                        } else {
                            val.reversion_rate = val.reversion_rate+'min'
                        }
                        
                    })
                    self.datalist = res.data
                } else {
                   self.datalist = []
                }
            })
        },
        initdata () {
            var self = this;
            if (this.dropup) {
                return
            }
            var obj = {page: this.page, num: this.limit, lon: this.lon,lat: this.lat,  name: this.searchVal}
            self.$http.post('/mobile/Wxorder/doc_more', obj).then(res => {
                console.log(res)
                    self.busy = false
                if (res.code == 1) {
                    res.data.map(val => {
                        if (val.reversion_rate != 0) {
                            var tis = new Date(val.reversion_rate*1000).getHours()

                            var ti = new Date(val.reversion_rate*1000).getMinutes()
                            console.log(ti)
                        }else {
                            val.reversion_rate = val.reversion_rate+'min'
                        }
                        
                    })
                   if (self.page <= 1) {
                        self.datalist = res.data
                   } else if (self.page > 1) {
                       var list = res.data
                      self.datalist = self.datalist.concat(list)
                        if (self.datalist.length == res.counts) {
                            this.dropup = true
                            this.busy = true
                        }
                   } 
                } else {
                   if (self.datalist.length > 9) {
                       this.dropup = true
                   }
                   this.busy = true
                }
            })
        },
        Return () {                                     // 返回
            this.$router.back()
        },
        tab(n) {                                        // 筛选 
            if (this.num == n) {
                this.num = 0
            } else {
                this.num = n
            }
            
        },
        Clickdetail (id, i) {                // 单机对应医生进入详情
            console.log(id, i)
            this.$router.push({name: 'doctordetail', params:{id : id, index: i}})
        },
        handtabClick () {
            this.num = 0
        },
        
        
    }
}
</script>

<style lang='scss' >
@function rem($px) {
    @return $px / 50 + rem;
}
  
            .mint-searchbar-core {
                font-size: rem(14);
                line-height: rem(28);
                height: rem(28);
            }
    .mint-searchbar-core::-webkit-input-placeholder {
                line-height: rem(20);
                font-size: rem(13);
                margin-bottom: rem(5);
        }
            
    .mint-searchbar-core:-moz-placeholder { 
        font-size: rem(13);
        line-height: rem(20);
        margin-bottom: rem(5);
    }
    .mint-searchbar-core::-moz-placeholder { 
        font-size: rem(13);
        line-height: rem(20);
        margin-bottom: rem(5);
    }
    .mint-searchbar-core:-ms-input-placeholder {
        font-size: rem(13);
        line-height: rem(20);
        margin-bottom: rem(5);
    }
</style>
<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.doctor {
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: rem(14);
    .header_box {
        width: 100%;
        .header {
            display: -webkit-flex;
            display: flex;
            height: rem(40);
            justify-content: center;
            color: #212121;
            position: relative;
            box-shadow:0px 1px 0px 0px rgba(224,224,224,.5);
            padding-top: rem(0);
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            font-size: rem(16);
            background: #fff;
            img {
                font-size: rem(30);
                position: absolute;
                left: rem(15);
                top: rem(7);
                line-height: 1;
                font-size: rem(19);
                width: rem(28);
                padding: rem(5);
            }
            span {
                padding-top: rem(13);
                font-weight:400;
                color: #212121;
            }
        }
    .header_search {
         
        padding: rem(15);
        .search_txt {
            // width: 86%;
            height: rem(30);
            -webkit-appearance:none;
            -webkit-border-radius: rem(20);
            -moz-border-radius:rem(20);
            -ms-border-radius:rem(20);
            -o-border-radius:rem(20);
            border-radius: rem(20);
            border:1px solid #f5f6f6;
            background: #F5F6F6 url('../../common/img/icon_ss.png') no-repeat left center;
            background-size: 8%;
            color: #333;
            padding: 0 rem(35);
            background-position: rem(8) rem(3);
            font-size: rem(14);
        }
        

        >label {
            margin-left: rem(13);
            display: block;
            font-size: rem(14);
            color: #666;
        }
        .mint-search {
        height: rem(46);
            .mint-searchbar {
                height: 100%;
                padding: rem(8) rem(10);
                .mint-searchbar-inner {
                    height: 100%;
                    padding: 0 !important;
                }
            }
            input[type=search]::-webkit-input-placeholder {
                line-height: rem(28);
                color: #808080;
            }
            
            input[type=search]:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color: #808080;
                line-height: rem(28);
            }
            input[type=search]::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: #808080;
                line-height: rem(28);
            }
            input[type=search]:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #808080;
                line-height: rem(28);
            }
            .mint-searchbar-core {
                font-size: rem(14);
            }
        }
    }
    .sortList {
        width: 100%;
        height: rem(44);
        padding: 0 rem(20);
        position: relative;
        ul {
            
            li {
                line-height: rem(44);
                >img {
                    width: rem(15);
                    vertical-align: middle;
                }
            }
            .action {
                color: #4A9CF3;
            }
        } 
        .tabnum {
            width: 100%;
            height: 100%;
            position: absolute;
            top: rem(44);
            left: 0;
            box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: -moz-box;
            display:-webkit-flex; 
            display: -ms-flexbox;
                
            -moz-box-orient: vertical;
            -webkit-flex-direction:column;
            -ms-flex-direction:column;
            .tablist {
                height: rem(28*3);
                p {
                    width: 100%;
                    background: #fff;
                    text-align: center;
                    padding: rem(7.5);
                    line-height: rem(28);
                }
            }
            
            >div:last-child {
                width: 100%;
                height: 64.5vh;
                -moz-box-flex: 1;
                -webkit-flex:1;
                -ms-flex:1;
                flex:1;
                background:rgba(0, 0, 0, 0.4);
            }
        }
        .show {
            display: block;
        }
    }

}


    
    .section {
        width: 100%;
        font-size: rem(14);
        overflow: auto;
        padding-top: rem(10);
        position: relative;
        
            
        .section_box {
            
            &::-webkit-scrollbar { 
                background-color: transparent;
            }
            .drop-up{
                width: 100%;
                height: rem(40);
                line-height:rem(40);
                text-align: center;
                font-size: rem(14);
                color:#CCC;
            }
        .kong {
            text-align: center;
            padding: rem(61) 0;
            img {
                width: rem(125);
                display: block;
                margin: 0 auto;
            }
            >p {
                text-align: center;
                color: #808080;
                margin-top: rem(26);
            }
        }
        .doctor_list {
            width: 100%;
            font-size: rem(12);
            padding: 0 rem(15);
            
          .list {
                width: 100%;
                border-radius:4px;
                box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.1);
                margin-top: rem(10);
            >ul {
                width: 100%;
                padding: rem(15);
                background:rgba(255,255,255,1);
                border-bottom: 1px solid #E6E6E6;
                position: relative;
                .beadeptat {
                    padding-top: rem(10);
                }
                li:first-child {
                    display: -webkit-flex;
                    display: flex;
                    >img {
                        display: block;
                        width: rem(49);
                        height: rem(49);
                        border-radius: 50%;
                    }
                    >dl {
                        flex: 1;
                        padding-left: rem(15);
                        dt {
                            line-height: rem(30);
                            span {
                                margin-right: rem(8);
                                color:#333;
                                font-size: rem(16);
                            }
                            b {
                                color: #808080;
                                font-size: rem(12);
                            }
                        }
                        dd {
                            font-size: rem(12);
                            color: #333;
                        }
                    }
                }
                .juli {
                    position: absolute;
                    right: rem(10);
                    top: rem(25);
                }
                .dw_r {
                    position: absolute;
                    right: 0;
                    top: rem(17);
                    width: rem(60);
                    height: rem(19);
                    line-height: rem(19);
                    text-align: center;
                    color: #fff;
                    font-size: rem(12);
                    padding-top: rem(1);
                    z-index: 99;
                    background: url('../../common/img/bq_jwzj.png') no-repeat 0;
                    background-size: cover;
                }
                li:last-child {
                    margin-top: rem(10);
                    font-size: rem(12);
                    color: #808080;
                    line-height: rem(18);
                }
            }
            .dls {
                width: 100%;
                padding: 0 rem(15);
                height: rem(41);
                font-size: rem(12);
                dt {
                    color: #333;
                    >span {
                        color: #4A9CF3;
                    }
                }
                dd {
                    color: #333;
                    > span {
                        color: #F09F88;
                    }
                }
            }
          }
        }
    }
    }
    
}
</style>
