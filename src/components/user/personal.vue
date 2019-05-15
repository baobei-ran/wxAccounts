<template>
    <div class="personal">
        <div class="header">
            <!-- <img @click='Return' src="../../common/img/icon_fh.png" alt=""> -->
            <span>个人中心</span>
        </div>
        <div class="section">
            <div class="portrait" @click='getUser'>
                <p class="dis_f flex_i"><img ref='userImg' src="../../common/img/pic_txxq.png" alt="">
                    <span>{{ userInfor.real_name }}</span>
                </p>
                <span ><img src="../../common/img/icon_enter.png" alt=""></span>
            </div>
            <ul class="ul">
                <li @click='getDoutor'><img src="../../common/img/icon_wdys.png" alt=""> <span>我的医生</span> <img class="Right" src="../../common/img/icon_enter.png" alt=""></li>
                <li @click='getOrder'><img src="../../common/img/icon_spdd.png" alt=""> <span>商品订单</span> <img class="Right" src="../../common/img/icon_enter.png" alt=""></li>
                <li @click='getRecipe'><img src="../../common/img/icon_cfdd.png" alt=""> <span>处方订单</span> <img class="Right" src="../../common/img/icon_enter.png" alt=""></li>
                <li @click='goSite'><img src="../../common/img/icon_shdz.png" alt=""> <span>收货地址管理</span> <img class="Right" src="../../common/img/icon_enter.png" alt=""></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
           userInfor: {}
        }
    },
    created () {    
        // http://test99.yunyikang.cn/wechat/searchdoctor?uid=295&auth=3  微信传参的url
        // $auth = 0;  //0 未注册
        // $auth = 1;  //1 已认证
        // $auth = 2; //2 未认证,已绑定手机号
        // $auth = 3;  //3 未认证,未绑定手机号
        var urldata = this.$route.query
        if (urldata.uid) {
            this.$cookie.set('userLogins', urldata.uid, 365)
            this.initdata (urldata.uid)
        }
            
            // if (urldata.auth == 0 || urldata.auth == 3) {
            //     this.$router.replace('/phone?uid='+urldata.uid+"&auth="+ urldata.auth)
            // } else if (urldata.auth == 2 ) {
            //     this.$router.replace('/authentication')
            // }
        
    },
    mounted () {
        var self = this;
        var uid = this.$cookie.get('userLogins')
        this.$http.post('/mobile/wxauth/center', { uid: uid}).then(res => {
            console.log(res)
            if (res.code == 1) {
                self.userInfor = res.data
            if (self.userInfor.pic) {
                self.$refs.userImg.src = self.$http.baseURL + self.userInfor.pic
            }
                
            } else {

            }
        })
    },
    methods: {
        initdata (id) {         //  检测是否认证
            var self = this;
            self.$http.post('/mobile/wxauth/is_auth', { uid: id}).then(res => {
                console.log(res)
                if (res.code == 1) {
                    if (res.auth == 3) {
                        self.$router.replace('/phone?uid='+id)
                        return;
                    } 
                    if (res.auth == 2 ) {
                        self.$router.replace('/authentication')
                    }
                }
            })
        },
        Return () {
            this.$router.go(-1)
        },
        goSite() {  // 地址
            this.out('/SiteList')
        },
        getUser () {    // 个人信息
            this.out('/userdata')
        },
        getDoutor () {  // 我的医生
            this.out('/finddoctor')
        },
        getOrder () {   // 商品订单
            this.out('/dingdan')
        },
        getRecipe () {  // 处方订单
            this.out('/recipelist')
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.personal {
    width: 100%;
    background: #f9f9f9;
    font-size: rem(14);
    height: 100vh;
    .header {
        height: rem(40);
        justify-content: center;
        color: #212121;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: rem(16);
        background-color: #fff;
        border-bottom: 1px solid #E6E6E6;
        line-height: rem(40);
        span {
            font-weight:400;
            color: #212121;
        }
    }
    .section {
        font-size: rem(14);
        .portrait {
            height: rem(94);
            margin-bottom: rem(10);
            position: relative;
            background-color: #fff;
            > p {
                    width: 100%;
                    height: rem(94);
                    padding-left: rem(19);
                img {
                    display: block;
                    width: rem(64);
                    height: rem(64);
                    border-radius: 100%;
                    vertical-align: middle;
                }
               > span {
                   display: block;
                    margin-left: rem(15);
                    font-size: rem(16);
                    font-weight:400;
                    color: #333;
                }
            }
            >span {
                position: absolute;
                right: rem(21);
                top: rem(39);
                img {
                    width: rem(26);
                }
            }
        }
        .ul {
            width: 100%;
            background-color: #fff;
            padding-left: rem(20);
            li {
                -webkit-display: flex;
                display: flex;
                -webkit-align-items:center;
                box-align:center;
                -moz-box-align:center;
                -webkit-box-align:center;
                align-items:center;
                line-height: rem(49);
                position: relative;
                border-bottom: 1px solid #E6E6E6;
                img {
                    font-size: rem(13);
                    width: rem(20);
                    height:rem(20);
                    vertical-align: middle;
                }
                span {
                    color: #333;
                    padding-left: rem(21);
                    font-size: rem(14);
                }
                .Right {
                    width: rem(26);
                    height: auto;
                    position: absolute;
                    right: rem(21);
                    top: 50%;
                    transform: translate(0, -50%);
                    -ms-transform: translate(0,-50%);
                    -moz-transform: translate(0,-50%);
                    -webkit-transform: translate(0,-50%);
                    -o-transform: translate(0,-50%);
                }
            }
            li:last-child {
                border:0;
            }
        }
    }
}
</style>

