<template>
<!-- 预约门诊记录 -->
    <div class="subscribe dis_f flex_c">
        <div class="header">
            <ul class="header_nav dis_f dis_sb flex-vc">
                    <li :class="{'ckblue':flag == 0}" @click='clickNav(0)'>全部</li>
                    <li :class="{'ckblue':flag == 1}" @click='clickNav(1)'>待就诊</li>
                    <li :class="{'ckblue':flag == 2}" @click='clickNav(2)'>已就诊</li>
                    <li :class="{'ckblue':flag == 4}" @click='clickNav(4)'>退款</li>
                </ul>
        </div>
        <div class="section flex1">
            <div class="section_box">
                <div class="empty" v-if='!yudocMsgList.length'>
                    <img src="../../common/img/pic_zwxgyyjl.png" alt="">
                    <p>暂无相关预约记录</p>
                </div>
                <div class="content_wrap" v-for='(val, i) in yudocMsgList' :key='i'>
                    <!-- 待就诊 -->
                    <div>
                        <div class="commons await" v-if='val.registration_stat == 1'>
                            <h4>{{ val.hospital_name }}<span>待就诊</span></h4>
                            <dl class="dis_f flex-vc">
                                <dt><img :src="$http.baseURL + val.picture" alt=""></dt>
                                <dd>
                                    <p>
                                        <span>就诊医生：</span><span>{{ val.true_name }}</span>
                                    </p>
                                    <p>
                                        <span>就诊时间：</span><span>{{ val.registration_time | Times }} {{ TimeInterval[(val.registration_timeslot - 1)] }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <div class="ckBtn">
                                <mt-button @click.native="clickCancel(val)" >取消预约</mt-button>
                                <mt-button @click.native="clickDetail(val.registration_id)">挂号详情</mt-button>
                            </div>
                        </div>
                    </div>

                    <!-- 已就诊 -->
                    <div>
                        <div class="commons alreadyOver" v-if='val.registration_stat == 2'>
                            <h4>{{ val.hospital_name }}<span>已就诊</span></h4>
                            <dl class="dis_f flex-vc">
                                <dt><img :src="$http.baseURL + val.picture" alt=""></dt>
                                <dd>
                                    <p>
                                        <span>就诊医生：</span><span>{{ val.true_name }} </span>
                                    </p>
                                    <p>
                                        <span>就诊时间：</span><span>{{ val.registration_time | Times }} {{ TimeInterval[(val.registration_timeslot - 1)] }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <div class="ckBtn">
                                <mt-button @click.native="clickDetail(val.registration_id)">挂号详情</mt-button>
                            </div>
                        </div>
                    </div>

                    <!-- 退款 -->
                    <div>
                         <div class="commons refund" v-if='val.registration_stat == 4'>
                            <h4>{{ val.hospital_name }}<span v-text=' val.registration_status == 3 ? "退款成功" : val.registration_status == 4 ? "退款失败" : val.registration_status == 5? "退款中" : "" '></span></h4>
                            <dl class="dis_f flex-vc">
                                <dt><img :src="$http.baseURL + val.picture" alt=""></dt>
                                <dd>
                                    <p>
                                        <span>就诊医生：</span><span>{{ val.true_name }}</span>
                                    </p>
                                    <p>
                                        <span>就诊时间：</span><span>{{ val.registration_time | Times }} {{ TimeInterval[(val.registration_timeslot - 1)] }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <div class="ckBtn">
                                <mt-button @click.native="clickDetail(val.registration_id)">挂号详情</mt-button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'subscribe',
    data () {
        return {
            flag: 0,
            yudocMsgList: [],
            uid: this.$cookie.get('userLogins'),    // 用户id
            page: 1,
            limit: 10,
            TimeInterval: ['上午 8:00-12:00', '下午 13:00-18:00', '晚上 18:00-24:00'], 
        }
    },
    mounted () {
        this.initdata ('')
    },
    methods: {
        initdata (num) {
            var self = this,
                obj = {uid:this.uid, registration_stat: num, page: this.page, limit: this.limit}
            self.$http.post('/mobile/Wxregistration/registration_list', obj).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.yudocMsgList = res.data
                } else {
                    self.yudocMsgList = []
                }
            })
        },
        clickNav: function (n) {
            this.flag = n;
            if (n == 0) {
                this.initdata ('')
            } else if (n == 1) {
                this.initdata (1)
            } else if (n == 2) {
                this.initdata (2)
            } else {
                this.initdata (4)
            }
        },  
        clickCancel: function (v) { // 取消预约
            console.log(v)
            this.$router.push({path: '/cancelSubscribe', query: { rid: v.registration_id }})
        },
        clickDetail: function (id) { // 查看详情
            this.$router.push({path: '/subscribeDetail', query: { rid: id}})
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.subscribe {
    width: 100%;
    height: 100%;
    font-size: rem(14);
    background-color: #FAFAFA;
    .header {
        width: 100%;
        height: rem(44);
        background-color: #fff;
        -webkit-box-shadow:0px 1px 0px 0px rgba(224,224,224,1);
        box-shadow:0px 1px 0px 0px rgba(224,224,224,1);
        .header_nav {
            padding: 0 rem(23);
            height: rem(44);
            >li {
                font-size: rem(14);
                height: 100%;
                float: left;
                padding: 0 rem(5);
                text-align: center;
                line-height: rem(44);
                color: #666;
            }
            li:after {
                content: " ";
                display: table-cell;
                clear: both;
                visibility: hidden;
            }
            .ckblue {
                color: #333;
                border-bottom: 3px solid #5189F6;
            }
        }
    }
    .section {
        width: 100%;
        overflow-y: scroll;
        .section_box {
            width: 100%;
            .empty {
                width: 100%;
                text-align: center;
                padding-top: rem(50);
                img {
                    width: rem(125);
                }
                p {
                    margin-top: rem(24);
                    color: #666;
                    font-size: rem(14);
                }
            }
            .content_wrap {
                margin-top: rem(1);
                width: 100%;
            > div {
                width: 100%;
                .commons {
                    width: 100%;
                    margin-bottom: rem(12);   
                    > h4 {
                        width: 100%;
                        height: rem(40);
                        line-height: rem(40);
                        color: #808080;
                        font-size: rem(13);
                        background-color: #fff;
                        padding: 0 rem(12); 
                        > span {
                            float: right;
                            color: #F09F88;
                            font-size: rem(12);
                        }
                    }
                    > dl {
                        width: 100%;
                        height: rem(72);
                        padding: 0 rem(12); 
                        dt {
                            width: rem(54);
                            height: rem(54);
                            -webkit-border-radius: 100%;
                            border-radius: 100%;
                            >img {
                                width: rem(54);
                                display: block;
                                -webkit-border-radius: 100%;
                                border-radius: 100%;
                            }
                        }
                        dd {
                            padding-left: rem(12);
                            color: #333;
                            font-size: rem(14);
                            > p {
                                line-height: rem(19);
                            }
                            p:last-child {
                                margin-top: rem(5);
                            }
                        }
                    }
                    .ckBtn {
                        width: 100%;
                        height: rem(49);
                        line-height: rem(49);
                        text-align: right;
                        background-color: #fff;
                        padding: 0 rem(12); 
                        > button {
                            width: rem(72);
                            height: rem(23);
                            line-height: rem(23);
                            padding: 0;
                            color: #808080;
                            font-size: rem(11);
                            background-color: #fff;
                            border: 1px solid #808080;
                            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                        }
                        button:last-child {
                            margin-left: rem(15);
                        }
                    }

                }
                
                .alreadyOver, .refund {
                    h4 {
                        > span {
                            color:#808080;
                        }
                    }
                }
            }
            }
        }
    }
}
</style>
