<template>
    <!-- 处方订单 -->
    <div class="doctor_recipe dis_f flex-v">
        <div class="section flex1" ref='section'>
            <div>
                <div>
                    <div class="kong" v-if='!datalist.length'>
                            <img src="../../common/img/pic_zwcf.png" alt="">
                            <p>还没有相关的处方信息</p>
                    </div>
                    <div v-if='datalist.length'>
                        <div class="list" >
                            <!-- 药店药品 -->
                            <ul v-for='(val,i) in datalist' :key='i'  @click='drugstoreDrug(val.id)' v-if='val.drug_type == 1'>
                                <li>
                                    <img :src="$http.baseURL+val.picture" alt="" />
                                    <dl>
                                        <dt>
                                            <span>{{ val.true_name }}</span>
                                            <span class="fr" v-text="val.drug_autdit == 0?'待审核':val.drug_autdit == 1?'药师审核已通过':val.drug_autdit == 2?'药师审核已通过':''"></span>
                                        </dt>
                                        <dd>
                                            <b>{{ val.name }} | {{ val.department_name }}</b>
                                        </dd>
                                    </dl>
                                </li>
                                <li >
                                    <p><span>开具时间：</span><span>{{ val.start_time | filterTime }}</span></p>
                                    <p><span>患者：</span><span>{{ val.user }}</span></p>
                                    <p><span>初步诊断：</span><span>{{ val.result }}</span></p>
                                    <!-- <mt-button type="default" @click.native='handledetail(val.id)'>查看处方</mt-button> -->
                                </li>
                            </ul>

                            <!-- 手写药品 -->
                            <ul v-for='(val,i) in datalist' :key='i+"_2"' @click='handledetail(val.id)' v-if='val.drug_type == 2'>
                                <li>
                                    <img :src="$http.baseURL+val.picture" alt="" />
                                    <dl>
                                        <dt>
                                            <span>{{ val.true_name }}</span>
                                            <span class="fr" v-text="val.status == 1?'处方已开具':val.status == 2?'处方已过期':''"></span>
                                        </dt>
                                        <dd>
                                            <b>{{ val.name }} | {{ val.department_name }}</b>
                                        </dd>
                                    </dl>
                                </li>
                                <li >
                                    <p><span>开具时间：</span><span>{{ val.start_time | filterTime }}</span></p>
                                    <p><span>患者：</span><span>{{ val.user }}</span></p>
                                    <p><span>初步诊断：</span><span>{{ val.result }}</span></p>
                                    <!-- <mt-button type="default" @click.native='handledetail(val.id)'>查看处方</mt-button> -->
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
// import BScroll from 'better-scroll'
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
                scrollbar: true,
                click: true
            },
            timerId: '',  // 监听滚动定时器
        }
    },
    mounted() {
        
    },
    activated () {
        this.initdata()
        this.$refs.section.scrollTop = this.$route.meta.y 
        var _this = this;
        this.$refs.section.addEventListener('scroll',_this.justifyPos,true )
        clearTimeout(this.timerId)
    },
    deactivated () {
        // 当组件销毁的时候，移除滚动行为监听, 清空定时器；
        // 该方法是绑定到 window 身上，即使跳转到其他组件，仍然会监听页面的滚动行为
        var _this = this;
        this.$refs.section.removeEventListener('scroll', _this.justifyPos, true)
    },
    methods: {
        justifyPos (e) {         // 获取滚动的位置信息
                    // 节流；
            if (this.timerId) clearTimeout(this.timerId)
            this.timerId = setTimeout(() => {
                // 获取页面滚动距离之后设置给当前路由的 元信息
                // console.log(e.target.scrollTop)
                var _this = this;
                this.$route.meta.y = e.target.scrollTop
            }, 300)
        },
        initdata () {
            var self = this;
            var uid = this.$cookie.get('userLogins')
            var obj = { page: self.page, num: self.limit, uid: uid}
            self.$http.post('/mobile/Wxorder/recipe_list', obj).then(res => {
                console.log(res)
                if(res.code == 1) {
                    self.datalist = res.data
                    self.$nextTick(() => {
                        // self.load()
                    })
                }
            })
        },
        handledetail(id) { // 跳转详情
           this.$router.push({name: 'recipeMsg', params: {id: id}})
        },
        handleClick() {  // 找医生按钮
            this.out('/searchdoctor')
        },
        drugstoreDrug (id) { // 查看药店药品信息
            this.$router.push({path: '/recipeAudit', query: { id:id }})
        },
        // load() { // BScroll 插件
        //     if (!this.scroll) {
        //         this.scroll = new BScroll(this.$refs.section, this.options);
        //         // 上拉
        //             this.scroll.on('pullingUp', () => {
        //                 // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
        //                 setTimeout(() => {
        //                     console.log('aa')
        //                     this.setData()
        //                 },1000)
        //             })
        //         } else {
        //             this.scroll.refresh()
        //         }
        // },
        setData() {
            this.$nextTick(() => {
                var arr = []
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
    background: #F0F0F0;
    font-size: rem(14);
    
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
            margin-bottom: rem(10);
            >ul {
                padding: rem(15);
                width: 100%;
                background:#fff;
                box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.1);
                border-radius:4px;
                margin-top: rem(10);
                li:first-child {
                    -webkit-display: flex;
                    display: flex;
                    padding-bottom: rem(15);
                    border-bottom: 1px solid #EEE;
                    >img {
                        display: block;
                        width: rem(48);
                        height: rem(48);
                        -webkit-border-radius: 100%;
                        border-radius: 100%;
                        border: 1px solid #fefefe;
                    }
                    >dl {
                        -webkit-flex:1;
                        flex: 1;
                        padding-left: rem(15);
                        line-height: rem(20);
                        vertical-align: middle;
                        dt {
                            span {
                                color:#333;
                                font-size: rem(16);
                            }
                            .fr {
                                float: right;
                                color:#4A9CF3;
                                font-size: rem(11);
                            }
                        }
                        dd {
                            font-size: rem(11);
                            color: #808080;
                            margin-top: rem(5);
                        }
                    }
                }
                li:last-child {
                    margin-top: rem(10);
                    font-size: rem(12);
                    color: #808080;
                    cursor: pointer;
                    > p {
                        line-height: rem(24);
                        > span {
                            display: inline-block;
                            color: #808080;
                        }
                        > span:first-child {
                            width: 22%;
                        }
                        > span:last-child {
                                color: #333;
                            }
                    }
                    // > button {
                    //     height: rem(25);
                    //     font-size: rem(13);
                    //     border:1px solid #4A9CF3;
                    //     color: #4A9CF3;
                    //     background-color: #fff;
                    // }
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
