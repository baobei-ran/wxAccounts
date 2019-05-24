<template>
    <!-- 咨询记录 -->
    <div class="docrecord dis_f flex_c">
        <div class="content_box flex1"> 
            <div class='content'>
                <div class="time"><span>07-12 18:02:34</span></div>
               <div class="userMsg_box" v-for='val in msgList'>
                     <div class="doc" v-if='val.aa == 1'>
                      <ul>
                          <li>
                              <img src="../../common/img/pic_wdys_ystx.png" alt="">
                          </li>
                          <li>
                              <p> {{ val.msg }}</p>
                              <div class="docFang" v-if='val.y == 1'>
                                  <img src="../../common/img/img_lt_cfy.png" alt="">
                                  <span>{{ val.us }}</span>
                              </div>
                          </li>
                      </ul>
                  </div>
                  <div class="myuser" v-if='val.aa == 2'>
                      <ul>
                          <li class="msg">
                              医生，请给我来个大力神丸，吃了金枪不倒
                              {{ val.msg }}
                          </li>
                          <li class="head">
                              <img src="../../common/img/pic_wdys_ystx.png" alt="">
                          </li>
                      </ul>
                  </div>
               </div>
            </div>
        </div>
        <div class="footer">
            <mt-button @click.native="handerDoctor">继续咨询记录</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'docrecord',
    data () {
        return {
            msgList: [
                {aa: 1, msg: '您已选择李一一医生，请直接沟通实地考察实地考察收看电视,更好的dscfhsd 剑'},
                {aa: 2, msg: '更好的顺风车释放出的时间表的就撤风刀霜剑'},
                {aa: 1, msg: '您已选择李一一医生，请直接沟通实地考察实地考察收看电视,更好的顺风车释放出的时间表的就撤风刀霜剑'},
                {aa: 2, msg: '更好的顺风车释放出的时间表的就撤风刀霜剑'},
                {aa: 2, msg: '更好的顺风车释放出的时间表的就撤风刀霜剑'},
                {aa: 1, y: 1, msg: '电子处方', pic: '', us: '患者李除阿的电子处方'},
                {aa: 1, y: 1, msg: '药品推荐', pic: '', us: '白云山板蓝根颗粒20袋清热解毒咽喉肿痛感冒药冲剂'},
                {aa: 2, msg: '更好的顺风车释放出的时间表的就撤风刀霜剑'},
            ]
        }
    },
    methods: {
        handerDoctor: function () {  // 立即咨询
            this.out('/docrecommend')
        }
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
    background-color: #fafafa;
    .content_box {
        width: 100%;
        overflow-y: scroll;
        .content {
          width: 100%;
          padding: rem(18);
          .time {
              width: 100%;
              text-align: center;
              > span {
                color: #666;
                font-size: rem(12);
              }
          }
          .userMsg_box {
              width: 100%;
              .doc {
                width: 100%;
                margin-top: rem(15);
                ul {
                    display: flex;
                    color: #181818;
                    
                  li:first-child {
                      width: rem(37);
                      height:rem(37);
                     -webkit-border-radius:100%;
                      border-radius:100%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                  }
                  li:last-child {
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
                      width: rem(37);
                      height:rem(37);
                      -webkit-border-radius:100%;
                      border-radius:100%;
                    img {
                        width: 100%;
                        height: 100%;
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
            background-position: rem(110) center;
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

