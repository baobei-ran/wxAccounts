<template>
    <!-- 我的医生 -->
    <div class="doctor dis_f flex-v">
        <div class="section flex1">
            <div>
                <div class="kong" v-show='Status'>
                    <img src="../../common/img/pic_zwys.png" alt="">
                    <p>你当前暂未添加医生，<span @click='handleClick'>立即找医生</span></p>
                </div>
                <div v-if='datalist.length'>
                    <div class="list">
                        <div class="commons await" v-for='(val, i) in datalist' :key='i'>
                            <h4>{{ val.hospital_name }}</h4>
                            <dl class="dis_f flex-vc"  @click='Clickdetail(val.did)'>
                                <dt><img v-lazy="$http.baseURL+val.picture" :key="val.picture" alt=""></dt>
                                <dd>
                                    <p>
                                        <span>{{ val.true_name }}</span>
                                    </p>
                                    <p>
                                        <span>{{ val.gname }}</span> | <span>{{ val.department_name }}</span>
                                    </p>
                                </dd>
                            </dl>
                            <div class="ckBtn">
                                <span class="blue" v-if='!val.status'><mt-button @click.native="handerOnce(val.did)" >立即咨询</mt-button></span>
                                <span class="orange" v-if='val.status'><mt-button @click.native="handerLoding(val.did)" >问诊咨询中</mt-button></span>
                                <span><mt-button @click.native="handerDetail(val.did, val.status)">咨询记录</mt-button></span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <mt-button type="primary" v-if='!datalist.length' size="large" @click.native="handleClick">立即找医生</mt-button>
            <mt-button type="primary" v-if='datalist.length' size="large" @click.native="handleClick2">找其他医生</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            datalist: [],
            Status: false,  // 无数据显示
            uid: this.$cookie.get('userLogins'),
            page: 1,
            limit: 15,
        }
    },
    beforeCreate () {
        this.$indicator.open({
            text: '',
            spinnerType: 'fading-circle'
        });
    },
    activated () {
        this.initdata()
    },
    destroyed () {
        this.$indicator.close();
    },
    methods: {
        initdata () {
            var self = this;
            var obj = {uid:this.uid, page: this.page, limit: this.limit}
            this.$http.post('/mobile/wxdoccenter/my_doctors', obj).then(res => {
                console.log(res)
                self.$indicator.close();
                if (res.code == 1) {
                    var data = res.data, arr = [];
                    for (var i=0; i< data.length; i++) {
                        if (data[i].did) {
                            arr.push(data[i])
                        }
                    }
                    self.datalist = arr
                } else {
                    self.Status = true;
                    self.datalist = []
                }
            })
        },
        handleClick() {         // 立即找医生
            this.out('searchdoctor')
        },
        handleClick2() {    // 找其他医生
            this.out('/searchdoctor')
        },
        Return () {         // 返回
            this.$router.go(-1)
        },

        Clickdetail (id) {       // 进入医生详情
            this.$router.push({ name: 'doctordetail', params: { id:id}})
        },
        handerOnce (id) {  // 立即咨询
            var self = this, 
                obj = { uid: this.uid, did: id };
            self.$http.post('/mobile/wxauth/consult', obj).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.$messagebox.confirm('你已成功选择该医生，返回公众号首页，即可向医生咨询问题', {showCancelButton: false, confirmButtonText: '确定'}).then(action => {
                        WeixinJSBridge.call('closeWindow'); 
                    });
                } else {
                    this.$toast({
                        message: res.msg,
                        position: 'middle',
                        duration: 2000
                    });
                }
            })
            
        },
        handerLoding () { // 咨询中
            this.$messagebox.confirm('返回公众号首页，即可继续向医生咨询问题', {showCancelButton: false, confirmButtonText: '确定'}).then(action => {
               WeixinJSBridge.call('closeWindow'); 
            });
        },
        handerDetail (id, n) {  // 咨询记录
            this.$indicator.open({
                text: '',
                spinnerType: 'fading-circle'
            });
            this.$router.push({path:'/mydoctor/docrecord', query: { id: id, status: n}})
        }
    },
    beforeDestroy () {
        this.$indicator.close();
    }
}
</script>

<style>
    
</style>
<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.doctor {
    width: 100%;
    height: 100%;
    background: #fafafa;
    font-size: rem(14);
    
    .section {
        width: 100%;
        font-size: rem(14);
        overflow-y: scroll;
        padding-bottom: rem(5);
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
                >span {
                    color: #129DFA;
                }
            }
        }
        .list {
            width: 100%;
            font-size: rem(12);

               .commons {
                    width: 100%;
                    margin-bottom: rem(12);   
                    > h4 {
                        width: 100%;
                        height: rem(40);
                        line-height: rem(40);
                        color: #808080;
                        font-size: rem(13);
                        background-color: #fff;
                        padding: 0 rem(15); 
                    
                    }
                    > dl {
                        width: 100%;
                        height: rem(72);
                        padding: 0 rem(15); 
                        dt {
                            width: rem(54);
                            height: rem(54);
                            -webkit-border-radius: 100%;
                            border-radius: 100%;
                            overflow: hidden;
                            position: relative;
                            >img[lazy=loaded] {
                                width: rem(54);
                                height: rem(54);
                                max-width: rem(54);
                                max-height: rem(54);
                                -webkit-border-radius: 100%;
                                border-radius: 100%;
                            }
                            > img[lazy=loading] {
                                position: absolute;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                top: 0;
                                width: 20px;
                                margin: auto;
                            }
                            
                        }
                        dd {
                            padding-left: rem(15);
                            color: #333;
                            font-size: rem(14);
                            > p {
                                line-height: rem(19);
                            }
                            p:last-child {
                                margin-top: rem(5);
                            }
                        }
                    }
                    .ckBtn {
                        width: 100%;
                        height: rem(49);
                        line-height: rem(49);
                        text-align: right;
                        background-color: #fff;
                        padding: 0 rem(15); 
                        > span {
                            button {
                                width: rem(72);
                                height: rem(23);
                                line-height: rem(23);
                                color: #808080;
                                font-size: rem(11);
                                background-color: #fff;
                                border: 1px solid #808080;
                                padding: 0; 
                                text-align: center;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }
                        }
                        
                        button {
                            margin-left: rem(15);
                        }
                        .blue {
                            button {
                                color: #469AF4;
                                border:1px solid #469AF4;
                            }
                        }
                        .orange {
                            button {
                                color: #F09F88;
                                border:1px solid #F09F88;
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
            height: rem(49);
            font-size: rem(17);
        }
    }
}
</style>
