<template>
    <!-- 查找更多医生 -->
    <div class="doctor dis_f flex_d">
        <div class="header_box">
            <div class="header">
                <img @click='Return' v-if='fanhui' src="../../common/img/icon_fh.png" alt="">
                <span>更多医生</span>
            </div>
            <div class="header_search">
                    <mt-search
                        v-model="searchVal"
                        cancel-text=""
                        @keyup.enter.native="searchs" 
                        placeholder="搜索医生、科室、疾病">
                    </mt-search>
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
        
    <div class="section flex1" >
        <div class="section_box" >
            <div class="kong" v-if='!datalist.length'>
                <img src="../../common/img/pic_zwys.png" alt="">
                <p>无数据</p>
            </div>
        
            <div class="doctor_list" v-if='datalist.length'>
                 <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    <div class="list" v-for='(val,i) in datalist' :key='i'>
                        <ul @click='Clickdetail(val.did, i)'>
                            <li>
                                <img v-lazy="$http.baseURL+val.picture" alt="">
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
                            <li class="dw_r" v-if='i == 0'>距我最近</li>
                            <!-- <li class="juli" v-if='i !== 0'>{{ val.distince }}km</li> -->
                            <li class="beadeptat ">擅长：<span> {{ val.title }}</span></li>
                        </ul>
                        <!-- <dl class="dls dis_f flex_i dis_sb">
                            <dt>
                                咨询量：<span>2122</span>
                            </dt>
                            <dt>
                                30分钟内回复率 <span>70%</span> 
                            </dt>
                            <dd>
                                问诊费用 <span>¥50/次</span>
                            </dd>
                        </dl> -->
                    </div>
                <div class="drop-up" v-if="dropup">—— 没有数据了 ——</div>
            </div>
               
            </div>
        </div>
            
    </div>
        <div style='width:100%;height: 200px; display:none;' id="aMap"></div>
    </div>
</template>

<script>

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
            limit: 10,
            lon: '116.406568',  // 经度
            lat: '39.917591',    // 纬度
            loading: false,
            allLoaded: false,
            bottomStatus: '',
            fanhui: true,           // 返回按钮
            dropDown: false,        // 下拉
            dropup: false,          //  上拉
            busy: false
        }
    },
     created () {
         var self = this;
         var getLocation = (onComplete=function(){},onError=function(){})=>{
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
                    timeout: 10000, //超过10秒后停止定位，默认：无穷大
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

                    // 添加地图全局定位事件
                    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
                        function onComplete(data) {
                            // data是具体的定位信息
                            const latitude = data.position.getLat() // 纬度
                            const longitude = data.position.getLng() // 经度
                            console.log('latitude', latitude, 'longitude', longitude)
                            self.lon = longitude
                            self.lat = latitude
                        }
                
                        function onError(data) {
                            
                        }
                    })

                    // 调用定位
                    geolocation.getCurrentPosition();
                
            }
       getLocation()    // 执行
        var urldata = this.$route.query
        if (urldata.uid) {
            this.fanhui = false
        } else {
            this.fanhui = true
        }
         var uids = this.$cookie.get('userLogins') 
            if (!uids || urldata.uid) {
                this.$cookie.set('userLogins', urldata.uid, 365)
            }
        if (urldata) {
            if (urldata.auth == 0 || urldata.auth == 3) {
                this.$router.replace('/phone?uid='+urldata.uid+"&auth="+ urldata.auth)
            } else if (urldata.auth == 2) {
                this.$router.replace('/authentication')
            }
        }
    },
    mounted () {
       this.initdata()
    },
    methods: {

        loadMore: function() {
            this.busy = true
            this.page += 1
            this.initdata()
        },
        searchs () {
            // 搜索
            var self = this;
             var obj = {page: 1, num: 15, lon: this.lon,lat: this.lat,  name: this.searchVal}
            self.$http.post('/mobile/Wxorder/doc_more', obj).then(res => {
                console.log(res)
                    self.busy = false
                if (res.code == 1) {
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
            console.log(this.page)
            var obj = {page: this.page, num: this.limit, lon: this.lon,lat: this.lat,  name: this.searchVal}
            self.$http.post('/mobile/Wxorder/doc_more', obj).then(res => {
                console.log(res)
                    self.busy = false
                if (res.code == 1) {
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

<style>

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
                top: rem(12);
                line-height: 1;
                font-size: rem(19);
                width: rem(18);
            }
            span {
                padding-top: rem(15);
                font-weight:400;
                color: #212121;
            }
        }
    .header_search {
        height: rem(46);
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
                line-height: rem(44);
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
                margin-top: rem(5);
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
                    background: url('../../common/img/icon_jwzjk.png') no-repeat 0;
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
