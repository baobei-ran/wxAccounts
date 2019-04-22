<template>
    <div class="imgDetails dis_f flex_d">
        <div class="header">
            <img @click='Return' src="../../../common/img/icon_fh.png" alt="">
            <span>处方详情</span>
        </div>
        <div class="section_box flex1">
            <div class="section"> 
                <img class="imgs" src="../../../common/img/icon_bc.png" alt="">
                <div class="btn">
                <a href=""><img src="../../../common/img/icon_bc.png" alt="" />保存处方到相册</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data () {
                return {

                }
            }
        }
    },
    mounted () {
        console.log(this.$route.params)
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
.imgDetails {
    width: 100%;
    height: 100%;
    font-size: rem(16);
    .header {
        display: -webkit-flex;
        display: flex;
        height: rem(40);
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
            top: rem(8);
            line-height: 1;
            font-size: rem(19);
            width: rem(30);
            padding: rem(5);
        }
        span {
            padding-top: rem(15);
            font-weight:400;
            color: #212121;
        }
    }
    .section_box {
        overflow-y: scroll;
    }
    .section {
        width: 100%;
        padding: rem(10);
        background-color: #000;
        font-size: rem(14);
        height: 100%;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        > .imgs {
            width: 100%;
            height: rem(336);
            border: 1px solid red;
            background-color: #fff;
        }
        > .btn {
            position: fixed;
            bottom: rem(23);
            left: 24%;
            width: rem(165);
            line-height: rem(44);
            background:#333;
            text-align: center;
            color: #fff;
            border: 1px solid #333;
            border-radius: rem(23);
            
            > a {
                color: #fff;
                font-weight:400;
                vertical-align: middle;
                > img {
                    width: rem(25);
                    vertical-align: middle;
                    margin-bottom: rem(3);
                }
            }
        }
    }
    
}
</style>

