<template>
    <!-- 取消预约 -->
    <div class="cancelSubscribe dis_f flex_c">
        <div class="section flex1">
            <div class="section_box">
                <dl class="doctor_title dis_f flex-vc">
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
                <div class="cancel_reason">
                    <ul>
                        <li class="dis_f dis_sb">
                            <span>取消原因</span>
                            <span>请选择 <i class="iconfont icon-iconfontjiantou2"></i></span>
                        </li>
                        <li>
                            <span>退款金额</span>
                            <span>￥10.00</span>
                        </li>
                        <li class="cancel_txt">
                            <span>取消说明</span>
                        </li>
                        <li class="cancel_txt cancel_txt2">
                            <textarea maxlength="200" placeholder="说明为选填项"></textarea>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer" v-show="hidshow">
            <mt-button @click.native="handleClick">提交</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cancelSubscribe',
    data () {
        return {
            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,  //实时屏幕高度
            hidshow: true,  //显示或者隐藏footer
        }
    },
    mounted() {
        // window.onresize监听页面高度的变化
        var self = this;
        window.onresize = function() {
            return( function (){
                self.showHeight = document.body.clientHeight;
            })()
        }
    },
    watch: {
        showHeight:function() {
            if(this.docmHeight > this.showHeight){
                this.hidshow=false
            }else{
                this.hidshow=true
            }
        }
    },
    methods: {
        handleClick: function () {

        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.cancelSubscribe {
    width: 100%;
    height: 100%;
    font-size: rem(14);
    background-color: #f4f4f4;
    .section {
        width: 100%;
        .section_box {
            width: 100%;
            .doctor_title {
                width: 100%;
                height: rem(87);
                padding: 0 rem(15); 
                background-color: #fff;
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
            .cancel_reason {
                width: 100%;
                background-color: #FFF;
                margin-top: rem(12);
                > ul {
                    width: 100%;
                    padding: 0 rem(16);
                    li {
                        width: 100%;
                        height: rem(49);
                        line-height: rem(49);
                        font-size: rem(14);
                        color: #808080;
                        border-bottom: 1px solid #E0E0E0;
                    }
                    .cancel_txt {
                        border:0;
                    }
                    .cancel_txt2 {
                        height: auto;
                        textarea {
                            background-color: #F9F9F9;
                            width: 100%;
                            height: rem(80);
                            resize: none;
                            outline: none;
                            border:0;
                            color: #333;
                            padding: rem(10);
                        }
                    }
                }
            }
        }

    }
    .footer {
        width: 100%;
        height:rem(49);
        button {
            width: 100%;
            height: 100%;
            background-color: #469AF4;
            color: #FFF;
            font-size: rem(16);
            -webkit-border-radius: 0;
            border-radius: 0;
        }
    }
}
</style>
