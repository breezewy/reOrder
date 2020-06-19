<template >
    <div class="searchOrder">
        <van-search
            v-model.trim="mobile"
            show-action
            placeholder="请输入手机号码"
            @search="onSearch"
            @clear="onClear"
        >
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>

        <ul class="orderList" v-if="orderList.length > 0">
            <li class="orderList-item" v-for="item in orderList" :key="item.id" @click.stop="goHomePage(item)">
                <div class="left">
                    <div class="item">
                        <span class="title">姓名:</span>
                        <span class="content">{{item.linkName}}</span>
                    </div>
                    <div class="item">
                        <span class="title">手机号:</span>
                        <span class="content">{{item.linkMobile}}</span>
                    </div>
                    <div class="item">
                        <span class="title">产品名称:</span>
                        <p class="productName">{{item.productName}}</p>
                    </div>
                </div>
                <div class="right" @click.stop="goHomePage(item)">
                    <div class="btn">
                        <span>预约</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search } from 'vant';
import { searchOrder } from "../../utils/api";
Vue.use(Search);
export default {
    name:'searchOrder',
    data(){
        return {
            mobile:'',
            orderList:[]
        }
    },
    methods:{
        // 搜索订单
        onSearch(){
            searchOrder(this.mobile).then(res => {
                if (res.data.code != 200) {
                    this.$toast.fail(res.data.error);
                }
                this.orderList = res.data.data
            })
        },
        // 跳转到首页
        goHomePage(item){
            this.$router.push(`/home/${item.orderNo}`)
        },
        // 清空搜索框
        onClear(){
            this.orderList = []
        }
    }
}
</script>

<style lang="scss" scoped>
    .searchOrder{
        .van-search__action{
            font-size: 0.8rem;
            padding:0 0.8rem;
        }
        .orderList{
            background:rgba(#fff,0.8);
            padding:0.4rem;
            .orderList-item{
                border:1px solid #666;
                border-radius:0.3rem;
                padding:0.4rem;
                margin-bottom:0.4rem;
                display: flex;
                .left{
                    height:100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width:100%;
                    .item{
                        line-height: 1rem;
                        .title{
                            display: inline-block;
                            width:3rem;
                        }
                        .content{
                            display: inline-block;
                            width:8rem;
                        }
                    }
                    .item:last-child{
                        display: flex;
                        .productName{
                            flex:1;
                            padding-left:4px;
                        }
                    }
                }
                .right{
                    height:auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .btn{
                        border: 1px solid;
                        padding:0.2rem 0;
                        width:3rem;
                        height: 2rem;
                        background:#562e27;
                        border: none;
                        color:#f2cf97;
                        border-radius:0.3rem;
                        font-size: 0.7rem;
                        text-align: center;
                        span{
                            display: inline-block;
                            width:100%;
                            line-height: 2rem;;
                        }
                    }
                }

            }
        }
    }

</style>