<template>
    <!-- 就诊成员管理 -->
    <div class="administration dis_f flex_c">
        <div class="section flex1">
            <ul>
                <li v-for='(val,i) in 50' :key='i'>
                    <span>就诊人员姓名A{{ i+1 }}</span>
                    <span @click='editClixk(1)'>编辑</span>
                </li>
            </ul>
        </div>
        <div class="footer">
            <mt-button @click.native="addClick">添加成员</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'administration',
    data () {
        return {

        }
    },
    methods: {
        addClick: function () {
            this.out('/administration/addmember')
        },
        editClixk: function (id) {
            this.$router.push({path: '/administration/editmember', query: { id: id }})
        }
    }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
.administration {
    width: 100%;
    height: 100%;
    font-size: rem(14);
    background: #fff;
    .section {
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        ul {
            width: 100%;
            li {
                width: 100%;
                height: rem(44);
                line-height: rem(44);
                margin-left: rem(16);
                padding-right: rem(16);
                overflow: hidden;
                border-bottom: 1px solid #E0E0E0;
                span:first-child {
                    color:#212121;
                }
                >span:last-child {
                    float: right;
                    color: #469AF4;
                    border-left: 1px solid #E0E0E0;
                    padding: 0 rem(12);
                    height: rem(17);
                    line-height: rem(17);
                    margin-top: rem(13);
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
            background-color: #469AF4;
            color: #fff;
            font-size: rem(16);
            -webkit-border-radius: 0;
            border-radius: 0;
        }
    }
}
</style>

