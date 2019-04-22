<template>
                    <!--  更多医生店铺 -->
    <div class="doctorshoplist dis_f flex_d">
        <div class="header">
            <img @click='Return' v-if='show' src="../../common/img/icon_fh.png" alt="">
            <span>医生店铺</span>
        </div>
        <div class="content flex1">   
            <div class="content_box">
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    <div class="take Mg-T"  v-for='(val,i) in alllist' :key='i'>
                        <h4>{{ val.true_name }}医生的店铺 <span>{{ val.hospital_name }}</span></h4>
                        <div class="order_list" @click='getDoctor(val.did)'>
                            <ul>
                                <li v-for='item in val.goods_pic' >
                                    <img v-lazy="$http.baseURL+item" alt="">
                                </li>
                            
                                <!-- <li class="right"><img src="../../common/img/icon_enter.png" alt=""></li> -->
                            </ul>
                        </div>
                        <div class="addbtn dis_f"><span>已售<span>{{ val.count }}</span>件</span><mt-button class="yes" @click.native='getDoctor(val.did)'>查看更多</mt-button></div>
                    </div>
                    
                </div>
                    <div class="drop-up" v-if="dropup">—— 没有数据了 ——</div>
                </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
   
    data () {
        return {
            alllist: [],         //  数据
            page: 1,
            limit: 10,
            show: true,           // 返回按钮显示
            busy: true,
            dropup: false,
            count: 0
        }
    },
    created() {
        var urldata = this.$route.query
        if(urldata.uid) {
            this.show = false
        } else {
            this.show = true
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
        initdata () {
            var self = this;
            if (this.dropup) {
                return
            }
            this.$http.post('/mobile/Wxdoccenter/doc_goods', {page: this.page, num: this.limit}).then(res => {
                console.log(res)
                
                if (res.code == 1) {
                    this.busy = false
                    self.count = res.counts
                     res.data.forEach(val => {
                            var pic = val
                            var arr = pic.goods_pic.split(',')
                            if (arr.length > 4) {
                                arr.length = 4
                                val.goods_pic = arr
                            } else {
                                val.goods_pic = arr
                            }
                        })
                    if (self.page <= 1) {
                       
                        self.alllist = res.data
                        
                    } 
                    else if (self.page > 1) {
                        var s = res.data
                        self.alllist = self.alllist.concat(s)
                        if (self.alllist.length == self.count) {
                            self.dropup = true
                            self.busy = true
                        }
                    }
                   
                } else {
                    if (self.alllist.length > 9) {
                        self.dropup = true
                    }
                    self.busy = true
                }
            })
        },
        Return () {
            this.$router.back()
        },
        getDoctor (id) {    // 查看更多
        console.log(id)
            this.$router.push({name: 'doctorshop', params: { id: id}})
        },
        outdetails(val) {
            console.log(val)
        }
    }
}
</script>

<style>

</style>
<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}

.doctorshoplist {
    width: 100%;
    height: 100%;
    font-size: rem(16);
    .header {
        display: -webkit-flex;
        display: flex;
        height: rem(40);
        -webkit-justify-content: center;
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
            top: rem(13);
            line-height: 1;
            font-size: rem(19);
            width: rem(20);
            padding: rem(1);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .Mg-T {
        margin-top: rem(5);
    }
   
    .content {
        width: 100%;
        padding: 0 rem(15);
        overflow: auto;
       .content_box {
           width:100%;
           .drop-up{
                width: 100%;
                height: rem(40);
                line-height:rem(40);
                text-align: center;
                font-size: rem(14);
                color:#CCC;
            }
        .take {
            width: 100%;
            box-shadow:0px rem(5) rem(10) 0px rgba(0, 0, 0, 0.1);
            padding: rem(15);
            font-weight:400;
            background: #fff;
             h4 {
                background: url('../../common/img/icon_dpu.png') no-repeat 0;
                background-size: 8%;
                padding-left: rem(28);
                line-height: rem(30);
                font-size: rem(14);
                color:#333;
                >span {
                    margin-left: rem(15);
                    color:#808080;
                    font-size: rem(12);
                }
            }
            .order_list {
                width: 100%;
                padding: rem(7.5) 0;
                >ul {
                    -webkit-display: flex;
                    display: flex;
                    margin: rem(7.5) 0;
                    position: relative;
                        li {
                            margin-right: rem(15);
                            >img {
                                display: block;
                                width: rem(64);
                                margin-bottom: rem(2);
                            }
                        }
                        .right {
                            position: absolute;
                            right: 0;
                            top: 0;
                            >img {
                                width: rem(20);
                            }
                        }
                }
               
            }
            
                .addbtn {
                    width: 100%;
                    text-align: right;
                    line-height: rem(25);
                    -webkit-justify-content: flex-end;
                    -moz-justify-content: flex-end;
                    -ms-justify-content: flex-end;
                    -o-justify-content: flex-end;
                    justify-content: flex-end;
                    >span {
                        color: #808080;
                        font-size: rem(12);
                    }
                    >button {
                        height: rem(25);
                        border-radius: rem(13);
                        font-size: rem(13);
                        border:1px solid rgba(74,156,243,1);
                        color: #4A9CF3;
                    }
                    .yes {
                        margin-left: rem(15);
                    }
                }
        }
    }

    }
}
</style>
