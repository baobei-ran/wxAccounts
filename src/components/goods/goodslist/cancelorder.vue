<template>
<!-- 已取消 -->
    <div class="cancelorder">
        <div class="empty" v-if='!cancellist.length'>
            <empty></empty>
        </div>
        <!-- 已取消 -->
            <div v-if='cancellist.length'>
                <div class="cancel Mg-T" v-for='(val,i) in cancellist' :key='i' >
                    <h4>{{ val.sname }}医生的店铺
                        <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                        <span>已取消</span></h4>
                    <div class="order_list">
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
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import empty from './empty'
export default {
    components: {
        empty
    },
    data () {
        return {
            cancellist: [],
            page: 1,
            limit: 10,
            type: 6
        }
    },
    mounted() {
        this.initdata(this.page)
    },
    methods: {
         initdata (page) {
            var self = this;
            var uid = this.$cookie.get('userLogins')
            var obj = { uid: uid, type: this.type, page: page, num: this.limit }
            self.$http.post('/mobile/Wxorder/order_list', obj).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.cancellist = res.data
                }
            })
        },
        buy (val) {   // 再次购买
            this.$router.push({ name: 'doctororder', params: { id:val.id} })    
        },
       del(val) { // 删除订单
            var self = this;
            MessageBox.confirm('删除后不可恢复，是否删除?', '').then(action => {
                var obj = { number: val.number, type: 1 }
                self.$http.post('/mobile/Wxorder/set_order', obj).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        Toast({
                            message: '删除成功！！！',
                            position: 'center',
                            duration: 2000
                        });
                        self.initdata(self.page)
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
    @return $px / 50 + rem;
}
.cancelorder {
    width: 100%;
    padding: 0 rem(15);
    font-size: rem(16);
    .Mg-T {
        margin-top: rem(5);
    }

    .cancel {
            width: 100%;
            box-shadow:0px rem(5) rem(10) 0px rgba(0, 0, 0, 0.1);
            padding: rem(15);
            font-weight:400;
             h4 {
                background: url('../../../common/img/icon_dpu.png') no-repeat 0;
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
</style>

