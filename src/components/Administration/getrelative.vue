<template>
    <!-- 选择与本人的关系 -->
    <div class="getrelative">
        <ul>
            <li v-for='(val,i) in relations' :key='i' @click='pitchonClick(val)'><span>{{ val }}</span><img v-show="val == v_success" src='../../common/img/icon_xuanze.png' alt='' /> </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            relations: ['父母', '兄弟姐妹', '子女', '配偶', '其他'],
            v_success: ''
        }
    },
    methods: {
        pitchonClick: function (v) {
            this.v_success = v;
            var val = { hi: false, value: v  }
            this.$emit("childByValue", val)
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.getrelative {
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-size: rem(14);
    > ul {
        width: 100%;
        padding-left: rem(16);
        li {
            font-size: rem(14);
            color: #333;
            border-bottom: 1px solid #E0E0E0;
            padding: rem(18) rem(18) rem(18) 0;
            line-height: rem(22);
            overflow: hidden;
            cursor: pointer;
            > img {
                display: block;
                width: rem(22);
                height: rem(22);
                float: right;
                -webkit-vertical-align: middle;
                vertical-align: middle;
            }
        }
    }
}
</style>

