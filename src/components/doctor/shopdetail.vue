<template>
    <div class="detail bg_f">
        <div class="fiexd">
            <img class="backs" @click='Return' src="../../common/img/icon_return.png" alt="">
            <!-- <div><img src="../../common/img/icon_tj.png" alt="">推荐</div> -->
        </div>
       <div class="content flex1">
            <div class="bg_f imgarr">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(val,i) in pics' :key='i'>
                            <img :src="$http.baseURL+val.img" alt="">
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="title bg_f">
                <span class="price" >￥<span style='font-size: .28rem;'>{{ datalist.price }}</span></span>
                <h4>{{ datalist.name }}</h4>
                <p><span>{{ datalist.sales_volume }}</span>人购买</p>
            </div>
            <section class="detail_con bg_f" v-if='datalist.type == 1? true:false'>        <!--  1 药品 2 保健品 3 医疗器械 -->
                <ul>
                    <li><span>商品类型：</span><span>{{ datalist.recipe }}</span></li>
                    <li><span>商品剂型：</span><span>{{ datalist.type2 }}</span></li>
                    <li><span>商品用法：</span><span>{{ datalist.usetype }}</span></li>
                </ul>
                <ul>
                    <li><span>规格：</span><span>{{ datalist.specification }}</span></li>
                    <li><span>成分：</span><span>{{ datalist.type2 }}</span></li>
                    <li><span>性状：</span><span>{{ datalist.usetype }}</span></li>
                    <li><span>功能主治：</span><span>{{ datalist.attending_functions }}</span></li>
                    <li><span>用法用量：</span><span>{{ datalist.dose }}</span></li>
                    <li><span>生产厂家：</span><span>{{ datalist.enterprise }}</span></li>
                    <li><span>有效期：</span><span>{{ datalist.uselife }}</span></li>
                    <li><span>批准文号：</span><span>{{ datalist.code }}</span></li>
                    <li><span>注意事项：</span><span>{{ datalist.cautions }}</span></li>
                </ul>
            </section>
            <section class="detail_con bg_f" v-if='datalist.type == 2?true:false'>
                <ul>
                    <li><span>保健功能：</span><span>{{ datalist.health }}</span></li>
                    <li><span>商品剂型：</span><span>{{ datalist.type2 }}</span></li>
                    <li><span>商品用法：</span><span>{{ datalist.usetype }}</span></li>
                </ul>
                <ul>
                    <li><span>规格：</span><span>{{ datalist.specification }}</span></li>
                    <li><span>成分：</span><span>{{ datalist.type2 }}</span></li>
                    <li><span>性状：</span><span>{{ datalist.usetype }}</span></li>
                    <li><span>适宜人群：</span><span>{{ datalist.appropriate }}</span></li>
                    <li><span>用法用量：</span><span>{{ datalist.dose }}</span></li>
                    <li><span>生产厂家：</span><span>{{ datalist.enterprise }}</span></li>
                    <li><span>有效期：</span><span>{{ datalist.uselife }}</span></li>
                    <li><span>批准文号：</span><span>{{ datalist.code }}</span></li>
                    <li><span>注意事项：</span><span>{{ datalist.cautions }}</span></li>
                </ul>
            </section>
            <section class="detail_con bg_f" v-if='datalist.type == 3?true:false'>
                <ul>
                </ul>
                <ul>
                    <li><span>型号：</span><span>{{ datalist.model }}</span></li>
                    <li><span>生产企业：</span><span>{{ datalist.enterprise }}</span></li>
                    <li><span>适宜人群：</span><span>{{ datalist.appropriate }}</span></li>
                    <li><span>使用方法：</span><span>{{ datalist.usetype }}</span></li>
                    <li><span>注意事项：</span><span>{{ datalist.cautions }}</span></li>
                </ul>
            </section>
            <div class="cont_img">
                <img v-for='(val,i) in imgs' :key='i' :src="$http.baseURL+val.img" alt="">
            </div>
       </div>
        <div class="footer">
                <mt-button class="btnback" type="default"  @click.native='doctorShop'>店铺首页</mt-button>
                <mt-button class="clickup" type="primary" @click.native="cerateOrder">立即购买</mt-button>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    data () {
        return {
            datalist:{
                attending_functions: "",
                cautions: "",
                code: "",
                dose: "",
                enterprise: "",
                name: "",
                pic: "",
                price: "",
                recipe: 1,
                sales_volume: 0,
                specification: "",
                state: 1,
                type: '',
                type2: "",
                uselife: "",
                usetype: 1
            },
            imgs: [],
            pics: [],
        }
    },
    mounted () {
        var _this = this;
        var id = this.$route.query.id
        console.log(this.$route)
        this.$http.post('/mobile/doch5/doc_goods_detail', { id: id}).then(res => {
            console.log(res)
            if (res.code == 1) {
                _this.$nextTick(() => {
                    _this.datalist = res.data
                    _this.datalist.usetype = res.data.usetype == 1? '内服': '外用'
                    _this.datalist.recipe = res.data.recipe == 0? '非处方':'处方'
                    _this.imgs = res.img
                    _this.pics = res.pic
                    _this.$nextTick(() => {
                        if (_this.pics.length > 1) {
                            new Swiper ('.swiper-container', {
                                loop: true,
                                autoplay: true,
                                pagination: {
                                    el: '.swiper-pagination',
                                },
                            }) 
                        }
                    })
                })
            } else {

            }
        }).catch(err => { console.log(err)})
        
    },
    methods: {
        Return () {
            this.$router.back()
        },
        doctorShop () {
            this.$router.back()
        },
        cerateOrder () {            // 购买
            this.$router.push({ name: 'doctororder', params: { id: this.$route.query.id}})
        }
    }
}
</script>


