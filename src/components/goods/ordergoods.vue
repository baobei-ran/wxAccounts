<template>
<!-- 商品订单 父级页面 -->
    <div class="ordergoods">
        <div class="header">
            <img @click='Returns' src="../../common/img/icon_fh.png" alt="">
            <span>商品订单</span>
        </div>
        <div class="navtab">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">全部</mt-tab-item>
                <mt-tab-item id="2">待付款</mt-tab-item>
                <mt-tab-item id="3">待收货</mt-tab-item>
                <mt-tab-item id="4">已完成</mt-tab-item>
                <mt-tab-item id="5">已取消</mt-tab-item>
            </mt-navbar>
        </div>
        <div class="content">
            <div class="content_box">
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <order-all ></order-all>         <!-- 全部订单 -->
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                       <order-add></order-add>          <!-- 待付款订单 -->
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <order-take></order-take>       <!-- 待收货订单 -->
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                        <order-done></order-done>        <!-- 已完成订单 -->
                    </mt-tab-container-item>
                    <mt-tab-container-item id="5">
                        <order-cancel></order-cancel>    <!-- 已取消订单 -->
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <div class="footer" v-if='isbtn'>
            <mt-button size="large" type="primary" @click.native='outShop'>去逛逛</mt-button>
        </div>
    </div>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
// import All from './goodslist/allorder'
// import Add from './goodslist/addorder'
// import Take from './goodslist/takeorder'
// import Done from './goodslist/doneorder'
// import Cancel from './goodslist/cancelorder'
export default {
    components: {
        'order-all': function(resolve) {require(["./goodslist/allorder"], resolve) },
        'order-add': function(resolve) {require(["./goodslist/addorder"], resolve) },
        'order-take': function(resolve) {require(["./goodslist/takeorder"], resolve) },
        'order-done': function(resolve) {require(["./goodslist/doneorder"], resolve) },
        'order-cancel': function(resolve) {require(["./goodslist/cancelorder"], resolve) },
    },
        data () {
            return {
                selected: '2',      // nav 默认选中
                isbtn: false        // 按钮的隐藏与显示
            }
        },
        updated () {
            console.log(this.selected)
        },
        methods: {
            outShop () {    // 去逛逛按钮

            },
            Returns () {
                this.$router.back()
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
    }
    .content {
        -webkit-flex:1;
        flex: 1;
        overflow: auto;
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
