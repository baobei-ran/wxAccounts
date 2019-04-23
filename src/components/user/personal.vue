<template>
    <div class="personal">
        <div class="header">
            <!-- <img @click='Return' src="../../common/img/icon_fh.png" alt=""> -->
            <span>个人中心</span>
        </div>
        <div class="section">
            <div class="portrait">
                <p><img ref='userImg' src="../../common/img/pic_txxq.png" alt="">
                    <span>{{ userInfor.real_name }}</span>
                </p>
                <span @click='getUser'><img src="../../common/img/icon_enter.png" alt=""></span>
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
        console.log(urldata)
            var uids = this.$cookie.get('userLogins') 
            if (!uids || urldata.uid) {
                this.$cookie.set('userLogins', urldata.uid, 365)
            }
            if (urldata.auth == 0 || urldata.auth == 3) {
                this.$router.replace('/phone?uid='+urldata.uid+"&auth="+ urldata.auth)
            } else if (urldata.auth == 2 ) {
                this.$router.replace('/authentication')
            }
        
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
        -webkit-display: flex;
        display: flex;
        height: rem(40);
        justify-content: center;
        color: #212121;
        position: relative;
        box-shadow:0px 1px 0px 0px rgba(224,224,224,1);
        padding-top: rem(0);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: rem(16);
        background: #fff;
        img {
            font-size: rem(30);
            position: absolute;
            left: rem(15);
            top: rem(10);
            line-height: 1;
            font-size: rem(19);
            width: rem(20);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .section {
        background-color: #fff;
        font-size: rem(14);
        .portrait {
            padding-top: rem(34);
            text-align: center;
            position: relative;
            padding-bottom: rem(52);
            > p {
                    display: inline-block;
                    width: rem(61);
                img {
                    border-radius: 100%;
                    width: 100%;
                    margin-bottom: rem(12);
                }
               > span {
                    font-size: rem(16);
                    font-weight:400;
                    color: #333;
                    padding-top: rem(12);
                }
            }
            >span {
                position: absolute;
                right: rem(20);
                top: rem(58);
                img {
                    width: rem(30);
                    
                }
            }
        }
        .ul {
            width: 100%;
            li {
                -webkit-display: flex;
                display: flex;
                padding: rem(16) rem(21);
                line-height: rem(30);
                position: relative;
                img {
                    font-size: rem(13);
                    width: rem(20);
                    height:rem(20);
                    vertical-align: middle;
                    margin-top: rem(5);
                }
                span {
                    color: #333;
                    vertical-align: middle;
                    padding-left: rem(21);
                    font-size: rem(14);
                }
                .Right {
                    width: rem(30);
                    position: absolute;
                    right: rem(15);
                    top: rem(16);
                }
            }
        }
    }
}
</style>