<style lang='scss'>
.imgarr {
    width: 100%;
    height: auto;
    .swiper-container {
        .swiper-wrapper {
            .swiper-slide {
                img {
                    width:100%;
                }
            }
        }
    }
}

</style>


<style lang='scss' scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
$color: #333;


.bg_f {
    background-color: #fff;
    >img {
        width: 100%;
    }
}
.detail {
    width: 100%;
    height: 100%;
    color: $color;
    background-color: #f4f4f4;
    position: relative;
    font-size: rem(16);
    display: -webkit-box; 
    display: -moz-box; 
    display: -webkit-flex; 
    display: -moz-flex; 
    display: -ms-flexbox; 
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    .fiexd {
        width: 100%;
        position: absolute;
        display: -webkit-box; 
        display: -moz-box; 
        display: -webkit-flex; 
        display: -moz-flex; 
        display: -ms-flexbox; 
        display: flex;
        z-index: 10;
        top: rem(23);
        left: 0;
        padding: 0 rem(11);
        justify-content: space-between;
        .backs {
            width: rem(29);
            height: rem(29);
        }
        >div {
            width: rem(61);
            height: rem(29);
            border-radius: rem(15);
            background-color: rgba(0,0,0,.3);
            font-size: rem(12);
            color: #fff;
            text-align: center;
            line-height: rem(29);
            >img {
                width:rem(25);
                vertical-align: middle;
            }
        }
    }

    .content {
        width: 100%;
        -webkit-flex:1;
        flex: 1;
        overflow: auto;
        .title {
        font-size: 0.28rem;
        padding: 0.21rem;
         .price {
            font-size: 0.22rem;
            color: #E9541F;
            font-weight: 550;
        }
        h4 {
            font-weight:500;
            color:#333;
            line-height:0.33rem;
            margin-top: 0.19rem;
        }
        p {
            margin-top: 0.38rem;
            color:#A9A9A9;
            font-size: 0.22rem;
            span {
                color: #A9A9A9;
            }
        }
    }
    .detail_con {
        font-size: 0.28rem;
        padding: 0 0.20rem;
        overflow: hidden;
        ul {
            font-weight: 400;
            li {
                width: 100%;
                margin: 0.4rem 0;
                -webkit-display: flex;
                display: flex;

                span:first-child {
                    color: #808080;
                    display: block;
                    width: 30%;
                }
                span:last-child {
                    color: #333;
                }
            }
        }
        ul:first-child {
            border-bottom: 1px solid rgba(224,224,224,1);
        }
    }
    .cont_img {
        width: 100%;
        font-size: 0.28rem;
        padding-bottom: rem(5);
        img {
            display: block;
            width: 100%;
            height: auto;
        }
    }
    
}
    

    .footer {
        width:100%;
        height: rem(55);
        border-top: 1px solid #E0E0E0;
        padding: rem(7) rem(14);
        -webkit-display: flex;
        display: flex;
        font-size: rem(14);
        .btnback {
            width: 35%;
            color:#333;
            border:1px solid rgba(224, 224, 224, 1);
            font-size:rem(14);
            border:0;
            -webkit-box-shadow: 0 0 0 0;
            box-shadow:0 0 0 0;
        }
        .clickup {
            width: 65%;
            margin-left: rem(7);
            font-size: rem(14);
        }
    }

}
</style>
