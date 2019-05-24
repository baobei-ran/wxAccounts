<template>
    <!-- 医生详情 -->
    <div class="doctor dis_f flex_d">
        <div v-wechat-title="datalist.true_name+'的工作室'"></div>
         <!-- <div class="header">
            <img @click='Return' src="../../common/img/icon_fh.png" alt="">
            <span>{{ datalist.true_name }}的工作室</span>
        </div> -->
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
                        <li class="list_intro " :class='{"f_hide":show}'>
                            <div id="introduce">
                                <p :class="{'p':isTxt}">
                                    医生简介：{{ datalist.introduction }}
                                </p>
                            </div>
                            <div class="arrows" v-show='isTxt'>
                                <span v-show='show' @click='shows'><img src="../../common/img/icon_zk.png" alt="" ></span>
                                <span v-show='!show' @click='shows'><img src="../../common/img/icon_sq.png" alt="" ></span>
                            </div>
                        </li>
                    </ul>
                     <div class="server">
                         <h4>开通服务</h4>
                         <ul class="server_ul">
                             <li @click='doctordata'>
                                 <img src="../../common/img/icon_zxwz.png" alt="">
                                 <div>
                                     <h5>在线问诊  
                                         <!-- <span>￥ 50/次</span> -->
                                    </h5>
                                     <p>注：支付成功后可与医生实时沟通，24h小时有效</p>
                                 </div>
                                 <span class="server_right"><img src="../../common/img/icon_enter.png" alt=""></span>
                             </li>
                         </ul>
                         <ul class="server_ul">
                             <li @click='handleClick'>
                                 <img src="../../common/img/icon_ysdp.png" alt="">
                                 <div>
                                     <h5>他的店铺</h5>
                                     <p>商品甄选，名医直达</p>
                                 </div>
                                 <span class="server_right"><img src="../../common/img/icon_enter.png" alt=""></span>
                             </li>
                         </ul>
                     </div>

                    <div class="doctor_Time">
                        <h1>预约医生门诊</h1>
                        <div class="doc_msgs" v-if='false'>
                            <img src="../../common/img/pic_zwktxxmz.png" alt="">
                            <p>该医生暂未开通线下门诊服务</p>
                        </div>
                        <div class="hebdomad_time">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th v-for='val in 7'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>上午</td>
                                        <td v-for='val in 7'></td>
                                    </tr>
                                    <tr>
                                        <td>下午</td>
                                        <td v-for='val in 7'></td>
                                    </tr>
                                    <tr>
                                        <td>晚上</td>
                                        <td v-for='val in 7'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="footer dis_f">
            <mt-button type="primary" :class="isClose ? 'button1' : 'dian'" size="large" @click.native="handleClick">他的店铺</mt-button>
            <mt-button type="primary" id='btnout' v-show="isClose" size="large" @click.native="handleClick4">关注医生</mt-button>
            <!-- <mt-button type="primary" v-show='!btnShow' id='btnout' size="large" @click.native="handleClick2">在线问诊</mt-button>
            <mt-button type="primary" v-show='btnShow' class="btnTime" size="large" @click.native="handleClick3">
                <span>继续问诊</span>
                <p>剩余时间：10:00:09</p>
            </mt-button> -->
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
            show: true,                         // 显示医生简介
            btnShow: true,                      //  是否支付，来进行按钮切换操作
            lng: '',                            // 经度
            lat: '',                            // 纬度
            uid: this.$cookie.get('userLogins'),  // 用户id
            did: '',                                // 医生id
            isClose: true,
            index: this.$route.params.index,
            isTxt: false,                            // 控制箭头显示
            timeList: '',                        // 时间列表
        }
    },
    mounted() {
        this.did = this.$route.params.id
        console.log(this.$route.params)
        this.initdata()
    },
    methods: {
        initdata () {
            var self = this;
            this.$http.post('/mobile/wxdoccenter/doctor_detail', {did:this.did, uid: this.uid}).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.datalist = res.data
                    if (self.datalist.picture) {
                        self.$refs.userImg.src = self.$http.baseURL + self.datalist.picture
                    }
                    if (res.data.relevance == 1) {
                        self.isClose = false
                    }
                    self.$nextTick(() => {
                        var p = document.getElementById('introduce').offsetHeight
                       
                        if (p > 84) {
                            self.isTxt = true
                        } else {
                            self.isTxt = false
                        }
                    })
                }
            })
        },
        handleClick() {     // 进入医生店铺
            this.$router.push({ name: 'doctorshop', params: {id: this.did, index: this.index }})
        },
        handleClick2() {    // 立即问诊按钮
            console.log('haha222')
        },
        handleClick3 () {   // 已开通问诊，在有效的时间随时可以问诊
            
        },
        handleClick4 () {   // 关注按钮
            var obj = { did: this.did, uid: this.uid}
            this.$http.post('/mobile/wxdoccenter/relevance_doctor', obj).then(res => {
                console.log(res)
                if (res.code == 1) {
                     MessageBox.confirm('你已成功关注了此医生，返回后点击我的医生，即可向医生咨询问题', {showCancelButton: false, confirmButtonText: '确定'}).then(action => {
                        
                    });
                    this.isClose = false
                } else {
                    Toast({
                        message: res.msg,
                        position: 'ceneter',
                        duration: 2000
                    });
                }
            })
        },
        Return () {
            this.$router.back()
        },
        shows () {
            this.show = !this.show
        },
        doctordata () {     //  医生问诊
            Toast({
                message: '暂未开通医生问诊服务',
                position: 'center',
                duration: 2000
            });
        },
        getTime (day) {
            var time = new Date();
            var weekdata = ['周一','周二', '周三', '周四', '周五', '周六', '周日'];
            var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();
            var tMonth = today.getMonth();
            var tDate = today.getDate();
            tMonth = DoHandleMonth(tMonth + 1);
            tDate = DoHandleMonth(tDate);
                
            return {
                date: tMonth + "." + tDate,
                id: tMonth + "-" + tDate,
                time: parseInt(targetday_milliseconds / 1000),
                week: weekDate[today.getDay()]
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
    background: #F5F5F5;
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
            >ul {
                padding: rem(12);
                width: 100%;
                background:rgba(255,255,255,1);
                border-radius:4px;
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
                                margin-right: rem(5);
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
                    padding-left: rem(20);
                    background: url('../../common/img/icon_scs.png') no-repeat left top;
                }
                .list_intro {
                   margin-top: rem(15);
                   color: #808080;
                   position: relative;
                   padding-bottom: rem(10);
                   background: #fff;
                   #introduce {
                       >p {
                            line-height: rem(20);
                            padding-left: rem(20);
                            background: url('../../common/img/icon_ysjj.png') no-repeat left top;
                        }
                   }
                   .arrows {
                       span {
                        width: 100%;
                        display: block;
                        position: absolute;
                        bottom: rem(-13);
                        left: 0;
                        text-align: center;
                        img {
                            width: rem(20);
                        }
                    }
                   }
                   
                }
                .f_hide {
                    .p{position: relative; line-height: rem(20); max-height: 80px;overflow: hidden;}
                    .p::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: rem(30);
                    background: -webkit-linear-gradient(left, transparent, #fff 50%);
                    background: -o-linear-gradient(right, transparent, #fff 50%);
                    background: -moz-linear-gradient(right, transparent, #fff 50%);
                    background: linear-gradient(to right, transparent, #fff 50%);
                    }
                }

            }

        .server {
            width: 100%;
            border-radius:4px;
            margin-top: rem(10);
            background: #FFF;
            h4 {
                padding: rem(15) rem(12);
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
                        padding: rem(15) rem(12);
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

            .doctor_Time {
                width: 100%;
                background: #FFF;
                margin-top: rem(10);
                padding: rem(16) rem(12);
                > h1 {
                    font-size: rem(16);
                    font-weight: 500;
                    line-height: rem(20);
                    padding-bottom: rem(15);
                }
                .doc_msgs {
                    width: 100%;
                    text-align: center;
                    img {
                        height: rem(60);
                        height: rem(60);
                    }
                    p {
                        margin-top: rem(11);
                        text-align: center;
                        color: #808080;
                        font-size: rem(13);
                    }
                }

                .hebdomad_time {
                    width: 100%;
                    table {
                        width: 100%;
                        thead {
                            tr {
                                th {
                                    width: rem(41);
                                    height: rem(36);
                                    border: 1px solid #EBEBEB;
                                }
                            }
                        }
                        tbody {
                            tr {
                                text-align: center;
                                line-height: rem(36);
                                td {
                                    width: rem(41);
                                    height: rem(36);
                                    border: 1px solid #EBEBEB;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .footer {
        width: 100%;
        display: -webkit-flex;
        display: flex;
        button {
            height: rem(49);
            font-size: rem(16);
            border-radius: 0;
        }
        
        .button1 {
            background:#F09F88 url(../../common/img/icon_dp.png) no-repeat rem(35);
            background-size: 12%;
        }
        .dian {
            background:#F09F88 url(../../common/img/icon_dp.png) no-repeat rem(120) center;
            background-size: 7%;
        }
        #btnout {
            background:#469AF4 url(../../common/img/icon_ljwz.png) no-repeat rem(35);
            background-size: 12%;
        }
        
        .btnTime {
            text-align: center;
            span {
                display: block;
                background: url(../../common/img/icon_jxwz.png) no-repeat rem(33);
                background-size: 12%;
                font-size: rem(16);
            }
            p {
                font-size: rem(11);
            }
        }
    }
}
</style>
