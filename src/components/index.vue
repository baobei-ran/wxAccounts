
<template>
<!-- 首页 云医康在线 -->
    <div class="index dis_f flex_d">
        <div class="header dis_f">
            <img @click='Return' src="../common/img/icon_fh.png" alt="">
            <span>云医康在线</span>
        </div>
        <div class="content_box flex1"> 
            <div class='content'>
                <div class="time"><span>18:02:34</span></div>
               <div class="userMsg_box">
                     <div class="user">
                      <ul>
                          <li>
                              <img src="../common/img/pic_wdys_ystx.png" alt="">
                          </li>
                          <li>
                              您已选择李一一医生，请直接沟通实地考察实地考察收看电视
                          </li>
                      </ul>
                  </div>
                  <div class="myuser">
                      <ul>
                          <li class="msg">
                              医生，请给我来个大力神丸，吃了金枪不倒
                          </li>
                          <li class="head">
                              <img src="../common/img/pic_wdys_ystx.png" alt="">
                          </li>
                      </ul>
                  </div>
               </div>
            </div>
        </div>
        <div class="footer">
            <ul class="dis_f">
              <li></li>
              <li>我的医生</li>
              <li>个人中心</li>
              <li @click='moreServer'>更多服务</li>
               <div class="fiexd" v-show="buttonShow">
                    <p @click="out('/finddoctor')">找医生</p>
                    <p @click='out("/finddoctor")'>最近的店铺</p>
                    <p @click='out("/doctorshoplist")'>更多医生店铺</p>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
        data () {
            return {
                buttonShow: false,    // 控制底部导航栏
                timer: new Date().toLocaleTimeString(),
                content: ''
            }
        },
        methods: {  
            handleClick () {    // 提交
               
            },
            Return () { // 返回上一级
                this.$router.go(-1)
            },
            moreServer () {
                this.buttonShow = !this.buttonShow
            },

            //滚动到底
          scrollToBottom(){
            setTimeout(()=>{
              //滚动条长度
              var currentDistance=this.$refs.xwBody.scrollHeight-this.$refs.xwBody.clientHeight;
              //当前滚动条距离顶部的距离
              var currentScroll_y=this.$refs.xwBody.scrollTop;
              if(currentDistance>0 && currentDistance>currentScroll_y){
                  currentScroll_y=Math.ceil((currentDistance-currentScroll_y)/10)+currentScroll_y;
                  currentScroll_y=currentScroll_y>currentDistance ? currentDistance: currentScroll_y;
                  //微信和qq浏览器不支持 scrollTo？
                  //this.$refs.xwBody.scrollTo(0,currentScroll_y);
                  this.$refs.xwBody.scrollTop = currentScroll_y;
                  this.scrollToBottom();
              }
            },13);
  },
        }
}
</script>

<style lang='scss' scoped>
@function rem($px) {
  @return $px / 82.8 + rem;
}
.index {
    width: 100%;
    height: 100%;
    font-size: rem(16);
    .header {
        display: -webkit-flex;
        display: flex;
        height: rem(64);
        justify-content: center;
        color: #212121;
        position: relative;
        box-shadow:0px 1px 0px 0px rgba(224,224,224,1);
        padding-top: rem(0);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        img {
            font-size: rem(30);
            position: absolute;
            left: rem(15);
            top: rem(25);
            line-height: 1;
            font-size: rem(19);
            width: rem(30);
        }
        span {
            padding-top: rem(28);
            font-weight:400;
            color: #181818;
            font-size: rem(24)
        }
    }
    .content_box {
        width: 100%;
        background: #F4E1D1;
        overflow: auto;
        .content {
          width: 100%;
          padding: rem(18);
          .time {
              width: 100%;
              > span {
                display: block;
                margin: 0 auto;
                text-align: center;
                width: rem(120);
                height: rem(30);
                line-height: rem(30);
                background: #fff;
                color: #181818;
                font-size: rem(20);
                -webkit-border-radius: rem(4);
                border-radius: rem(4);
              }
          }
          .userMsg_box {
              width: 100%;
              .user {
                width: 100%;
                margin-top: rem(20);
                ul {
                    display: flex;
                    color: #181818;
                    
                  li:first-child {
                      width: rem(60);
                      height:rem(60);
                      background: #fff;
                      border-radius:rem(8);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                  }
                  li:last-child {
                    margin-left: rem(14);
                    max-width: 70%;
                    background: #fff;
                    padding: rem(21);
                    line-height: rem(30);
                    position: relative;
                    border-radius: rem(8);
                  }
                  li:last-child:after {
                    content: '';
                    border-width: rem(10);
                    border-style: solid;
                    border-color: #fff transparent transparent transparent;
                    position: absolute;
                    left: rem(-18);
                    top: rem(10);
                    transform: rotate(90deg);
                  }
                }
            }

            .myuser {
                width: 100%;
                margin-top: rem(20);
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
                      width: rem(60);
                      height:rem(60);
                      background: #fff;
                      border-radius:rem(8);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                  }
                    .msg {
                      margin-right: rem(14);
                      max-width: 70%;
                      background: #fff;
                      padding: rem(21);
                      line-height: rem(30);
                      position: relative;
                      border-radius: rem(8);
                    }
                    .msg:after {
                      content: '';
                      border-width: rem(10);
                      border-style: solid;
                      border-color: #fff transparent transparent transparent;
                      position: absolute;
                      right: rem(-18);
                      top: rem(10);
                      transform: rotate(-90deg);
                    }
                }
            }
          }
          
        }
    }
    .footer {
        width: 100%;
        ul {
          padding: rem(18);
          position: relative;
            li {
              width: 25%;
              text-align: center;
              line-height: rem(58);
              color:#181818;
              font-size: rem(20);
            }
            .fiexd {
                position: absolute;
                width: rem(183);
                right: 0;
                bottom: rem(93);
                background: #fff;
                transition:all 1s;
                >p {
                  text-align: center;
                  line-height: rem(58);
                  border-bottom: 1px solid #D9D9D9;
                }
              }
        }
    }
       
}
</style>
