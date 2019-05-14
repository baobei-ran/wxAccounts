<template>
<!-- 商品订单 父级页面 -->
    <div class="ordergoods">
        <div class="header">
            <img @click='Returns' src="../../common/img/icon_fh.png" alt="">
            <span>商品订单</span>
        </div>
        <div class="navtab">
            <ul class="dis_f dis_sb flex-vc">
                <li @click='tabs(1)' :class="{'action': tabId == 1}" >全部</li>
                <li @click='tabs(2)' :class="{'action': tabId == 2}">待付款</li>
                <li @click='tabs(3)' :class="{'action': tabId == 3}">待发货</li>
                <li @click='tabs(4)' :class="{'action': tabId == 4}">待收货</li>
                <li @click='tabs(5)' :class="{'action': tabId == 5}">已取消</li>
            </ul>
        </div>
        <div class="content">
            <div class="content_box">
                

    <div class="orderall">
        <div class="empty" v-if='!alllist.length'>
            <empty></empty>
        </div>
        <div class="content_box">
            <div class="Pd-B10">
        <div class="content" v-if='alllist.length'>   
            <!-- 待付款 -->
            <div class="add Mg-T" v-for='(val,i) in alllist' :key='i' v-if='val.status == 1'>
                <h4>{{ val.sname }}医生的店铺
                    <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                    <span>等待付款</span></h4>
                <div class="order_list" @click='paydetail(val)'>
                    <dl>
                        <dt>
                            <img :src="$http.baseURL+val.img" alt="">
                        </dt>
                        <dd>
                            <h5>{{ val.name }}</h5>
                            <span>￥{{ val.money }}</span>
                            <p>x{{ val.num }}</p>
                        </dd>
                    </dl>
                </div>
                <p>共{{ val.num }}件商品 实付款 <span>{{ val.money }}</span></p>
                <div class="addbtn"><mt-button type="primary" @click.native='paydetail(val)'>去支付</mt-button></div>
            </div>

            <!-- 待发货 -->
            <div class="take Mg-T" v-for='(val,i) in alllist' :key='i' v-if='val.status == 2 || val.status == 3'>
                <h4>{{ val.sname }}医生的店铺
                    <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                    <span>等待发货</span></h4>
                <div class="order_list" @click='outdetails(val)'>
                    <dl>
                        <dt>
                            <img :src="$http.baseURL+val.img" alt="">
                        </dt>
                        <dd>
                            <h5>{{ val.name }}</h5>
                            <span>￥{{ val.money }}</span>
                            <p>x{{ val.num }}</p>
                        </dd>
                    </dl>
                    <!-- <dl>
                        <dt>
                            <img src="../../../common/img/pic_sptp.png" alt="">
                        </dt>
                        <dd>
                            <h5>999搞毛亏你还</h5>
                            <span>￥22.00</span>
                            <p>x1</p>
                        </dd>
                    </dl> -->
                </div>
                <p>共{{ val.num }}件商品 实付款 <span>{{ val.money }}</span></p>
                <div class="addbtn"><mt-button @click.native='buy(val)'>再次购买</mt-button>
                    <!-- <mt-button class="yes" @click.native='take(val)'>确认收货</mt-button> -->
                </div>
            </div>

            <!-- 等待发货 -->

                <!-- <div class="take Mg-T">
                <h4>谢永清医生的店铺<img src="../../../common/img/icon_enter.png" alt=""><span>等待发货</span></h4>
                <div class="order_list">
                    <dl>
                        <dt>
                            <img src="../../../common/img/pic_sptp.png" alt="">
                        </dt>
                        <dd>
                            <h5>999搞毛亏你还</h5>
                            <span>￥22.00</span>
                            <p>x1</p>
                        </dd>
                    </dl>
                </div>
                <p>共1件商品 实付款 <span>22.00</span></p>
                <div class="addbtn"><mt-button >再次购买</mt-button></div>
            </div> -->


            <!-- 待收货 -->

            <div class="take Mg-T" v-for='(val,i) in alllist' :key='i' v-if='val.status == 4'>
                <h4>{{ val.sname }}医生的店铺
                    <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                    <span>待收货</span></h4>
                <div class="order_list" @click='outdetails(val)'>
                    <dl>
                        <dt>
                            <img :src="$http.baseURL+val.img" alt="">
                        </dt>
                        <dd>
                            <h5>{{ val.name }}</h5>
                            <span>￥{{ val.money }}</span>
                            <p>x{{ val.num }}</p>
                        </dd>
                    </dl>
                </div>
                <p>共{{ val.num }}件商品 实付款 <span>{{ val.money }}</span></p>
                <div class="addbtn"><mt-button @click.native='buy(val)'>再次购买</mt-button><mt-button class="yes" @click.native='take(val)'>确认收货</mt-button></div>
                <!-- <div class="addbtn"><mt-button @click.native='del(val)'>删除订单</mt-button><mt-button class="yes" @click.native='buy(val)'>再次购买</mt-button></div> -->
            </div>

    <!-- 已完成 -->
            <div class="take Mg-T" v-for='(val,i) in alllist' :key='i' v-if='val.status == 5'>
                <h4>{{ val.sname }}医生的店铺
                    <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                    <span>已完成</span></h4>
                <div class="order_list" @click='outdetails(val)'>
                    <dl>
                        <dt>
                            <img :src="$http.baseURL+val.img" alt="">
                        </dt>
                        <dd>
                            <h5>{{ val.name }}</h5>
                            <span>￥{{ val.money }}</span>
                            <p>x{{ val.num }}</p>
                        </dd>
                    </dl>
                </div>
                <p>共{{ val.num }}件商品 实付款 <span>{{ val.money }}</span></p>
                <!-- <div class="addbtn"><mt-button @click.native='buy(val)'>再次购买</mt-button><mt-button class="yes" @click.native='take(val)'>确认收货</mt-button></div> -->
                <div class="addbtn"><mt-button @click.native='del(val)'>删除订单</mt-button><mt-button class="yes" @click.native='buy(val)'>再次购买</mt-button></div>
            </div>

            <!-- 已取消 -->
            <div class="take Mg-T" v-for='(val,i) in alllist' :key='i' v-if='val.status == 6'>
                <h4>{{ val.sname }}医生的店铺
                    <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                    <span>已取消</span>
                </h4>
                <div class="order_list" @click='outdetails(val)'>
                    <dl>
                        <dt>
                            <img :src="$http.baseURL+val.img" alt="">
                        </dt>
                        <dd>
                            <h5>{{ val.name }}</h5>
                            <span>￥{{ val.money }}</span>
                            <p>x{{ val.num }}</p>
                        </dd>
                    </dl>
                </div>
                <p>共{{ val.num }}件商品 实付款 <span>{{ val.money }}</span></p>
                <div class="addbtn"><mt-button @click.native='del(val)'>删除订单</mt-button><mt-button class="yes" @click.native='buy(val)'>再次购买</mt-button></div>
            </div>
            
        </div>
        </div>
        </div>
    </div>




            </div>
        </div>
        <div class="footer" v-if='!alllist.length'>
            <mt-button size="large" type="primary" @click.native='outShop'>去逛逛</mt-button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Navbar, TabItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import empty from './goodslist/empty'
