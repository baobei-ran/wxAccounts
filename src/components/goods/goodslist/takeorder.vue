<template>
<!-- 待收货 -->
    <div class="takeorder">
        <div class="empty" v-if='!takelist.length'>
            <empty></empty>
        </div>
         <!-- 待收货 -->
            <div class="take Mg-T" v-for='(val,i) in takelist' :key='i' >
                <h4>{{ val.sname }}医生的店铺
                    <!-- <img src="../../../common/img/icon_enter.png" alt=""> -->
                    <span>等待收货</span></h4>
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
                <div class="addbtn"><mt-button @click.native='buy(val)'>再次购买</mt-button><mt-button class="yes" @click.native='take(val)'>确认收货</mt-button></div>
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
            takelist: [],
            page: 1,
            limit: 10,
            type: 24
        }
    },
    mounted () {
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
                    this.takelist = res.data
                }
            })
        },
         buy (val) {   // 再次购买
            this.$router.push({ name: 'doctororder', params: { id:val.id} })    
        },
        take(val) {  // 确认收货
             var self = this;
            MessageBox.confirm('确认收货吗?', '').then(action => {
                var obj = { number: val.number, type: 3}
                self.$http.post('/mobile/Wxorder/set_order', obj).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        Toast({
                            message: '操作成功！！！',
                            position: 'center',
                            duration: 2000
                        });
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
.takeorder {
    width: 100%;
    padding: 0 rem(15);
    font-size: rem(16);
    .Mg-T {
        margin-top: rem(5);
    }
    .take {
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
