<template>
    <!-- 详情 -->
    <div class="emrecorddetail">
        <div class="emrecorddetail-box">
            <div class="header br-rs">
                <div class="emr-title"><span>创建时间：2019-07-23</span></div>
                <div class="emr-usermsg dis_f">
                    <h2>李二牛</h2>
                    <b>|</b>
                    <span>男</span>
                    <b>|</b>
                    <span>25岁</span>
                </div>
            </div>
            <div class="user-msg br-rs">
                <ul>
                    <li>
                        <h2>主诉</h2>
                        <p><span>身高/体重</span><span>无</span></p>
                        <p><span>疾病描述</span><span>无</span></p>
                    </li>
                    <li>
                        <h2>现病史</h2>
                        <p>感冒发烧流鼻涕、感冒发烧流鼻涕、感冒了</p>
                    </li>
                    <li>
                        <h2>既往病史</h2>
                        <p>先天性心脏病、心脏不好、营养不良</p>
                    </li>
                </ul>
            </div>
            <div class="user-msg br-rs">
                <h1>其他健康指标</h1>
                <ul>
                    <li><span>肝功能</span><span>无</span></li>
                    <li><span>肾功能</span><span>偶尔吸烟/日平均吸烟量5支/开始吸烟年龄23岁</span></li>
                    <li><span>药物过敏史</span><span>偶尔饮酒/未戒酒/日平均饮酒量半斤/开始饮酒年龄16岁</span></li>
                    <li><span>备孕情况</span><span>先天性心脏病、心脏不好、营养不良</span></li>
                    <li><span>吸烟情况</span><span>头孢类抗生素过敏</span></li>
                    <li><span>饮酒情况</span><span>头孢类抗生素过敏</span></li>
                </ul>
            </div>
            <div class="user-msg br-rs">
                <ul>
                    <li>
                        <h2>诊断</h2>
                        <p>感冒发烧流鼻涕</p>
                    </li>
                    <li>
                        <h2>医嘱小结</h2>
                        <p><span>复诊时间</span><span>三天后</span></p>
                        <p>注意多喝热水、早点睡不要熬夜。</p>
                    </li>
                    <li id='drug-pic'>
                        <img v-for='(val,i) in picdata' :key='i' @click="clickScalePic(i)" :src="val" alt="" />
                    </li>
                </ul>
            </div>
            <div class="footer user-msg br-rs">
                <ul>
                    <li><span>医生</span><span>李二牛</span></li>
                    <li><span>医院</span><span>山东省立医院</span></li>
                </ul>
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
            picdata: [require('../../common/img/pic_yptp.png'),'http://test99.yunyikang.cn/upload/doctor/15559967819130.jpg',require('../../common/img/pic_yptp.png')]
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
    background-color: #fff;
}
.emrecorddetail {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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
                    padding: rem(8) rem(22);
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
        }
        .user-msg {
            width: 100%;
            margin-top: rem(20);
            background-color: #fff;
            padding: rem(29);
            >h1 {
                font-size: rem(26);
                color: #333;
                font-weight: 600;
                margin-bottom: rem(20);
            }
            ul {
                width: 100%;
                li {
                    padding: rem(13) 0;
                    font-size: rem(24);
                    h2 {
                        font-size: rem(26);
                        color: #333;
                        font-weight: 600;
                    }
                    p {
                        color: #808080;
                        line-height:rem(36);
                        margin-top: rem(22);
                    }
                    span {
                        display: inline-block;
                        line-height: rem(36);
                        color: #808080;
                    }
                    span:first-child {
                        width: 25%;
                        vertical-align: top;
                    }
                    span:last-child {
                        width: 74%;
                        img {
                            width: rem(88);
                            height: rem(88);
                            margin-right: rem(23);
                        }
                    }
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
       .footer {
          span:last-child {
              color: #333;
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

