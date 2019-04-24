<template>
    <!-- 处方订单 -->
    <div class="doctor_recipe dis_f flex-v">
         <div class="header">
            <img @click='Return' src="../../common/img/icon_fh.png" alt="">
            <span>处方订单</span>
        </div>
        <div class="section flex1" ref='section'>
            <div>
                <div>
                    <div class="kong" v-if='!datalist.length'>
                            <img src="../../common/img/pic_zwcf.png" alt="">
                            <p>还没有相关的处方信息</p>
                    </div>
                    <div v-if='datalist.length'>
                        <div class="list">
                            <ul @click='Clickdetail' v-for='(val,i) in datalist' :key='i'>
                                <li>
                                    <img :src="$http.baseURL+val.picture" alt="">
                                    <dl>
                                        <dt>
                                            <span>{{ val.true_name }}</span>
                                            <b>{{ val.name }} | {{ val.department_name }}</b>
                                        </dt>
                                        <dd>
                                            初步诊断：<span>{{ val.result }}</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="dis_f dis_sb flex_i">
                                    <span>{{ val.start_time | filterTime }}</span>
                                    <mt-button type="default" @click.native='handledetail(val.id)'>查看处方</mt-button>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" v-if='!datalist.length'>
            <mt-button type="primary" size="large" @click.native="handleClick">找医生</mt-button>
            <!-- <mt-button type="primary" v-if='datalist.length' size="large" @click.native="handleClick2">找医生</mt-button> -->
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data () {
        return {
            datalist: [],
            page: 1,
            limit: 10,
            options: {
            pullDownRefresh: {
                threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
            },
            pullUpLoad: {
                threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
            },
    //          pullDownRefresh: false, //关闭下拉
    //          pullUpLoad: false, // 关闭上拉
            // click: true,
            probeType: 3,
            startY: 0,
            scrollbar: true
            }
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata () {
            var self = this;
            var uid = this.$cookie.get('userLogins')
            var obj = { page: self.page, num: self.limit, uid: uid}
            self.$http.post('/mobile/Wxorder/recipe_list', obj).then(res => {
                console.log(res)
                if(res.code == 1) {
                    self.datalist = res.data
                    self.$nextTick(() => {
                        self.load()
                    })
                }
            })
        },
        handledetail(id) { // 跳转详情
        console.log(id)
           this.$router.push({name: 'recipeMsg', params: {id: id}})
        },
        handleClick() {  // 找医生按钮
            console.log('haha222')
            this.out('/searchdoctor')
        },
        Return () {
            this.$router.back()
        },

        Clickdetail () {
            this.$router.push({path: ''})
        },
        load() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.section, this.options);
                // 上拉
                    this.scroll.on('pullingUp', () => {
                        // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
                        setTimeout(() => {
                            console.log('aa')
                            this.setData()
                        },1000)
                    })
                } else {
                    this.scroll.refresh()
                }
        },
        setData() {
            this.$nextTick(() => {
                let arr = []
                // this.data = this.data.concat(arr)// 添加数据
                this.scroll.finishPullUp();
                this.pullingDownUp()
            })
        },
        pullingDownUp() {
                this.scroll.refresh() //重新计算元素高度
            },
        }
}
</script>

<style>

</style>
<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.doctor_recipe {
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: rem(14);
    .header {
        display: -webkit-flex;
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
            width: rem(20);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .section {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        font-size: rem(14);
        .kong {
            text-align: center;
            padding: rem(81) 0;
            img {
                width: rem(125);
                display: block;
                margin: 0 auto;
            }
            >p {
                text-align: center;
                color: #808080;
                margin-top: rem(26);
            }
        }
        .list {
            width: 100%;
            font-size: rem(12);
            padding: 0 rem(15);
            >ul {
                padding: rem(15);
                width: 100%;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.1);
                border-radius:4px;
                margin-top: rem(5);
                li:first-child {
                    -webkit-display: flex;
                    display: flex;
                    >img {
                        display: block;
                        width: rem(49);
                        height: rem(49);
                        border-radius: 50%;
                    }
                    >dl {
                        flex: 1;
                        padding-left: rem(15);
                        dt {
                            line-height: rem(30);
                            span {
                                margin-right: rem(15);
                                color:#333;
                                font-size: rem(16);
                            }
                            b {
                                color: #808080;
                                font-size: rem(12);
                            }
                        }
                        dd {
                            font-size: rem(12);
                            color: #333;
                            margin-top: rem(5);
                        }
                    }
                }
                li:last-child {
                    margin-top: rem(10);
                    font-size: rem(12);
                    color: #808080;
                    line-height: rem(18);
                    > span {
                        margin-top: rem(3);
                    }
                    > button {
                        height: rem(25);
                        font-size: rem(13);
                        border:1px solid #4A9CF3;
                        color: #4A9CF3;
                    }
                }
            }
        }
    }
    .footer {
        width: 100%;
        height: rem(49);
        button {
            width:100%;
            border-radius: 0;
            height: 100%;
            font-size: rem(17);
        }
    }
}
</style>
