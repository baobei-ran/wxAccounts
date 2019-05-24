<template>
<!-- 预约门诊记录 -->
    <div class="subscribe dis_f flex_c">
        <div class="header">
            <ul class="header_nav dis_f dis_sb flex-vc">
                    <li :class="{'ckblue':flag == 0}" @click='clickNav(0)'>全部</li>
                    <li :class="{'ckblue':flag == 1}" @click='clickNav(1)'>待就诊</li>
                    <li :class="{'ckblue':flag == 2}" @click='clickNav(2)'>已就诊</li>
                    <li :class="{'ckblue':flag == 3}" @click='clickNav(3)'>退款</li>
                </ul>
        </div>
        <div class="section flex1">
            <div class="section_box">
                <div class="content_wrap">
                    <!-- 待就诊 -->
                    <div>
                        <div class="commons await" v-for='val in 3'>
                            <h4>北京首都师范儿童医院（医生所在医院）<span>待就诊</span></h4>
                            <dl class="dis_f flex-vc">
                                <dt><img src="../../common/img/pic_wdys_ystx.png" alt=""></dt>
                                <dd>
                                    <p>
                                        <span>就诊医生：</span><span>医生姓名</span>
                                    </p>
                                    <p>
                                        <span>就诊时间：</span><span>8月27日 周四 上午8:00-12:00</span>
                                    </p>
                                </dd>
                            </dl>
                            <div class="ckBtn">
                                <mt-button @click.native="clickCancel(1)" plain>取消预约</mt-button>
                                <mt-button @click.native="clickDetail(1)">挂号详情</mt-button>
                            </div>
                        </div>
                    </div>

                    <!-- 已就诊 -->
                    <div>
                        <div class="commons alreadyOver" v-for='val in 3'>
                            <h4>北京首都师范儿童医院（医生所在医院）<span>已就诊</span></h4>
                            <dl class="dis_f flex-vc">
                                <dt><img src="../../common/img/pic_wdys_ystx.png" alt=""></dt>
                                <dd>
                                    <p>
                                        <span>就诊医生：</span><span>医生姓名</span>
                                    </p>
                                    <p>
                                        <span>就诊时间：</span><span>8月27日 周四 上午8:00-12:00</span>
                                    </p>
                                </dd>
                            </dl>
                            <div class="ckBtn">
                                <mt-button @click.native="clickDetail(2)">挂号详情</mt-button>
                            </div>
                        </div>
                    </div>

                    <!-- 退款 -->
                    <div>
                         <div class="commons refund" v-for='val in 3'>
                            <h4>北京首都师范儿童医院（医生所在医院）<span>退款成功</span></h4>
                            <dl class="dis_f flex-vc">
                                <dt><img src="../../common/img/pic_wdys_ystx.png" alt=""></dt>
                                <dd>
                                    <p>
                                        <span>就诊医生：</span><span>医生姓名</span>
                                    </p>
                                    <p>
                                        <span>就诊时间：</span><span>8月27日 周四 上午8:00-12:00</span>
                                    </p>
                                </dd>
                            </dl>
                            <div class="ckBtn">
                                <mt-button @click.native="clickDetail(3)">挂号详情</mt-button>
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
        }
    },
    methods: {
        clickNav: function (n) {
            this.flag = n;
        },  
        clickCancel: function (id) { // 取消预约
            this.$router.push({path: '/subscribe/cancelSubscribe', query: { id: id }})
        },
        clickDetail: function (id) { // 查看详情
            this.$router.push({path: '/subscribe/subscribeDetail', query: {id: id}})
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
                width: 14.7%;
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
                                width: 100%;
                                height: 100%;
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
