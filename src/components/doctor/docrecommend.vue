<template>
    <!-- 预约信息 -->
    <div class="docrecommend dis_f flex_c">
        <div class="section flex1">
            <div class="section_box">
                <ul class="user_msg">
                    <li>
                        <img src='../../common/img/pic_wdys_ystx.png' alt='' />
                        <span>张张医生向您推荐了张张的门诊时间，建议您前去就诊</span>
                    </li>
                    <li>
                        <h4>病情描述：</h4>
                        <textarea maxlength="200" placeholder="输入你的病情描述，方便医生进一步了解你的病情"></textarea>
                    </li>
                </ul>
                <ol class="doc_msg">
                    <li><span>医生信息</span><span>张张</span></li>
                    <li><span>就诊地址</span><span>北京市清华大学附属医院北京市清华大学附属医院北京市清华大学附属医院北京市清华大学附属医院</span></li>
                    <li><span>就诊科室</span><span>眼科</span></li>
                    <li><span>预约时间</span><span>2017年8月27日 周四 上午8:00-12:00</span></li>
                    <li><span>预约类型</span><span>专家门诊</span></li>
                    <li><span>费用金额</span><span>100元</span></li>
                </ol>
            </div>
        </div>
        <div class="footer">
            <mt-button type="primary" @click.native='handerdoc'>预约张医生</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'docrecommend',
    data () {
        return {

        }
    },
    methods: {
        handerdoc: function () {

        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.docrecommend {
    width: 100%;
    height: 100%;
    font-size: rem(14);
    background-color: #F4F4F4;
    .section {
        width: 100%;
        .section_box {
            width: 100%;
            .user_msg {
                width: 100%;
                li:first-child {
                    padding: rem(15);
                    background:rgba(240,159,136,.1);
                    img {
                        width: rem(44);
                        height: rem(44);
                        -webkit-border-radius: 100%;
                        border-radius: 100%;
                        display: block;
                        float: left;
                        margin-right: rem(14);
                    }
                    > span {
                        color: #F09F88;
                        font-size: rem(15);
                        line-height: rem(23);
                    }
                }
                li:last-child {
                    padding: rem(15);
                    background: #FFF;
                    h4 {
                        margin-bottom: rem(15);
                        color: #808080;
                        font-size: rem(14);
                    }
                    textarea {
                        width: 100%;
                        height: rem(80);
                        resize: none;
                        border: 1px solid #E0E0E0;
                        background-color: #F9F9F9;
                        padding: rem(11);
                    }
                }
            }
            .doc_msg {
                width: 100%;
                margin-top: rem(10);
                background-color: #fff;
                padding: rem(20) rem(16);
                li {
                    margin-top: rem(20);
                    font-size: rem(14);
                    overflow: hidden;
                    span {
                        display: block;
                        float: left;
                        line-height: rem(17);
                    }
                    > span:first-child {
                        color: #808080;
                        width: 22%;
                    }
                    > span:last-child {
                        color: #212121;
                        width: 76%;
                    }
                }
                li:first-child {
                    margin: 0;
                }
            }
        }
    }
    .footer {
        width: 100%;
        height: rem(49);
        button {
            width: 100%;
            height: 100%;
            background-color: #469AF4;
            color: #fff;
            font-size: rem(16);
        }
    }
}
</style>
