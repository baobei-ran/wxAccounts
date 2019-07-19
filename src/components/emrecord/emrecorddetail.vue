<template>
    <!-- 详情 -->
    <div class="emrecorddetail">
        <div class="emrecorddetail-box">
            <div class="header br-rs">
                <div class="emr-title"><span>李大妞ss医生添加的病历</span></div>
                <div class="emr-usermsg dis_f">
                    <h2>李二牛</h2>
                    <b>|</b>
                    <span>男</span>
                    <b>|</b>
                    <span>25</span>
                </div>
                <p><span>身高/体重</span><span>180cm/70kg</span></p>
            </div>
            <div class="user-msg br-rs">
                <ul>
                    <li><span>备孕情况</span><span>无</span></li>
                    <li><span>吸烟情况</span><span>偶尔吸烟/日平均吸烟量5支/开始吸烟年龄23岁</span></li>
                    <li><span>饮酒情况</span><span>偶尔饮酒/未戒酒/日平均饮酒量半斤/开始饮酒年龄16岁</span></li>
                    <li><span>既往病史</span><span>先天性心脏病、心脏不好、营养不良</span></li>
                    <li><span>药物过敏史</span><span>头孢类抗生素过敏</span></li>
                    <li><span>病情描述</span><span>感冒发烧流鼻涕、感冒发烧流鼻涕、感冒了</span></li>
                </ul>
            </div>
            <div class="user-msg br-rs">
                <ul>
                    <li><span>就诊时间</span><span>无</span></li>
                    <li><span>就诊医院</span><span>偶尔吸烟/日平均吸烟量5支/开始吸烟年龄23岁</span></li>
                    <li><span>就诊科室</span><span>偶尔饮酒/未戒酒/日平均饮酒量半斤/开始饮酒年龄16岁</span></li>
                    <li><span>就诊医生</span><span>先天性心脏病、心脏不好、营养不良</span></li>
                    <li><span>诊断结果</span><span>头孢类抗生素过敏</span></li>
                    <li><span>医嘱图</span><span id='advice'>
                            <img v-for='(val,i) in picdata' :key='i' @click='clickScalePic(i)' :src="val" alt="" />
                        </span></li>
                    <li><span>处方图片</span><span id='recipe'><img v-for='val in 2' src="../../common/img/pic_yptp.png" alt="" /></span></li>
                    <li><span>检验单图片</span><span id='checkout'><img v-for='val in 4' src="../../common/img/pic_yptp.png" alt="" /></span></li>
                </ul>
            </div>
            <!--物流跟踪-->
            <div class="seedata br-rs">
                <div class="track-list">
                    <ul>
                        <li class="li-progress">
                            <i class="node-icon"></i>
                            <div><span>2018-09-09</span><span class="blue">电子处方</span></div>
                            <p><span class="txt">医生</span><span class="time">李二牛</span></p>
                            <p><span class="txt">医院</span><span class="time">山东省立医院</span></p>
                        </li>
                        <li class="li-progress">
                            <i class="node-icon"></i>
                            <div><span>2018-09-09</span><span class="orange">预约门诊</span></div>
                            <p><span class="txt">医生</span><span class="time">李二牛</span></p>
                            <p><span class="txt">医院</span><span class="time">山东省立医院</span></p>
                        </li>
                        <li class="li-progress">
                            <i class="node-icon"></i>
                            <div><span>2018-09-09</span><span class="blue">电子处方</span></div>
                            <p><span class="txt">医生</span><span class="time">李二牛</span></p>
                            <p><span class="txt">医院</span><span class="time">山东省立医院</span></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <transition name="bounce">
            <div class="model-shade" v-show='isModel'>
                <model-pic ref="childs" @modelShade='modelShade' />
            </div>
        </transition>
    </div>
</template>

