
<template>
    <div class="imgDetails dis_f flex_d">
        <div class="section_box flex1" id='canvas_box'>
            <div class="section dis_f flex_i" ref='selfReport'  id='imgs'> 
                <div class="img_box" ref='insetElement' >
                     <div class='html_content' ref='html_content' :class="locations?'p-abs':''" id='html'>
                        <div class="canvas_head">
                            <ul>
                                <li>处方编号：<span>{{ canvasdata.number }}</span></li>
                                <li>处方生成时间：<span>{{ canvasdata.start_time | filterTime }}</span></li>
                                <li>处方有效时间：<span>{{ canvasdata.undue_time | filterTime }}</span></li>
                            </ul>
                        </div>
                        <h2>云医康互联网药店电子处方</h2>
                        <div class="canvas_user">
                            <ul>
                                <li>姓名：<span>{{ canvasdata.name }}</span></li>
                                <li>性别：
                                    <span v-show='canvasdata.sex == 1'>男</span>
                                    <span v-show='canvasdata.sex == 2'>女</span>
                                </li>
                                <li>年龄：<span>{{ canvasdata.age }}</span></li>
                            </ul>
                            <ul>
                                <li>肝功能：<span v-text='canvasdata.liver != "" ?canvasdata.liver: "正常" '></span></li>
                                <li>肾功能：<span v-text='canvasdata.kidney != "" ?canvasdata.kidney: "正常" '></span></li>
                                <li>备孕情况：<span v-text='canvasdata.yun != "" ?canvasdata.yun: "无" '></span></li>
                            </ul>
                            <ul>
                                <li>过敏史：<span v-text='canvasdata.allergy != "" ?canvasdata.allergy: "无" '></span></li>
                                <li>过往病史：<span v-text='canvasdata.ago != "" ?canvasdata.ago: "无" '></span></li>
                            </ul>
                            <ul>
                                <li>诊断结果：<span>{{ canvasdata.result }}</span></li>
                            </ul>
                        </div>
                        <div class="canvas_drug">
                            <p>Rp:</p>
                            <ol v-for='(val,i) in durg'>
                                <li class="dis_f"> 
                                    <p>{{val.name}} <b v-show="val.gg">({{val.gg}})</b></p>
                                    <span>*{{ val.num }}</span>
                                </li>
                                <li>用法：<b>{{ val.usage }}</b></li>
                            </ol>
                            <div class="tshi" id='seal'>
                                <img ref='chapter' src="" alt="">
                            </div>
                        </div>
                        <div class="msg">
                            （以下空白，手写无效）
                        </div>
                        <div class="check">
                            <ul>
                                <li><span>处方医师：</span><img ref='doctorImg' src="" alt=""></li>
                            </ul>
                        </div>
                    </div> 
                </div>
                <!-- <div class="btn">
                    <a href="javascript:" @click='canvasImg'><img src="../../common/img/icon_bc.png" alt="" />保存处方到相册</a>
                </div> -->
                
            </div>
        </div>
        
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import html2canvas from 'html2canvas';
export default {
    data () {
        return {
            canvasdata:{},
            durg: [],
            imgUrl: '',
            locations: true,
        }
    },
    created() {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
    },
    mounted () {
        this.initdata();
        var self = this;
    },
    methods: {
        initdata () {
            var self = this;
            this.$http.post('/mobile/doch5/user_recipe_detail', this.$route.query ).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.canvasdata = res.data
                    self.durg = res.drug
                    if(self.canvasdata.signpic) {
                        self.$refs.doctorImg.src = self.$http.baseURL+self.canvasdata.signpic
                    }
                    if (self.canvasdata.seal) {
                        self.$refs.chapter.src = self.$http.baseURL+self.canvasdata.seal
                    }
                    setTimeout(function () {
                        self.canvasImg()
                    },300)
                } else {

                }
            })
        },
         canvasImg () {
            var _this = this;
            var cntElem = document.getElementById('html');
            // cntElem.style['-webkit-transform'] = 'scale(1)'
            var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
            var width = shareContent.offsetWidth ; //获取dom 宽度
            var height = shareContent.offsetHeight; //获取dom 高度
            var canvas = document.createElement("canvas"); //创建一个canvas节点
            var scale = window.devicePixelRatio * 1.5;//获取设备的显示参数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            // _this.$refs.doctorImg.crossOrigin = "Anonymous"; // 图片跨域
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
            var opts = {
                background: null,
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                // useCORS: true, // 【重要】开启跨域配置
                // allowTaint: true,//允许跨域图片
                // taintTest: true,//是否在渲染前测试图片
            };
            html2canvas(shareContent, opts).then(function (canvas) {
                var urls = canvas.toDataURL("image/png");
                //  cntElem.style['display'] = 'none';
                // _this.locations = false;
                // document.getElementById('canvas_box').style['background'] = '#000';
                // cntElem.style['-webkit-transform'] = 'scale(0.5)';
                // Indicator.close();
                // var pics = document.createElement('img');
                // var pics = new Image();
                // pics.src = urls;
                // pics.style['width'] = '100%';
                // pics.style['background'] = '#fff';
                // document.getElementById('imgs').appendChild(pics);
                var t = setTimeout(() => {
                    document.getElementById('imgs').innerHTML = '<img src="'+urls+'" style="width: 100%;background-color: #FFF;" alt="" />';
                    document.getElementById('canvas_box').style['background'] = '#000';
                    Indicator.close();
                    clearTimeout(t)
                }, 0)
            });
        },
        
       
            
    },
    beforeDestroy () {
        Indicator.close();
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}

