<template>
    <div class="parkOrder">
        <van-search
            v-model.trim="value"
            show-action
            placeholder="请输入手机号或证件号搜索"
            @search="onSearch"
            @clear="onClear"
            >
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>

        <ul class="orderList" v-if="orderList.length > 0">
            <li class="orderList-item" v-for="item in orderList" :key="item.id" @click.stop="goOrderSeat(item)">
                <div class="left">
                    <div class="item">
                        <span class="title">演出日期:</span>
                        <span class="content">{{item.traveldate | filtersTravelDate}}</span>
                    </div>
                    <div class="item">
                        <span class="title">演出场次:</span>
                        <span class="content">{{item.performTime}}</span>
                    </div>
                    <div class="item">
                        <span class="title">手机号:</span>
                        <span class="content">{{item.telno}}</span>
                    </div>
                    <div class="item">
                        <span class="title">证件号:</span>
                        <span class="content">{{item.certno}}</span>
                    </div>
                </div>
                <div class="right" @click.stop="goOrderSeat(item)">
                    <div class="btn">
                        <span>座位</span>
                        <span>详情</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="tips" v-if="showTips">
            <img src="https://static.dmqwl.com/warning.jpg" alt="">
            <p class="tips-content">未搜索到订单</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search } from 'vant';
import { getParkOrderList } from "../../utils/orderSeat";
import { FormatDate } from "../../utils/Format";
Vue.use(Search);

export default {
    name:'parkOrder',
    data(){
        return {
            orderList:[],
            mobile:'',
            idCard:'',
            value: '',
            parkId:this.$route.params.parkId,
            showTips:false
        }
    },
    filters:{
        filtersTravelDate(value){
            return FormatDate(value)
        }
    },
    created(){
        const searchkeyCache = sessionStorage.getItem("searchkey")
        const listCache = sessionStorage.getItem("list")
        if(searchkeyCache){
            this.value = searchkeyCache
        }
        if(listCache){
            this.orderList = JSON.parse(listCache)
        }
    },
    methods:{
        onSearch(){
            this.showTips = false
            this.orderList = []
            this.removeCache()
            if(!this.value){
                return this.$toast.fail('请输入搜索条件')
            }
            let reg = /^1[0-9]{10}$/
            if(reg.test(this.value)){
                this.mobile = this.value
                const data = {
                    parkId:this.parkId,
                    mobile:this.mobile,
                }
                getParkOrderList(data).then( res => {
                    if(!res.data.code || res.data.data.length == 0){
                        this.showTips = true
                        return 
                    }
                    if (res.data.code != 200) {
                        return this.$toast.fail(res.data.error);
                    }
                    sessionStorage.setItem('searchkey',this.mobile)
                    sessionStorage.setItem("list",JSON.stringify(res.data.data))
                    this.orderList = res.data.data
                })
            }else{
                this.idCard = this.value
                const data = {
                    parkId:this.parkId,
                    idCard:this.idCard,
                }
                getParkOrderList(data).then( res => {
                    if(!res.data.code || res.data.data.length == 0){
                        this.showTips = true
                        return 
                    }
                    if (res.data.code != 200) {
                        return this.$toast.fail(res.data.error);
                    }
                    sessionStorage.setItem('searchkey',this.idCard)
                    sessionStorage.setItem("list",JSON.stringify(res.data.data))
                    this.orderList = res.data.data
                })
            }
        },
        // 清空搜索框
        onClear(){
            this.orderList = []
            this.removeCache()
            this.showTips = false
        },
        // 跳转到座位详情
        goOrderSeat(item){
            this.$router.push(`/orderSeat/${this.parkId}/${item.billoutno}`)
        },
        // 清除缓存
        removeCache(){
            sessionStorage.removeItem("searchkey")
            sessionStorage.removeItem("list")
        }
    }
}
</script>

<style lang="scss" scoped>
.parkOrder{
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
                        padding-left:0.1rem;
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
                        line-height: 1rem;;
                    }
                }
            }

        }
    }
    .tips{
        height:300px;
        background:#fff;
        text-align: center;
        img {
            width:4rem;
            margin-top:1rem;
        }
        .tips-content{
            line-height: 2rem;
            font-size: 1rem;
            margin-top:1rem;
        }
    }
}
</style>