<template>
    <div class="userdata">
        <!-- <div class="header">
            <img @click='Return' src="../../common/img/icon_fh.png" alt="">
            <span>个人信息</span>
        </div> -->
        <div class="section">
            <ul>
                <li><span>头像</span><img ref="userImg" src="../../common/img/pic_txxq.png" alt=""></li>
                <li><span>姓名</span><span>{{ userInfor.real_name }}</span></li>
                <li><span>身份证号</span><span>{{ userInfor.id_card }}</span></li>
                <li><span>手机号码</span><span>{{ userInfor.patient_phone }}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userInfor: {}
        }
    },
    mounted() {
        var self = this;
        var uid = this.$cookie.get('userLogins')
        this.$http.post('/mobile/wxauth/center', { uid: uid}).then(res => {
            console.log(res)
            if (res.code == 1) {
                self.userInfor = res.data
                self.userInfor.id_card = self.userInfor.id_card.substr(0, 6) + '****' + self.userInfor.id_card.substr(14, self.userInfor.id_card.length)
                if (self.userInfor.pic) {
                    self.$refs.userImg.src = self.$http.baseURL + self.userInfor.pic
                }
            } else {

            }
        })
    },
    methods: {
        Return () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.userdata {
    width: 100%;
    height: 100%;
    font-size: rem(16);
    .header {
        -webkit-display: flex;
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
            width: rem(28);
            padding: rem(5);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .section {
        width: 100%;
        background: #fff;
        padding-bottom: rem(5);
        ul {
            width: 100%;
            font-size: rem(14);
            li {
                width: 100%;
                padding: rem(20) rem(16);
                -webkit-display: flex;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #ebebeb;
                align-items: center;
                img {
                    width: rem(44);
                    height: rem(44);
                    border-radius: 50%;
                }
                span:last-child {
                    color: #666;
                }
            }
        }
    }
}
</style>

