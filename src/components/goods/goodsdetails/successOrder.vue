<template>
<!-- 订单详情 -->
<!-- 已完成 和 已取消 和 待收货的 和 待发货-->
    <div class="addorderdetail">
        <!-- <div class="header">
            <img v-show='flag' @click='Return' src="../../../common/img/icon_fh.png" alt="">
            <span>订单详情</span>
        </div> -->
        <main class="content">
            <div class="content_box"> 
                <div class="site">
                    <div class="addOrder" v-if='detaildata.status == 6'>
                        <p>订单状态：
                            <span>已取消</span>
                        </p>
                    </div>
                    <div class="addOrder" v-if='detaildata.status == 5'>
                        <p>订单状态：<span>已完成</span></p>
                        <p>快递编号：{{ detaildata.company }} {{ detaildata.logistics_number }}</p>
                    </div>
                    <div class="addOrder" v-if='detaildata.status == 4'>
                        <p>订单状态：<span>待收货</span></p>
                        <p>快递编号：{{ detaildata.company }} {{ detaildata.logistics_number }}</p>
                    </div>

                    <div class="addOrder" v-if='detaildata.status == 2 || detaildata.status == 3'>
                        <p>订单状态：<span>待发货</span></p>
                    </div>
                    <ul>
                        <li class="user">
                            <span>{{ detaildata.name }}</span> <span>{{ detaildata.phone }}</span>
                        </li>
                        <li class="dizhi">
                            {{ detaildata.address }}
                        </li>
                    </ul>
                </div>

                <div class="orderList Mg-T5">
                    <h4>{{ detaildata.sname }}的店铺 
                        <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                    </h4>
                    <dl class="order_con">
                        <dt><img :src="$http.baseURL+detaildata.img" alt=""></dt>
                        <dd>
                            <h5>{{ detaildata.gname }}</h5>
                            <span>￥{{ detaildata.money }}</span>
                            <p>x1</p>
                        </dd>
                    </dl>
                    <ul class="goods">
                        <li><span>商品总额</span><span>￥{{ detaildata.money }}</span></li>
                        <li><span>运费</span><span>￥{{ detaildata.postage }}</span></li>
                        <li><span>总付费(含运费)</span><span>￥{{ detaildata.moneys }}</span></li>
                    </ul>
                    <!-- 6 已取消 -->
                    <div class="usermsg" v-if='detaildata.status == 6'>
                        <ul>
                            <li>订单编号：<span>{{ detaildata.number }}</span></li>
                            <li>创建时间：<span>{{ detaildata.addtime | filterTime }}</span></li>
                            <li>配送方式：
                                <span v-if='detaildata.distribution == 1'>快递配送</span>
                                <span v-if='detaildata.distribution == 2'>自提</span>
                            </li>
                        </ul>
                    </div>
                    <!--5 已完成 -->
                    <div class="usermsg" v-if='detaildata.status == 5'>
                        <ul>
                            <li>订单编号：<span>{{ detaildata.number }}</span></li>
                            <li>创建时间：<span>{{ detaildata.addtime | filterTime }}</span></li>
                            <li>创建时间：<span>{{ detaildata.addtime | filterTime}}</span></li>
                            <li>付款时间：<span>{{ detaildata.pay_time | filterTime }}</span></li>
                            <li>配送方式：
                                <span v-if='detaildata.distribution == 1'>快递配送</span>
                                <span v-if='detaildata.distribution == 2'>自提</span>
                            </li>
                            <li>发货时间：<span>{{ detaildata.kaddtime | filterTime }}</span></li>
                            <li>发货快递：<span>{{ detaildata.company }}</span></li>
                            <li>快递单号：<span>{{ detaildata.logistics_number }}</span></li>
                            <li>发货备注：<span>{{ detaildata.kremark }}</span></li>
                            <li>收货时间：<span>{{ detaildata.sure_time | filterTime }}</span></li>
                        </ul>
                    </div>
                    <!--4 待收货 -->
                    <div class="usermsg" v-if='detaildata.status == 4'>
                        <ul>
                            <li>订单编号：<span>{{ detaildata.number }}</span></li>
                            <li>创建时间：<span>{{ detaildata.addtime | filterTime}}</span></li>
                            <li>付款时间：<span>{{ detaildata.pay_time | filterTime }}</span></li>
                            <li>配送方式：
                                <span v-if='detaildata.distribution == 1'>快递配送</span>
                                <span v-if='detaildata.distribution == 2'>自提</span>
                            </li>
                            <li>发货时间：<span>{{ detaildata.kaddtime | filterTime }}</span></li>
                            <li>发货快递：<span>{{ detaildata.company }}</span></li>
                            <li>快递单号：<span>{{ detaildata.logistics_number }}</span></li>
                            <li>发货备注：<span>{{ detaildata.kremark }}</span></li>
                        </ul>
                    </div>
                    <!--2或3 待发货 -->
                    <div class="usermsg" v-if='detaildata.status == 2 || detaildata.status == 3'>
                        <ul>
                            <li>订单编号：<span>{{ detaildata.number }}</span></li>
                            <li>创建时间：<span>{{ detaildata.addtime | filterTime}}</span></li>
                            <li>付款时间：<span>{{ detaildata.pay_time | filterTime }}</span></li>
                            <li>配送方式：
                                <span v-if='detaildata.distribution == 1'>快递配送</span>
                                <span v-if='detaildata.distribution == 2'>自提</span>
                            </li>
                            <li>发货时间：<span>等待发货</span></li>
                            <!-- <li>发货快递：<span>{{ detaildata.company }}</span></li>
                            <li>快递单号：<span>{{ detaildata.logistics_number }}</span></li> -->
                            <li>发货备注：<span>{{ detaildata.kremark }}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
        <div class="footer" v-if='detaildata.status == 6 || detaildata.status == 5'>
            <mt-button class="once" @click.native='createOrder'>再次购买</mt-button>
        </div>
        <div class="footer" v-if='detaildata.status == 2 || detaildata.status == 3'>
            <mt-button class="once" @click.native='createOrder'>再次购买</mt-button>
        </div>
        <div class="footer" v-if='detaildata.status == 4'>
            <mt-button class="once1" @click.native='createOrder'>再次购买</mt-button>
            <mt-button type="primary" @click.native='orderData'>确认收货</mt-button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            length: 0,  // 留言的数量
            detaildata: {},
            flag: true
        }
    },
    mounted () {
        console.log(this.$route.query)
        var uid = this.$route.query.uid
        if (uid) {
            this.$cookie.set('userLogins', uid, 365)
            this.flag = false
        }
        this.initdata()
    },
    methods: {
        Return () {
            this.$router.go(-1)
        },
        initdata () {
            var self = this;
            var id = this.$route.query.id
            self.$http.post('/mobile/Wxorder/order_data', {number:id}).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.detaildata = res.data
                }
            })
        },
        createOrder () {    // 再次购买
            this.$router.push({ name: 'takeorderdetail', params: { id: this.detaildata.number } }) 
        },
        orderData() {  // 确认收货
             var self = this;
            MessageBox.confirm('确认收货吗?', '').then(action => {
                var obj = { number: this.detaildata.number, type: 3}
                self.$http.post('/mobile/Wxorder/set_order', obj).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        Toast({
                            message: '操作成功',
                            position: 'center',
                            duration: 2000
                        });
                        self.initdata()
                    } else {
                        Toast({
                            message: res.msg,
                            position: 'center',
                            duration: 2000
                        });
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px/ 50 + rem;
}
.Mg-T5 {
    margin-top: rem(5);
}
.addorderdetail {
    width: 100%;
    height: 100%;
    -webkit-display: flex;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    font-size: rem(16);
    .header {
        -webkit-display: flex;
        display: flex;
        height: rem(40);
        justify-content: center;
        color: #212121;
        position: relative;
        box-shadow:0px 1px 0px 0px rgba(224,224,224,.5);
        padding-top: rem(0);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: rem(16);
        background: #fff;
        img {
            font-size: rem(30);
            position: absolute;
            left: rem(15);
            top: rem(10);
            line-height: 1;
            font-size: rem(19);
            height: rem(28);
            padding: rem(5);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .content {
        width: 100%;
        -webkit-flex:1;
        flex:1;
        overflow: auto;
        .content_box {
            padding: 0 rem(15);
            .site {
                width: 100%;
                box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.1);
                border-radius: rem(4);
                margin-top: rem(6);
                padding:rem(15);
                background-color: #fff;
                .addOrder {
                    width: 100%;
                    font-size: rem(12);
                    color: #808080;
                    padding-bottom: rem(15);
                    border-bottom: 1px solid #E6E6E6;
                    > p:last-child {
                        margin-top: rem(15);
                    }
                }
                ul {
                    position: relative;
                    margin-top: rem(15);
                    li {
                        color:#333;
                        font-size: rem(12);
                    }
                    .user {
                        font-size: rem(14);
                        line-height: rem(17);
                        padding: 0 rem(15) rem(11) rem(15);
                        span:last-child {
                            color:#666;
                        }
                    }
                    .dizhi {
                        font-size: rem(12);
                        color:#333;
                        background: url('../../../common/img/icon_dz.png') no-repeat rem(-5);
                        background-size: 9%;
                        padding-left: rem(17);
                        line-height: rem(17);
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                   
                }
            }
            .orderList {
                width: 100%;
                padding: rem(15);
                box-shadow:0px rem(5) rem(10) 0px rgba(0, 0, 0, 0.1);
                border-radius: rem(4);
                background-color: #fff;
                >h4 {
                    font-size:rem(14);
                    color: #333;
                    background: #fff url('../../../common/img/icon_dpu.png') no-repeat 0;
                    background-size: 8%;
                    line-height: rem(30);
                    font-weight:500;
                    margin-bottom: rem(15);
                    padding-left: rem(28);
                    img {
                        width: rem(25);
                        vertical-align: middle;
                    }
                }
                .order_con {
                    -webkit-display: flex;
                    display: flex;
                    dt {
                        >img {
                            display: block;
                            width: rem(64);
                        }
                    }
                    dd {
                        margin-left: rem(15);
                        font-size: rem(12);
                        color:#333;
                        h5 {
                            font-size: rem(14);
                            margin-top: rem(2);
                        }
                        >span {
                            color: #F09F88;
                            margin: rem(10) 0;
                            display: block;
                        }
                    }
                }
                .goods {
                    width: 100%;
                    border-bottom: 1px solid #E6E6E6;
                    li {
                        margin: rem(20) 0;
                        font-size: rem(13);
                        color: #333;
                        display: flex;
                        justify-content: space-between;
                        img {
                            width: rem(25);
                            vertical-align: middle;
                        }
                        span:last-child {
                            color: #808080;
                        }
                    }
                }
                .usermsg {
                    padding: rem(7.5) 0;
                    font-size: rem(13);
                    font-weight:400;
                    > ul {
                        li {
                            line-height: rem(20);
                            color: #808080;
                            padding: rem(7.5) 0;
                        }
                    }
                    
                }
            }
        }
    }

    .footer {
        -webkit-display: flex;
        display: flex;
        height: rem(49);
        .once {
            background: #4A9CF3;
            color: #fff;
        }
        .once1 {
            background: #fff;
            color: #4A9CF3;
        }
        >button {
            width: 100%;
            height: 100%;
            border-radius: 0;
            font-size: rem(14);
        }
    }
}
</style>

