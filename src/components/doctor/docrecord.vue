<template>
    <!-- 咨询记录 -->
    <div class="docrecord dis_f flex_c">
        <div class="content_box flex1" id='scrolls'> 
            <div class='content'>
                <dl class="emptys" v-if='!msgList.length'>
                    <dt></dt>
                    <dd>暂无数据</dd>
                </dl>
               <div class="userMsg_box" v-for='(val, i) in msgList' :key='i'>
                    <div class="time"><span>{{ val.chat_time }}</span></div>
                     <div class="doc" v-if='val.user1 == "doc_367"'>
                      <ul>
                          <li class="doc_img">
                              <img :src="$http.baseURL+val.uimg1" alt="">
                          </li>
                          <li class="txt" v-if='val.type == "txt"'>
                              <p> {{ val.content }}</p>
                              <div class="docFang" v-if='val.stype == 1' @click='chuFang(val.ext)'>
                                  <img src="../../common/img/img_lt_cfy.png" alt="">
                                  <span>电子处方</span>
                              </div>
                              <div class="docFang" v-if='val.stype == 2' @click='yaoPin(val.ext)'>
                                  <img src="../../common/img/icon_yptj.png" alt="">
                                  <span>推荐商品</span>
                              </div>
                              <div class="docFang" v-if='val.stype == 3'>
                                  <img src="../../common/img/icon_xxmz.png" alt="">
                                  <span>线下门诊</span>
                              </div>
                          </li>
                          <li class="imgs"  v-if='val.type == "img"'><img :src="$http.baseURL+val.content" alt=""></li>
                          <li class="audios"  v-if='val.type == "audio"'>

                          </li>
                      </ul>
                  </div>
                  <div class="myuser" v-if='val.user1 == "user_559"'>
                      <ul>
                          <li class="msg" v-if='val.type == "txt"'>{{ val.content }}</li>
                          <li class="msg2" v-if='val.type == "img"'><img :src="$http.baseURL+val.content" alt=""></li>
                          <li class="msg3" v-if='val.type == "audio"'>

                          </li>
                          <li class="head">
                              <img :src="$http.baseURL+val.uimg1" alt="">
                          </li>
                      </ul>
                  </div>
               </div>
            </div>
        </div>
        <div class="footer">
            <mt-button v-show="status == 0 || !msgList.length" @click.native="handerDoctor">立即咨询</mt-button>
            <mt-button v-show="status == 1" @click.native="handerDoctor2">继续咨询</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'docrecord',
    data () {
        return {
            msgList: [],  // 数据
            uid: this.$cookie.get('userLogins'),
            did: this.$route.query.id,              // 医生 id 
            status: this.$route.query.status        // 咨询状态
        }
    },
    mounted () {
        this.initdata();
    },
    methods: {
        // audio_mar: function (url) {   // 解析语音
            // setTimeout(() => {
                // var _self = this;
                // var amr = new BenzAMRRecorder();
                // var urls = this.$http.baseURL + url,
                //     playTime;
                // amr.initWithUrl(urls).then(function() {
                //     playTime = _self.amr.getDuration().toFixed(0) + '\"';
                // })
                // amr.onPlay(function () {
                //     console.log('开始播放');
                    
                // });
                // amr.onEnded(function() {
                //     console.log('播放完毕');
                    
                // })
                // amr.onStop(function() {
                //     console.log('停止播放');
                    
                // })
                // amr.onAutoEnded(function () {
                //     console.log('Event: autoEnded');
                // });
                // amr.onStartRecord(function () {
                //     console.log('Event: startRecord');
                // });
                // amr.onFinishRecord(function () {
                //     console.log('Event: finishRecord');
                // });
                // amr.onCancelRecord(function () {
                //     console.log('Event: cancelRecord');
                // });
                // var Audio = document.getElementById('Audio');
                // Audio.onclick = function () {
                //     if (_self.amr.isPlaying()) {
                //         console.log('停止播放');
                //         _self.amr.stop();
                //     } else {
                //         console.log('播放');
                //         _self.amr.play();
                //     }
                // }
            // }, 100)
        // },
        initdata: function () {
            var self = this, obj = { uid: this.uid, did: this.did };
            this.$http.post('/mobile/Wxregistration/chatting_records', obj).then(response => {
                console.log(response)
                if (response.code == 1) {
                    self.msgList = response.data
                    setTimeout(() => {
                        // self.funcReadImgInfo(".doc_img");
                        // self.funcReadImgInfo(".head");
                        self.funcReadImgInfo(".imgs");
                        self.funcReadImgInfo(".msg2");
                    }, 100)
                    this.$nextTick(() => {
                        // var container = this.$el.querySelector("#scrolls");
                        //     container.scrollTop = container.scrollHeight;
                        var msg = document.getElementById('scrolls');
                        msg.scrollTop = msg.scrollHeight            // 滚动高度
                    })
                }
            })
        },
        handerDoctor: function () {  // 立即咨询
            var self = this;
            var obj = { did: this.did, uid: this.uid}
            this.$http.post('/mobile/wxauth/consult', obj).then(res => {
                console.log(res)
                if (res.code == 1) {
                    self.$messagebox.confirm('已选择该医生，返回公众号首页，即可向医生咨询问题', {showCancelButton: false, confirmButtonText: '确定'}).then(action => {
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
        handerDoctor2: function () {  // 继续咨询
            this.$messagebox.confirm('返回公众号首页，即可继续向医生咨询问题', {showCancelButton: false, confirmButtonText: '确定'}).then(action => {
               WeixinJSBridge.call('closeWindow'); 
            });
        },
        chuFang: function (id) { // 去处方详情页
            this.$router.push({ path:'/chufdetails', query: {id: id} })
        },
        yaoPin: function (id) { // 去商品详情页
            console.log(id)
            this.$router.push({ path:'/shopdetail', query: {id: id} })
        },
        /*调用微信预览图片的方法*/
        funcReadImgInfo: function (dom) {
            var imgs = [];
            // var imgObj = $(".imgs img");//这里改成相应的对象
            var imgObj = $( dom +" "+"img")
            for(var i=0; i<imgObj.length; i++) {
                imgs.push(imgObj.eq(i).attr('src'));
                imgObj.eq(i).click(function() {
                    var nowImgurl = $(this).attr('src');
                        WeixinJSBridge.invoke("imagePreview",{
                    "urls":imgs,
                    "current":nowImgurl
                });
                });
            }
        },
    }
}

    
    
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 +rem;
}
.docrecord {
    width: 100%;
    height: 100%;
    font-size: rem(14);
    background-color: #F5F5F7;
    .content_box {
        width: 100%;
        overflow-y: scroll;
        .content {
          width: 100%;
          padding: 0 rem(18) rem(18);
          .emptys {
              width: 100%;
              text-align: center;
              padding-top: rem(40);
             dt {
                width: rem(120);
                height: rem(120);
                display: block;
                margin: 0 auto;
                background: url('../../common/img/pic_zwxgyyjl.png') no-repeat;
                background-size: contain;
                    
             }
             dd {
                  color: #808080;
                  font-size: rem(14);
                  margin-top: rem(15);
              }
          }
          .userMsg_box {
              width: 100%;
              .time {
                    width: 100%;
                    margin-top: rem(18);
                    text-align: center;
                    > span {
                        color: #999;
                        font-size: rem(11);
                    }
                }
              .doc {
                width: 100%;
                margin-top: rem(15);
                ul {
                    display: box; 
                    display: -webkit-box; 
                    display: -moz-box; 
                    display: -webkit-flex; 
                    display: -moz-flex; 
                    display: -ms-flexbox; 
                    display: flex;
                    color: #181818;
                    
                  li.doc_img {
                      width: rem(40);
                      height:rem(40);
                     -webkit-border-radius:100%;
                      border-radius:100%;
                    img {
                        width: rem(40);
                        height:rem(40);
                        -webkit-border-radius:100%;
                        border-radius:100%;
                    }
                  }
                  li.txt {
                    margin-left: rem(10);
                    max-width: 80%;
                    background: #fff;
                    padding: rem(10);
                    line-height: rem(18);
                    position: relative;
                    -webkit-border-radius:0px rem(10) rem(10) rem(10);
                    border-radius:0px rem(10) rem(10) rem(10);
                    .docFang {
                        width: 100%;
                        margin-top: rem(10);
                        background-color: #F5F5F7;
                        padding: rem(5);
                        overflow: hidden;
                        >img {
                            width: rem(41);
                            height: rem(41);
                            display: block;
                            margin-right: rem(11);
                            float: left;
                        }
                        > span {
                            color: #333;
                            font-size: rem(12);
                        }
                    }
                  }
                  li.imgs {
                        margin-left: rem(10);
                        max-width: 80%;
                        background: #fff;
                        padding: rem(10);
                        line-height: rem(18);
                        -webkit-border-radius:0px rem(10) rem(10) rem(10);
                        border-radius:0px rem(10) rem(10) rem(10);
                      > img {
                          width: rem(60);
                          -webkit-border-radius: 4px;
                          border-radius: 4px;
                      }
                  }
                  
                }
            }

            .myuser {
                width: 100%;
                margin-top: rem(15);
                ul {
                    display: box; 
                    display: -webkit-box; 
                    display: -moz-box; 
                    display: -webkit-flex; 
                    display: -moz-flex; 
                    display: -ms-flexbox; 
                    display: flex;
                    -webkit-justify-content: flex-end;
                    -moz-justify-content: flex-end;
                    -ms-justify-content: flex-end;
                    -o-justify-content: flex-end;
                    justify-content: flex-end;
                    color: #181818;
                    .head {
                      width: rem(40);
                      height:rem(40);
                      -webkit-border-radius:100%;
                      border-radius:100%;
                    img {
                        width: rem(40);
                        height:rem(40);
                        -webkit-border-radius:100%;
                        border-radius:100%;
                    }
                  }
                    .msg {
                        margin-right: rem(10);
                        max-width: 80%;
                        background: #fff;
                        padding: rem(10);
                        line-height: rem(18);
                        position: relative;
                        -webkit-border-radius: rem(10) 0px rem(10) rem(10);
                        border-radius:rem(10) 0px rem(10) rem(10);
                    }
                   .msg2 {
                       margin-right: rem(10);
                        max-width: 80%;
                        background: #fff;
                        padding: rem(10);
                        -webkit-border-radius: rem(10) 0px rem(10) rem(10);
                        border-radius:rem(10) 0px rem(10) rem(10);
                        > img {
                            width: rem(60);
                        }
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
            width: 100%;
            height: 100%;
            background: url('../../common/img/icon_ljwz.png') no-repeat;
            background-position: rem(123) center;
            background-size: 8%;
            background-color: #469AF4;
            color: #fff;
            font-size: rem(16);
            -webkit-border-radius: 0px;
            border-radius: 0px;
        }
    }
}
</style>