.imgDetails {
    width: 100%;
    height: 100%;
    font-size: 16px;
    .section_box {
        overflow-y: scroll;
        background-color: #fff;
    }
    .section {
        width: 100%;
        padding: rem(10) 0;
        font-size: rem(14);
        height: 100%;
        align-items: center;
        > .imgs {
            width: 100%;
            height: 100%;
            border: 1px solid red;
            background-color: #fff;
        }
        > .btn {
            position: fixed;
            bottom: rem(23);
            left: 24%;
            width: rem(165);
            line-height: rem(44);
            background:#333;
            text-align: center;
            color: #fff;
            border: 1px solid #333;
            border-radius: rem(23);
            
            > a {
                color: #fff;
                font-weight:400;
                vertical-align: middle;
                > img {
                    width: rem(25);
                    vertical-align: middle;
                    margin-bottom: rem(3);
                }
            }
        }
        .img_box {
            width: 100%;
            height: 100%;
            .p-abs {
                position: absolute;
                top:0;
                left: -200%;
            }
            .html_content {
                background: #fff;
                width: 200%;
                min-height: 100%;
                zoom: 1;
                font-size: rem(14);
                padding: rem(20) rem(20);
                -webkit-transform-origin-x: 0;    /*定义元素被置于x轴的何处*/
                // -webkit-transform: scale(0.5);   /*定义元素被缩放*/
                .canvas_head {
                    width: 100%;
                    >ul {
                        width: 100%;
                        overflow: hidden;
                        li {
                            width: 33%;
                            float: left;
                            font-size: rem(10);
                            line-height: rem(30);
                            letter-spacing: rem(0.5);
                        }
                    }
                }
                h2 {
                    font-size: rem(18);
                    padding: 20px;
                    text-align: center;
                    font-weight: 550;
                    letter-spacing: rem(2);
                    background-color: #FFFFFF;
                }
                .canvas_user {
                    width: 100%;
                    border-bottom:1px dashed #ccc;
                    padding: 10px 0;
                    ul {
                        overflow: hidden;
                        font-size: rem(11);
                        letter-spacing: rem(1);
                        li {
                            width: 33%;
                            float: left;
                            height: 25px;
                            line-height: 25px;
                            font-size: rem(14);
                            letter-spacing: rem(1);
                        }
                    }
                }
                .canvas_drug {
                    width: 100%;
                    padding: 20px 0;
                    position: relative;
                    >p {
                        font-weight: 550;
                        font-size: rem(14);
                    }
                    >ol {
                        margin-top: 10px;
                        font-size: rem(11);
                        margin-left: 20px;
                        li {
                            line-height: rem(30);
                            font-size: rem(14);
                            span {
                                margin-left: rem(14);
                            }
                        }
                    }
                    .tshi {
                        position: absolute;
                        right: rem(30);
                        bottom: rem(10);
                        font-size: rem(10);
                        width: rem(100);
                        height: rem(100);
                        img {
                            width: rem(100);
                            height: rem(100);
                            border-radius: 50%;
                        }
                    }
                }
                .msg {
                    text-align: center;
                    font-size: 14px;
                    line-height: 20px;
                    padding-bottom: 20px;    
                    letter-spacing: rem(1);
                }
                .check {
                    width: 100%;
                    font-size: rem(12);
                    height: 80px;
                    margin-bottom: 20px;
                > ul {
                        width: 100%;
                        overflow: hidden;
                        li {
                            width: 50%;
                            float: left;
                            font-size: rem(14);
                            > img {
                                max-width: 100px;
                                max-height: 70px;
                                display: inline-block;
                                margin-left: 10px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
                
            }
        }
    }
    
}
</style>