<script>
import ModelPic from './modelpic'
export default {
    components: {
        'model-pic': ModelPic
    },
    data () {
        return {
            isModel: false,
            picdata: [require('../../common/img/img_dtzs.png'), require('../../common/img/pic_yptp.png'), 'http://test99.yunyikang.cn/upload/doctor/15559967819130.jpg'],
        }
    },
    mounted () {
        
    },
    methods: {
        modelShade (data) {
            this.isModel = data
        },
        clickScalePic(i) {
            this.$refs.childs.modelScalePic(this.picdata, i);
            this.isModel = true
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px/100+rem;
}
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.br-rs {
    -webkit-border-radius:rem(10);
    border-radius: rem(10);
}
.emrecorddetail {
    width: 100%;
    height: 100%;           
    overflow-y: scroll;
    font-size: rem(28);
    background-color: #F4F4F4;
    .emrecorddetail-box {
        width: 100%;
        padding: 0 rem(30);
        margin-bottom: rem(20);
        .header {
            width: 100%;
            margin-top: rem(21);
            background: #fff;
            padding-bottom: rem(25);
            .emr-title {
                font-size: rem(23);
                height: rem(40);
                line-height: rem(40);
                color: #469AF4;
                > span {
                    background-color: #E3F0FD;
                    border-radius: 5px 0 10px 0;
                    padding: rem(8) rem(10);
                    vertical-align: middle;
                }
            }
            .emr-usermsg {
                width: 100%;
                margin-top: rem(30);
                font-size: rem(24);
                padding: 0 rem(30);
                color: #808080;
                h2 {
                    font-size: rem(32);
                    color: #212121;
                    font-weight: 600;
                }
                >b {
                    margin: 0 rem(16);
                }
            }
            >p {
                margin-top: rem(30);
                padding: 0 rem(30);
                font-size: rem(24);
                color: #333;
                span:first-child {
                    color: #808080;
                    margin-right: rem(30);
                }
            }
        }
        .user-msg {
            width: 100%;
            margin-top: rem(20);
            background-color: #fff;
            padding: rem(29);
            ul {
                width: 100%;
                li {
                    padding: rem(13) 0;
                    font-size: rem(24);
                    span {
                        display: inline-block;
                        line-height: rem(36);
                    }
                    span:first-child {
                        width: 25%;
                        color: #808080;
                        vertical-align: top;
                    }
                    span:last-child {
                        width: 74%;
                        color: #333;
                        img {
                            width: rem(88);
                            height: rem(88);
                            margin-right: rem(20);
                        }
                        img:last-child {
                            margin: 0;
                        }
                    }
                }
            }
        }
        .seedata {
            background-color: #fff;
            margin-top: rem(20);
            padding: rem(30);
            .track-list {
                width: 100%;
                ul {
                    .li-progress {
                        border-left: 1px solid #ddd;
                        i {
                            border-left: 1px solid #ddd;
                        }
                    }
                    li {    
                        padding-left: rem(30);
                        font-size: rem(24);
                        position: relative;
                        padding-bottom: rem(36);
                        i {
                            position: absolute;
                            display: block;
                            width: rem(14);
                            height: rem(14);
                            top: 0;
                            left: 0;
                        }   
                        i::after {
                            content: '';
                            top: rem(5);
                            position: absolute;
                            display: block;
                            width: rem(14);
                            height: rem(14);
                            top: rem(5);
                            left: rem(-7);
                            background-color: #469AF4;
                            -webkit-border-radius: 100%;
                            border-radius: 100%;
                        }
                        > div {
                            padding-bottom: rem(10);
                            vertical-align: top;
                            span {
                                display: inline-block;
                                color: #808080;
                            }
                            .blue {
                                padding: rem(6) rem(12);
                                background-color: #469AF4;
                                -webkit-border-radius: rem(16);
                                border-radius: rem(16);
                                color: #fff;
                                font-size: rem(20);
                                margin-left: rem(20);
                            }
                            .orange {
                                padding: rem(6) rem(12);
                                -webkit-border-radius: rem(16);
                                border-radius: rem(16);
                                color: #fff;
                                font-size: rem(20);
                                margin-left: rem(20);
                                background-color: #F09F88;
                            }
                        }
                        p {
                            margin-top: rem(23);
                            color: #808080;
                            span:last-child {
                                color: #333;
                                margin-left: rem(20);
                            }   
                        }
                    }
                    li:first-child {
                        i {
                            border-color: #fff;
                            left: rem(-2);
                        }
                    }
                    li:last-child {
                        border:0;
                    }
                }
            }
        }
    }

    .model-shade {
        position: fixed;
        left: 0;
        top: 0;
        background: #000;
        width: 100%;
        height: 100%;
    }
}


</style>