export default {
    components: {
        empty: empty
    },
        data () {
            return {
                alllist: [],
                page: 1,
                limit: 10,
                type: '',
                tabId: 1,
            }
        },
        activated () {
            this.initdata (this.page, this.type)
        },
        methods: {
            tabs (val) {
                // console.log(val)
                this.tabId = val
                if (val == 1) {
                    this.type = ''
                    this.initdata(this.page, this.type)
                } else if (val == 2) {
                    this.type = '1'
                    this.initdata(this.page, this.type)
                } else if (val == 3) {
                    this.type = '23'
                    this.initdata(this.page, this.type)
                } else if (val == 4) {
                    this.type = '4'
                    this.initdata(this.page, this.type)
                } else if (val == 5) {
                    this.type = '6'
                    this.initdata(this.page, this.type)
                }
            },
            outShop () {    // 去逛逛按钮
                this.out('/doctorshoplist')
            },
            Returns () {
                this.$router.back()
            },
            initdata (page, type) {   // 数据
                var self = this;
                var uid = this.$cookie.get('userLogins')
                console.log(type)
                var obj = { uid: uid, type: type, page: page, num: this.limit }
                self.$http.post('/mobile/Wxorder/order_list', obj).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        self.alllist = res.data
                    } else {
                        self.alllist = []
                    }
                })
            },
            del(val) { // 删除订单
                var self = this;
                MessageBox.confirm('删除后不可恢复，是否删除?', '').then(action => {
                    var obj = { number: val.number, type: 1 }
                    self.$http.post('/mobile/Wxorder/set_order', obj).then(res => {
                        console.log(res)
                        if (res.code == 1) {
                            Toast({
                                message: '删除成功!',
                                position: 'center',
                                duration: 2000
                            });
                            self.initdata(self.page, self.type)
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
            buy (val) {   // 再次购买
                this.$router.push({ name: 'takeorderdetail', params: { id:val.number} })    
            },
            take(val) {  // 确认收货
                var self = this;
                MessageBox.confirm('确认收货吗?', '').then(action => {
                    var obj = { number: val.number, type: 3}
                    self.$http.post('/mobile/Wxorder/set_order', obj).then(res => {
                        console.log(res)
                        if (res.code == 1) {
                            Toast({
                                message: '操作成功',
                                position: 'center',
                                duration: 2000
                            });
                            self.initdata (this.page, this.type)
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
           
            paydetail(val) {    // 去支付就可以进入 待付款详情
                this.$router.push({ name: 'addorderdetail', params: { id: val.number}})
            },
            outdetails (val) {    // 取消和已完成、待收货的查看详情
                this.$router.push({ path: '/successOrder', query: { id: val.number}})
            }
        }
}
</script>

<style>

</style>
<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.ordergoods {
    width: 100%;
    height: 100%;
    font-size: rem(16);
    -webkit-display: flex;
    display: flex;
    flex-direction: column;
    .header {
        -webkit-display: flex;
        display: flex;
        height: rem(40);
        justify-content: center;
        color: #212121;
        position: relative;
        box-shadow:0px 1px 0px 0px rgba(224,224,224,1);
        padding-top: rem(0);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        img {
            font-size: rem(30);
            position: absolute;
            left: rem(15);
            top: rem(10);
            line-height: 1;
            font-size: rem(19);
            width: rem(28);
            padding: rem(5);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .navtab {
        padding-bottom: rem(2);
        background-color: #fff;
        ul {
            height: rem(46);
            padding: 0 rem(20);
            font-size: rem(14);
            li {
                height: rem(46);
                line-height: rem(46);
            }
            .action {
                color: #4A9CF3;
                border-bottom: 3px solid #4A9CF3;
            }
        }
    }
    .content {
        -webkit-flex:1;
        flex: 1;
        overflow: auto;
        
        .orderall {
    width: 100%;
    font-size: rem(16);
    
    .Mg-T {
        margin-top: rem(10);
    }
    .Pd-B10 {
        padding-bottom: rem(20);
    }
    .content {
        width: 100%;
        padding: 0 rem(15);
        .add {
            width: 100%;
            box-shadow:0px rem(5) rem(10) 0px rgba(0, 0, 0, 0.1);
            padding: rem(15);
            font-weight:400;
            background-color: #fff;
            h4 {
                background: url('../../common/img/icon_dpu.png') no-repeat 0;
                background-size: 8%;
                padding-left: rem(28);
                line-height: rem(30);
                font-size: rem(14);
                color:#333;
                img {
                    width: rem(25);
                    vertical-align: middle;
                }
                >span {
                    float: right;
                    color:#808080;
                    font-size: rem(12);
                }
            }
            .order_list {
                width: 100%;
                padding: rem(7.5) 0;
                >dl {
                    -webkit-display: flex;
                    display: flex;
                    margin: rem(7.5) 0;
                        dt {
                            >img {
                                display: block;
                                width: rem(64);
                                margin-bottom: rem(2);
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
               
            }
             >p {
                    width:100%;
                    text-align: right;
                    font-size: rem(12);
                    line-height: rem(20);
                }
                .addbtn {
                    width: 100%;
                    text-align: right;
                    margin-top: rem(15);
                    >button {
                        height: rem(25);
                        border-radius: rem(13);
                        font-size: rem(13);
                    }
                }
        }

        .take {
            width: 100%;
            box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.1);
            padding: rem(15);
            font-weight:400;
            background-color: #fff;
             h4 {
                background: url('../../common/img/icon_dpu.png') no-repeat 0;
                background-size: 8%;
                padding-left: rem(28);
                line-height: rem(30);
                font-size: rem(14);
                color:#333;
                img {
                    width: rem(25);
                    vertical-align: middle;
                }
                >span {
                    float: right;
                    color:#808080;
                    font-size: rem(12);
                }
            }
            .order_list {
                width: 100%;
                padding: rem(7.5) 0;
                >dl {
                    -webkit-display: flex;
                    display: flex;
                    margin: rem(7.5) 0;
                        dt {
                            >img {
                                display: block;
                                width: rem(64);
                                margin-bottom: rem(2);
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
               
            }
             >p {
                    width:100%;
                    text-align: right;
                    font-size: rem(12);
                    line-height: rem(20);
                }
                .addbtn {
                    width: 100%;
                    text-align: right;
                    margin-top: rem(15);
                    >button {
                        height: rem(25);
                        border-radius: rem(13);
                        font-size: rem(13);
                        border:1px solid rgba(74,156,243,1);
                        color: #4A9CF3;
                    }
                    .yes {
                        margin-left: rem(15);
                    }
                }
        }


    }
}


    }
    .footer {
        width: 100%;
        height: rem(49);
        button {
            height: 100%;
            border-radius: 0;
            font-size: rem(17);
        }
    }
}


</style>
