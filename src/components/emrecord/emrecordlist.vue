<template>
    <!-- 电子病历列表 -->
    <div class="emrecord dis_f flex_c">
        <div class="header">
            <span>筛选就诊人</span>
            <span>|</span>
            <span @click="electmsg">患者{{userinfo}}</span>
        </div>
        <div class="content-box">
            <div class="contents">
                <div class="emr-data emr-wperfection">
                    <div class="emr-usermsg dis_f">
                        <h2>李二牛</h2>
                        <b>|</b>
                        <span>男</span>
                        <b>|</b>
                        <span>25</span>
                    </div>
                    <div class="empty-pic">
                        <img src="../../common/img/pic_swws.png" alt="">
                        <p>尚未完善病历及健康信息</p>
                    </div>
                    <div class="emr-btn">
                        <mt-button @click.native="handleClick(1)">完善资料</mt-button>
                    </div>
                </div>
                <div class="emr-data">
                    <p class="user-pic"><img src="../../common/img/pic_wdys_ystx.png" alt=""></p>
                    <div class="emr-usermsg dis_f">
                        <h2>李二牛</h2>
                        <b>|</b>
                        <span>男</span>
                        <b>|</b>
                        <span>25</span>
                    </div>
                    <ul class="emr-msg">
                        <li><span>身高/体重</span><span>183cm/70kg</span></li>
                        <li><span>病情描述</span><span>感冒发烧流鼻涕嗓子痛全身痛，哪里都不舒服，浑身难受</span></li>
                        <li><span>既往病史</span><span>遗传性高血压</span></li>
                    </ul>
                    <div class="emr-btn">
                        <mt-button @click.native="handleClick()">完善资料</mt-button>
                    </div>
                </div>
                <div class="emr-datalist" v-for="(val, i) in 4" :key='i'>
                    <h1>
                        <span></span>
                        <span>2019-09-09 09:00</span>
                    </h1>
                    <div class="emr-datalist-box" @click='outdetail()'>
                        <div class="emr-title"><span>李大妞ss医生添加的病历</span></div>
                        <div class="emr-data emr-data-content">
                            <p class="user-pic"><img src="../../common/img/pic_wdys_ystx.png" alt=""></p>
                            <div class="emr-usermsg dis_f">
                                <h2>李二牛</h2>
                                <b>|</b>
                                <span>男</span>
                                <b>|</b>
                                <span>25</span>
                            </div>
                            <ul class="emr-msg">
                                <li><span>患者主诉</span><span>感冒发烧流鼻涕嗓子痛全身痛，哪里都不舒服，浑身难受。</span></li>
                                <li><span>诊断结果</span><span>感冒发烧流鼻涕嗓子痛全身痛，哪里都不舒服，浑身难受</span></li>
                                <li><span>医嘱小结</span><span>遗传性高血压</span></li>
                            </ul>
                            <div class="emr-foot-pic dis_f dis_end">
                                <ul class="dis_f">
                                    <li><img src="../../common/img/pic_yptp.png" alt=""></li>
                                    <li><img src="../../common/img/pic_yptp.png" alt=""></li>
                                    <li><img src="../../common/img/pic_yptp.png" alt=""></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="data-empty" v-show="isStatus">
                    <img src="../../common/img/pic_zwysfsbl.png" alt="">
                    <p>暂无医生发送病历</p>
                </div>
                <div>
                    <empty />
                </div>
            </div>
        </div>

        <mt-popup style="width: 100%;"
            v-model="popupVisibles"
            position="bottom">
            <relation @usermsg='usermsg' />
        </mt-popup>

    </div>
</template>

