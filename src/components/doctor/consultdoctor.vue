<template>
    <!-- 医生详情 -->
    <div class="doctor dis_f flex_d">
         <div class="header">
            <!-- <img @click='Return' src="../../common/img/icon_fh.png" alt=""> -->
            <span>{{ datalist.true_name }}的工作室</span>
        </div>
        <div class="section flex1">
            <div >
                <div class="list">
                    <ul>
                        <li>
                            <img ref='userImg' src="../../common/img/pic_wdys_ystx.png" alt="">
                            <dl>
                                <dt>
                                    <span>{{ datalist.true_name }}</span>
                                    <b>{{ datalist.gname }} | {{ datalist.department_name }}</b>
                                </dt>
                                <dd>
                                    {{ datalist.hospital_name }}
                                </dd>
                            </dl>
                        </li>
                        <li class="list_c">擅长：<span>{{ datalist.title }}</span></li>
                        <li class="list_intro ">
                            谢永强医生想与你继续沟通
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
        <div class="footer">
            <mt-button type="primary" id='btnout' size="large" @click.native="handleClick">立即咨询</mt-button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name: 'doctordetail',
    data () {
        return {
            datalist: {},
            uid: this.$cookie.get('userLogins'),  // 用户id
            did: '',                                // 医生id
           
        }
    },
    mounted() {
        this.did = this.$route.query.id
        console.log(this.$route)
        this.initdata()
    },
    methods: {
        initdata () {   // 详情
            var self = this;
            this.$http.post('/mobile/wxdoccenter/doctor_detail', {did:this.did, uid: this.uid}).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.datalist = res.data
                    if (self.datalist.picture) {
                        self.$refs.userImg.src = self.$http.baseURL + self.datalist.picture
                    }
                    
                    
                }
            })
        },
        Return () {
            this.$router.back()
        },
        handleClick () {    // 立即咨询
            this.usermsg()
        },
        usermsg () {
            MessageBox.confirm('你已选择该医生，请直接返回聊天', {showCancelButton: false, confirmButtonText: '确定并返回'}).then(action => {
                self.wx_clocs()
            });
        },
         wx_clocs () {   // 返回公众号首页

                if(typeof WeixinJSBridge !== "undefined"){
                    WeixinJSBridge.call('closeWindow');
                    // parent.WeixinJSBridge.call('closeWindow');
                    // setTimeout('WeixinJSBridge.call("closeWindow")', 300);
                } else {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', function () {
                            WeixinJSBridge.call('closeWindow');
                        }, false)
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', function () {
                            WeixinJSBridge.call('closeWindow');
                        })
                        document.attachEvent('onWeixinJSBridgeReady', function () {
                            WeixinJSBridge.call('closeWindow');
                        })
                    }
                     else if (navigator.userAgent.indexOf("MSIE") > 0) {  

                            if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {  
                                window.opener = null; window.close();  
                            } else {  
                                window.open('', '_top'); window.top.close();  
                            }  
                    } else if (navigator.userAgent.indexOf("Firefox") > 0) {  
                        window.location.href = 'about:blank ';  
                    } else {  
                        window.opener = null;   
                        window.open('', '_self', '');  
                        window.close();  
                    }
                }
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
.doctor {
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: rem(14);
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
            top: rem(10);
            line-height: 1;
            font-size: rem(19);
            width: rem(24);
            padding: rem(3);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .section {
        width: 100%;
        font-size: rem(14);
        overflow-y: scroll;
        .list {
            width: 100%;
            font-size: rem(12);
            padding: 0 rem(15);
            >ul {
                padding: rem(15);
                width: 100%;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.1);
                border-radius:4px;
                margin-top: rem(5);
                li:first-child {
                    -webkit-display: flex;
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
                                margin-right: rem(15);
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
                .list_c {
                    margin-top: rem(10);
                    font-size: rem(12);
                    color: #333;
                    line-height: rem(18);
                    padding-bottom: rem(15);
                    border-bottom: 1px solid #e6e6e6;
                }
                .list_intro {
                   margin-top: rem(15);
                   color: #3196FF;
                   position: relative;
                   padding-bottom: rem(10);
                   background: #fff;                 
                }
               

            }

        .server {
            width: 100%;
            box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.1);
            border-radius:4px;
            margin-top: rem(5);
            h4 {
                padding: rem(15) rem(16);
                border-bottom: 1px solid #E6E6E6;
                color: #333;
                font-size: rem(16);
                font-weight:500;
                }
                .server_ul {
                    width: 100%;
                    position: relative;
                    li {
                        -webkit-display: flex;
                        display: flex;
                        padding: rem(15);
                        >img {
                            width: rem(40);
                            height: rem(40);
                        }
                        >div {
                            margin-left: rem(10);
                            >h5 {
                                color: #333;
                                font-size: rem(14);
                                line-height: rem(20);
                                font-weight: 550;
                                span {
                                    color: #F09F88;
                                    font-size: rem(16);
                                }
                            }
                            >p {
                                line-height: rem(20);
                                color: #808080;
                                font-size:rem(11);
                                margin-top: rem(3);
                                padding-right: rem(18);
                            }
                        }
                        .server_right {
                            position: absolute;
                            right: rem(3);
                            top: 30%;
                            > img {
                                width: rem(35);
                                font-size: rem(9);
                            }
                        }
                    }
                }
            }
        }
    }
    .footer {
        width: 100%;
        button {
            height: rem(49);
            font-size: rem(16);
            border-radius: 0;
        }
        #btnout {
            background:#469AF4 url(../../common/img/icon_ljwz.png) no-repeat rem(120) center;
            background-size: 7%;
        }
    }
}
</style>
