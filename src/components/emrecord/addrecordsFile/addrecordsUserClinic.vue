<template>
    <!-- 添加病历-- 诊疗信息 -->
    <div class="addrecordsUserClinic dis_f flex_c">
        <div class="content-box flex1">
            <div class="contents">
                <div class="contents-header dis_f dis_sb bg-white">
                    <div class="dis_f contents-header-left">
                        <h2>李二牛</h2>
                        <b>|</b>
                        <span>男</span>
                        <b>|</b>
                        <span>25</span>
                    </div>
                    <div class="contents-header-right">本人</div>
                </div>
                <div class="contents-progress bg-white">
                    <ul class="dis_f">
                        <li></li>
                        <li class="ul-right li-active"></li>
                    </ul>
                    <ol class="dis_f">
                        <li>健康信息</li>
                        <li>诊疗信息</li>
                    </ol>
                </div>
                <div class="add-info">
                    <ul class="bg-white">
                        <li class="dis_f">
                            <span>就诊时间</span>
                            <p @click='selectdete'><span>{{ dateTime }}</span><img src="../../../common/img/icon_xzrq.png" alt="" /></p>
                        </li>
                        <li><span>就诊医院</span><input type="text" placeholder="请填写就诊医院"/></li>
                        <li><span>就诊科室</span><input type="text" placeholder="请填写就诊科室"/></li>
                        <li><span>就诊医生</span><input type="text" placeholder="请填写就诊医生姓名"/></li>
                        <li><span>诊断结果</span><textarea placeholder="请填写诊断结果"></textarea></li>
                    </ul>
                </div>
                <div class="add-pic-box bg-white">
                    <h2>上传医嘱<span>（不超过4张）</span></h2>
                    <div class="add-pic">
                        <ul class="dis_f">
                            <li class="dis_f flex-vc flex-hc" v-for="(val,i) in filesbase64" :key='i+"_1"'><img :src="val" alt="" /><img class="pic-cancel" @click='cancelPic(i,$event)' src="../../../common/img/icon_sc2.png" alt=""></li>
                            <li class="upfile" v-if="files.length < 4"><input type="file" @change='clickAddPic($event)' accept="image/*" id="files" /><label for="files"><img src="../../../common/img/pic_tjtp.png" alt="" /></label></li>
                        </ul>
                    </div>
                </div>
                <div class="add-pic-box bg-white">
                    <h2>上传处方<span>（不超过4张）</span></h2>
                    <div class="add-pic">
                        <ul class="dis_f">
                            <li class="dis_f flex-vc flex-hc" v-for="(val,i) in filesbase642" :key='i+"_2"'><img :src="val" alt="" /><img class="pic-cancel" @click='cancelPic2(i)' src="../../../common/img/icon_sc2.png" alt=""></li>
                            <li class="upfile" v-if="files2.length < 4"><input type="file" @change='clickAddPic2($event)' accept="image/*" id="files2" /><label for="files2"><img src="../../../common/img/pic_tjtp.png" alt="" /></label></li>
                        </ul>
                    </div>
                </div>
                <div class="add-pic-box bg-white">
                    <h2>上传检验单图片<span>（不超过4张）</span></h2>
                    <div class="add-pic">
                        <ul class="dis_f">
                            <li class="dis_f flex-vc flex-hc" v-for="(val,i) in filesbase643" :key='i+"_3"'><img :src="val" alt="" /><img class="pic-cancel" @click='cancelPic3(i)' src="../../../common/img/icon_sc2.png" alt=""></li>
                            <li class="upfile" v-if="files3.length < 4"><input type="file" @change='clickAddPic3($event)' accept="image/*" id="files3" /><label for="files3"><img src="../../../common/img/pic_tjtp.png" alt="" /></label></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" v-show="hidShow">
            <mt-button @click.native="handleClickSubmit">完成</mt-button>
        </div>
        <!-- 日期选择 -->
        <mt-datetime-picker
            ref="picker1"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            :startDate="startDate"
            @confirm="handleConfirm">
        </mt-datetime-picker>

    </div>
</template>