<script>
import relation from './emrchildren/relation';  // 选择患者关系组件
import empty from './emrchildren/dzblempty'
export default {
    name: 'emrecordlist',
    components: {
        relation:relation,
        empty: empty
    },
    data () {
        return {
            popupVisibles: false,       // 选择关系人弹框
            isStatus: false,            // 无数据源提示
            userinfo: '本人',               // 选择的信息
        }
    },
    methods: {
        handleClick (id) {  // 完善资料
            if (id == 1) {
                this.$router.push({path:'/emrecorddetail', query: { id: id }})
                return;
            }
            this.out('/addrecordsUserinfo')
            // this.out('/addrecordsUserClinic')
        },
        outdetail (id) { // 查看详情
            this.$router.push({path:'/emrdetails', query: { id: id }})
            // this.$router.push({path:'/emrecorddetail', query: { id: id }})
        },
        usermsg (v) {
            var self = this;
            this.userinfo = v.name
            var t = setTimeout(() => {
                self.popupVisibles = v.box
                clearTimeout(t)
            }, 100)
            console.log(v)
        },
        electmsg () {
            this.popupVisibles = true
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50+rem;
}
.emrecord {
    width: 100%;
    font-size: rem(14);
    height: 100%;
    background-color: #F4F4F4;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .header {
        width: 100%;
        height: rem(45);
        line-height: rem(45);
        padding: 0 rem(15);
        background-color: #fff;
        span:first-child {
            color: #333;
        }
        span:nth-child(2) {
            color: #AAAAAA;
            padding: 0 rem(10);
        }
        span:last-child {
            color: #469AF4;
            padding-left: rem(17);
            background: url('../../common/img/icon_sx.png') no-repeat left center;
        }
    }
    .content-box {
        width: 100%;
        .contents {
            width: 100%;
            padding:0 rem(15);
            .emr-data {
                margin-top: rem(10);
                width: 100%;
                border-radius: rem(5);
                background-color: #fff;
                padding: rem(15);
                position: relative;
                .user-pic {
                    position: absolute;
                    top: rem(15);
                    right: rem(15);
                    img {
                        width: rem(44);
                        height: rem(44);
                        border-radius: 100%;
                    }
                }
                .emr-usermsg {
                    width: 100%;
                    font-size: rem(14);
                    h2 {
                        font-size: rem(16);
                        color: #212121;
                        font-weight: 600;
                    }
                    >b {
                        color: #E0E0E0;
                        margin: 0 rem(8);
                    }
                }
                .emr-msg {
                    margin-top: rem(15);
                    width: 100%;
                    >li {
                        padding: rem(2) 0;
                        overflow: hidden;
                        font-size: rem(12);
                        span {
                            display: inline-block;
                            line-height: rem(23);
                        }
                        span:first-child {
                            width: 20%;
                            vertical-align: top;
                            color:#808080;
                        }
                        span:last-child {
                            width: 78%;
                            color: #333;
                        }
                    }
                    > li:first-child {
                            span:last-child {
                                width: 62%;
                            }
                        }
                }
                .emr-btn {
                    text-align: right;
                    margin-top: rem(10);
                    button {
                        padding: rem(7);
                        height: auto;
                        font-size: rem(12);
                        border:1px solid #469AF4;
                        color: #469AF4;
                        background-color: #fff;
                    }
                }
            }

            .emr-datalist {
                width: 100%;
                margin-top: rem(10);
                >h1 {
                    font-size: rem(14);
                    height: rem(30);
                    line-height: rem(30);
                    span:first-child {
                        display: inline-block;
                        width: rem(10);
                        height: rem(10);
                        background-color: #469AF4;
                        border-radius: 100%;
                        margin-right: rem(6);
                    }
                }
                .emr-datalist-box {
                    width: 100%;
                    background-color: #fff;
                    border-radius: 5px;
                    > .emr-title {
                        font-size: rem(11);
                        height: rem(22);
                        line-height: rem(20);
                        color: #fff;
                        > span {
                            background-color: #469AF4;
                            border-radius: 5px 0 10px 0;
                            padding: rem(4) rem(5);
                            vertical-align: middle;
                        }
                    }
                    .emr-data-content {
                        margin-top: rem(0);
                        .user-pic {
                            top: rem(0);
                        }
                    }
                    .emr-foot-pic {
                        width: 100%;
                        margin-top: rem(7);
                        ul {
                            width: 80%;
                            li {
                                margin-right: rem(7);
                                img {
                                    width: rem(39);
                                    height: rem(33);
                                }
                            }
                        }
                    }
                }
            }

            .emr-wperfection {
                .empty-pic {
                    width: 100%;
                    text-align: center;
                    img {
                        margin-top: rem(14);
                        width: rem(62);
                        height: rem(60);
                    }
                    p {
                        margin-top: rem(12);
                        color: #808080;
                        font-size: rem(12);
                    }
                }
            }

            .data-empty {
                width: 100%;
                background-color: #fff;
                margin-top: rem(10);
                padding-top: rem(60);
                padding-bottom: rem(70);
                text-align: center;
                img {
                    width: rem(150);
                    height: rem(150);
                }
                p {
                    margin-top: rem(9);
                    color: #333;
                    font-size: rem(13);
                }
            }
        }
    }
    
}
</style>

