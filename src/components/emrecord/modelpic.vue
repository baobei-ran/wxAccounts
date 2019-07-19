<template>
    <!-- 图片预览组件 -->
    <div class="modelpic dis_f flex-vc" @click='clickModelShade'>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="pic in picdata">
                    <img ref='imgs' :src="pic" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            picdata: []
        }
    },
    mounted () {
    },
    methods: {
        clickModelShade () {
            this.$emit('modelShade', false);
            this.picdata = [];
        },
        modelScalePic (data, i) {
            this.picdata = data;
            if (data.length > 1) {
                this.$nextTick(() => {
                    var swiper = new Swiper('.swiper-container', {
                        initialSlide: i?i:0,
                        loop: false,
                        autoplay: false,
                    })
                })
            }
        },
    }
}
</script>
<style lang="scss">
.modelpic  {
   >.swiper-container {
        width:100%;
        .swiper-wrapper {
            .swiper-slide {
                text-align: center;
                > img {
                   width: 100%;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 100+rem;
}
.modelpic {
   width: 100%;
   height: 100%;
}
</style>