<script>
export default {
    data () {
        return {
            isModel: false,
            hidShow: true, // 底部按钮的控制
            docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
            showHeight: document.documentElement.clientHeight, // 实时屏幕高度
            files: [],              // 上传医嘱的文本流
            filesbase64: [],        // 上传医嘱的展示
            files2: [],             // 上传处方的文本流
            filesbase642: [],       // 上传处方的展示
            files3: [],             // 上传检验单图片的文本流
            filesbase643: [],       // 上传检验单图片的展示
            startDate: new Date(),  // 默认当前日期
            dateTime: '',               // 就诊时间
        }
    },
    mounted () {
        var self = this;
        window.onresize = () => {
            return (() => {
                this.showHeight = document.body.clientHeight
            })()
        }
        var value = new Date();
        var year = value.getFullYear();
        var month = value.getMonth() + 1;
        var date = value.getDate();
        this.dateTime = year+'年'+ month+'月'+date+'日';
    },
    watch: {
        showHeight: function () {
            if (this.docmHeight > this.showHeight) {
                this.hidShow = false
            } else {
                this.hidShow = true
            }
        },
    },
    methods: {
        handleClickSubmit () { // 提交
            if (this.files.length <= 0) {
                this.$toast({
                    message: '请选择上传医嘱图片',
                    position: 'middle',
                    duration: 2000
                });
                return;
            }

            this.$indicator.open({
                text: '上传中...',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                this.$indicator.close();
            }, 3000)
        },
        clickAddPic (e) { // 医嘱上传
            var self = this;
            if (!window.FileReader) {
                alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
            }
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            self.files.push(files[0]);
            var reader = new FileReader();
            reader.onload = (e) => {
                self.getBase64(e.target.result).then(file => {
                    self.filesbase64.push(file)
                })
            }
            reader.readAsDataURL(files[0])
            e.target.value = '';
        },
        cancelPic(i,e) {  // 医嘱删除
            e.stopPropagation(); // 阻止
            this.files.splice(i, 1);
            this.filesbase64.splice(i, 1);
        },
        clickAddPic2 (e) { // 处方上传
            var self = this;
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var reader = new FileReader();
            self.files2.push(files[0]);
            reader.onload = (e) => {
                self.getBase64(e.target.result).then(file => {
                    self.filesbase642.push(file)
                })
            }
            reader.readAsDataURL(files[0]);
            e.target.value = '';
        },
        cancelPic2 (i) {  // 处方删除
            this.files2.splice(i, 1);
            this.filesbase642.splice(i, 1);
            
        },
        clickAddPic3 (e) { // 检验单图片上传
            var self = this;
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var reader = new FileReader();
            self.files3.push(files[0]);
            reader.onload = (e) => {
                self.getBase64(e.target.result).then(file => {
                    self.filesbase643.push(file)
                })
            }
            reader.readAsDataURL(files[0]);
            e.target.value = '';
        },
        cancelPic3 (i) {  // 检验单图片删除
            this.files3.splice(i, 1);
            this.filesbase643.splice(i, 1);
            
        },
        selectdete () { // 弹起日期选择
            this.$refs.picker1.open();
        },
        handleConfirm (value) {
            var year = value.getFullYear();
            var month = value.getMonth() + 1;
            var date = value.getDate();
            this.dateTime = year+'年'+ month+'月'+date+'日'
        },
         // 图片压缩并保存到files
        getBase64(url) {
            var self = this;
            var Img = new Image(),
                dataURL = '';
            Img.src = url;
            var p = new Promise(function (resolve, reject) {
                Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
                    var canvas = document.createElement("canvas"), //创建canvas元素
                        width = Img.width, //确保canvas的尺寸和图片一样
                        height = Img.height;
                    // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
                    var ratio = width / height,
                        maxLength = 1000,
                        newHeight = height,
                        newWidth = width;
                    // 在长宽超过最大长度时，按图片长宽比例等比缩小
                    if (width > maxLength || height > maxLength) {
                        if (width > height) {
                            newWidth = maxLength;
                            newHeight = maxLength / ratio;
                        } else {
                            newWidth = maxLength * ratio;
                            newHeight = maxLength;
                        }
                    }
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#fff"; // 改变canvas黑色的背景色
                    ctx.fillRect(0, 0, canvas.width, canvas.height);  
                    ctx.drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvas中
                    dataURL = canvas.toDataURL('image/jpeg', 0.7); //转换图片为dataURL
                    resolve(dataURL);
                };
            });
            return p
        },
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 100+rem;
}
.addrecordsUserClinic {
    width: 100%;
    height: 100%;
    font-size: rem(28);
    background-color: #f4f4f4;
    .content-box {
        width: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .contents {
            width: 100%;
            margin-bottom: rem(20);
            .contents-header {
                width: 100%;
                padding: 0 rem(30);
                height: rem(98);
                line-height: rem(98);
                &-left {
                    color: #333;
                    b {
                        margin: 0 rem(10);
                        color: #aaa;
                        vertical-align: middle;
                    }
                }
                &-right {
                    width: 50%;
                    text-align: right;
                    color: #808080;
                }
            }
            .contents-progress {
                width: 100%;
                height: rem(140);
                margin-top: rem(20);
                ul {
                    width: 100%;
                    padding-top: rem(38);
                    position: relative;
                    li {
                        display: inline-block;
                        width: 50%;
                        height: 2px;
                        background-color: #469AF4;
                    }
                    li::after {
                        position: absolute;
                        left: 25%;
                        margin-top: rem(-8);
                        content: '';
                        display: block;
                        width: rem(20);
                        height: rem(20);
                        background-color: #469AF4;
                        -webkit-border-radius: 100%;
                        border-radius: 100%;
                    }
                    .ul-right::after {
                        left: 75%;
                    }
                    .li-active::after {
                        width: rem(42);
                        height: rem(42);
                        margin-top: rem(-20);
                        -webkit-transform: translateX(-50%);
                        transform: translateX(-50%);
                        background: url('../../../common/img/icon_xz.png') no-repeat;
                        background-size: cover;
                    }
                }
                ol {
                    margin-top: rem(30);
                    li {
                        width: 50%;
                        color: #333;
                        font-weight:600;
                        text-align: center;
                    }
                    li:first-child {
                        color: #808080;
                    }

                }
            }
            .add-info {
                width: 100%;
                > ul {
                    margin-top: rem(20);
                    padding: 0 rem(30);
                    li {
                        height: rem(98);
                        line-height: rem(98);
                        color: #333;
                        span {
                            display: inline-block;
                            width: 25%;
                        }
                        input {
                            width: 70%;
                            padding: rem(10) 0;
                            border:0;
                        }
                        textarea {
                            display: block;
                            width: 100%;
                            height: rem(120);
                            color: #333;
                            border:0;
                            background-color: #F9F9F9;
                            padding: rem(20);
                            resize: none;
                        }
                        > p {
                            span {
                                display: inline;
                                color: #808080;
                                vertical-align: middle;
                            }
                            img {
                                margin-left: rem(17);
                                width: rem(44);
                                vertical-align: middle;
                                margin-top: rem(-4);
                            }
                        }
                    }
                    li:last-child {
                        height: auto;
                        padding-bottom: rem(30);
                    }
                }
            }
            .add-pic-box {
                width: 100%;
                margin-top: rem(20);
                padding: rem(30);
                h2 {
                    color: #333;
                    span {
                        font-size: rem(24);
                        color: #808080;
                    }
                }
                .add-pic {
                    width: 100%;
                   > ul {
                        width: 100%;
                        margin-top: rem(30);
                        li {
                            width: rem(150);
                            height: rem(150);
                            position: relative;
                            margin-right: rem(30);
                            text-align: center;
                            line-height: rem(150);
                            border: 1px dashed #eee;
                            -webkit-border-radius: rem(8);
                            border-radius: rem(8);
                            img {
                                width: 100%;
                                height: 100%;
                            }
                            .pic-cancel {
                                position: absolute;
                                top: rem(-20);
                                right: rem(-20);
                                width: rem(44);
                                height: rem(44);
                            }
                            input {
                                display: none;
                            }
                            label {
                                display: block;
                            }
                        }
                        li:last-child {
                            margin: 0;
                        }
                        .upfile {
                            border: 0;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
    .footer {
        width: 100%;
        height: rem(98);
        button {
            width: 100%;
            height: rem(98);
            background-color: #469AF4;
            color: #fff;
            font-size: rem(32);
            -webkit-border-radius: 0;
            border-radius: 0;
        }
    }
}
</style>

