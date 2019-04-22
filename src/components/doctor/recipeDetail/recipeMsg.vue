<template>
    <div class="recipe dis_f flex_d">
        <div class="header dis_f flex-hc">
            <img @click='Return' src="../../../common/img/icon_fh.png" alt="">
            <span>处方信息</span>
        </div>
        <div class="flex1 section_box">
            <div class="section">
                <div class="box">
                    <div class="msg">
                        处方已开具24小时，已失效
                    </div>
                    <div class="img">
                        <img src="" alt="">
                        <span @click='getdetails'>查看完整处方</span>
                    </div>
                    <ul>
                        <li><span>处方单号：</span><span>256364878524</span></li>
                        <li><span>开具时间：</span><span>2018-5-49 13:56</span></li>
                        <li><span>处方时效：</span><span>2018-5-49 13:56</span></li>
                        <li><span>开具医生：</span><span>王大夫</span></li>
                    </ul>
                </div>
                <div class="user">
                    <ul>
                        <li><span>患者信息：</span><span>随机数</span></li>
                        <li><p>患者主诉：</p><p >阿卡萨开心爱马仕锁库存京东数科成都市是的超级多收款流程德赛电池健康的三轮车</p></li>
                        <li><span>诊断结果:</span><span>售楼处开始从</span></li>
                    </ul>
                </div>
                <div class="usage">
                    <div class="title">
                        处方中药品：
                    </div>
                    <div class="usage_con">
                        <dl>
                            <dt>板蓝根冲剂 <span>x1</span></dt>
                            <dd class="dis_f">
                                <p>用法用量：</p>
                                <p>开水冲服，一次10克，一日三次，重症加倍</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt>板蓝根冲剂 <span>x1</span></dt>
                            <dd>
                                <p>用法用量：</p>
                                <p>开水冲服，一次10克，一日三次，重症加倍</p>
                            </dd>
                        </dl>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            recipedata: ''
        }
    },
    mounted() {
        console.log(this.$route.params)
        
    },
    methods: {
        initdata () {   // 处方详情
            var self = this,
                uid = this.$cookie.get('userLogins');
            var obj = { uid: uid }
            this.$http.post('', obj).then(res => {
                console.log(res)
            })
        },
        Return () {
            this.$router.back()
        },
        getdetails () {
            this.$router.push({name: 'imgdetails', params: this.$route.params})
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.recipe {
    width: 100%;
    height: 100%;
    font-size: rem(16);
    .header {
        width: 100%;
        height: rem(40);
        color: #212121;
        position: relative;
        box-shadow:0px 1px 0px 0px rgba(224,224,224,1);
        padding-top: rem(0);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        img {
            font-size: rem(30);
            position: absolute;
            left: rem(15);
            top: rem(12);
            line-height: 1;
            font-size: rem(19);
            width: rem(20);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .section_box {
        overflow-y: scroll;
    }
    .section {
        width: 100%;
        padding: rem(15);
        .msg {
            width: 100%;
            height: rem(25);
            background-color: #E1F0FE;
            line-height: rem(25);
            padding-left: rem(15);
            color: #4A9CF3;
            font-size: rem(12);
        }
        .box {
            width: 100%;
            background:rgba(255,255,255,1);
            box-shadow:0px rem(2) rem(5) 0px rgba(0, 0, 0, 0.2);
            border-radius:4px;
            padding: rem(15);
            .img {
                width: 100%;
                height: rem(150);
                position: relative;
                // background: #000;
                // opacity: .1;
                overflow: hidden;
                img {
                    width: 100%;
                }
                span {
                    position: absolute;
                    bottom: rem(15);
                    left: 33%;
                    padding: rem(10) rem(16) rem(10) rem(24);
                    opacity: .4;
                    color: #fff;
                    display: block;
                    border-radius: rem(15);
                    font-size: rem(13);
                    background: #000 url(../../../common/img/icon_ckcf.png)
                        no-repeat rem(5);
                    font-size: rem(14);
                    background-size:15%;
                }
            }
            >ul {
                width: 100%;
                li {
                    width: 100%;
                    font-size: rem(14);
                    padding-top: rem(15);
                    span:first-child {
                        color: #808080;
                    }
                    span:last-child {
                        color: #333;
                        padding-left: rem(15);
                    }
                }
            }
        }
        
        .user, .usage {
            width: 100%;
            background:rgba(255,255,255,1);
            box-shadow:0px rem(2) rem(5) 0px rgba(0, 0, 0, 0.2);
            border-radius:4px;
            padding: rem(15);
            margin-top: rem(5);
            ul {
                li {
                    display: -webkit-flex;
                    display: flex;
                    font-size: rem(14);
                    margin-top: rem(15);
                    span:first-child {
                        color: #808080;
                    }
                    span:last-child {
                        color: #333;
                        padding-left: rem(15);
                    }
                    p:first-child {
                        color: #808080;
                        width: 25%
                    }
                    p:last-child {
                        width: 74%;
                    }
                }
            }
        }
        .usage {
            width: 100%;
            font-size: rem(14);
            padding:0;
            .title {
                color: #808080;
                font-weight:400;
                line-height: rem(17);
                padding: rem(15);
                border-bottom: 1px solid #E6E6E6;
            }
            .usage_con {
                padding: 0 rem(15);
                 dl:first-child {
                    border-top: 0!important;
                }
                dl {
                    padding:rem(15) 0;
                    border-top: 1px dashed #e6e6e6;
                    dt {
                        color: #333;
                    }
                    dd {
                        color: #808080;
                        line-height: rem(20);
                        margin-top: rem(5);
                        justify-content: space-between;
                        display: flex;
                        p:first-child {
                            width: 26%;
                        }
                    }

                }
            }
           
            
        }
    }
    
}
</style>

