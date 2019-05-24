<template>
    <!-- 预约记录详情 -->
    <div class="subscribeDetail">
        <div class="section">
            <div class="section_box">
                <div class="section_head">
                    <h3><img src="../../common/img/icon_djz.png" alt="">待就诊</h3>
                    <div class="cancelBtn"><mt-button @click.native="cancelClick">取消预约</mt-button></div>
                </div>
                <div class="section_head2">
                    <h3><img src="../../common/img/icon_yjz.png" alt="">待就诊</h3>
                </div>
                <div class="section_head2">
                    <h3><img src="../../common/img/icon_ytk.png" alt="">已退款</h3>
                </div>
                <div class="section_con">
                    <ul>
                        <li>
                            <span>就诊人员</span>
                            <span>患者姓名</span>
                        </li>
                        <li>
                            <span>医生信息</span>
                            <span>医生姓名</span>
                        </li>
                        <li>
                            <span>就诊地址</span>
                            <span>北京市清华大学附属医院</span>
                        </li>
                        <li>
                            <span>就诊科室</span>
                            <span>眼科</span>
                        </li>
                        <li>
                            <span>预约时间</span>
                            <span>2017年8月27日 周四 上午8:00-12:00</span>
                        </li>
                        <li>
                            <span>挂号类型</span>
                            <span>专家门诊</span>
                        </li>
                        <li>
                            <span>费用金额</span>
                            <span>100元</span>
                        </li>
                        <li>
                            <span>病情描述</span>
                            <span>这次为患者填写的病情描述，文字较多的时候可能是多行显示内容</span>
                        </li>
                        <li>
                            <span>预约单号</span>
                            <span>2713781290327109</span>
                        </li>
                        <li>
                            <span>付款时间</span>
                            <span>2019-08-01 12:45</span>
                        </li>
                    </ul>
                </div>
                
                <div class="refundTime">
                    <ul>
                        <li>
                            <span>退款时间</span>
                            <span>2019-08-01 14:45</span>
                        </li>
                        <li>
                            <span>退款说明</span>
                            <span>个人原因,这次为患者填写的病情描述，文字较多的时候可能是多行显示内容</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'subscribeDetail',
    data () {
        return {

        }
    },
    methods: {
        cancelClick: function () {
            this.$router.push({path: '/subscribe/cancelSubscribe', query: { id: this.$route.query.id }})
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.subscribeDetail {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background-color: #f4f4f4;
    font-size: rem(14);
    .section {
        width: 100%;
        .section_box {
            width: 100%;
            .section_head {
                width: 100%;
                height: rem(67);
                padding: 0 rem(13);
                background-color: #FFF;
                line-height: rem(67);
                overflow: hidden;
               > h3 {
                    float: left;
                    font-size: rem(16);
                    color: #F09F88;
                    img {
                        width: rem(38);
                        height: rem(38);
                        -webkit-border-radius: 100%;
                        border-radius: 100%;
                        vertical-align: middle;
                        margin-right: rem(5);
                    }
                }
                .cancelBtn {
                    float: right;
                   > button {
                        height: rem(25);
                        line-height: rem(25);
                        font-size: rem(11);
                        color: #808080;
                        background-color: #FFF;
                        border: 1px solid #808080;
                    }
                }
            }
            .section_head2 {
                width: 100%;
                height: rem(67);
                padding: 0 rem(13);
                background-color: #FFF;
                line-height: rem(67);
               > h3 {
                    font-size: rem(16);
                    color: #469AF4;
                    img {
                        width: rem(38);
                        height: rem(38);
                        -webkit-border-radius: 100%;
                        border-radius: 100%;
                        vertical-align: middle;
                        margin-right: rem(5);
                    }
                }
            }

            .section_con {
                margin-top: rem(12);
                padding:0 rem(15);
                background-color: #fff;
                ul {
                    width: 100%;
                    padding: rem(20) 0;
                    li {
                        margin-top: rem(18);
                        font-size: rem(14);
                        display: -webkit-box; 
                        display: -moz-box; 
                        display: -webkit-flex; 
                        display: -moz-flex; 
                        display: -ms-flexbox;
                        display: flex;
                        overflow: hidden;
                        span {
                            display: block;
                            float: left;
                            line-height: rem(18);
                        }
                        span:first-child {
                           
                            color: #808080;
                            margin-right: rem(14);
                        }
                        span:last-child {
                            width: 75%;
                            color: #212121;
                        }
                    }
                    li:first-child {
                        margin-top: 0;
                    }
                }
            }
            .refundTime {
                margin-top: rem(12);
                background-color: #FFF;
                ul {
                    width: 100%;
                    padding: rem(20) rem(15);
                    li {
                        margin-top: rem(15);
                        font-size: rem(14);
                        display: -webkit-box; 
                        display: -moz-box; 
                        display: -webkit-flex; 
                        display: -moz-flex; 
                        display: -ms-flexbox;
                        display: flex;
                        overflow: hidden;
                        span {
                            display: block;
                            float: left;
                            line-height: rem(18);
                        }
                        span:first-child {
                           
                            color: #808080;
                            margin-right: rem(14);
                        }
                        span:last-child {
                            width: 75%;
                            color: #212121;
                        }
                    }
                    li:first-child {
                        margin-top: 0;
                    }
                }
            }
        }
    }
}

</style>
