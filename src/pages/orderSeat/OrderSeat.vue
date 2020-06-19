<template>
    <div class="orderSeat">
        <ul>
            <li class="orderSeatItem">
                <span class="item-title">订单状态</span>
                <span class="item-content">{{orderSeat.webbillstatus | filterStatus}}</span>
            </li>
            <li class="orderSeatItem">
                <span class="item-title">演出日期</span>
                <span class="item-content">{{orderSeat.performDate}}</span>
            </li>
            <li class="orderSeatItem">
                <span class="item-title">演出场次</span>
                <span class="item-content">{{orderSeat.performTime}}</span>
            </li>
            <li class="orderSeatItem">
                <span class="item-title">剧院名称</span>
                <span class="item-content">{{orderSeat.locationName}}</span>
            </li>
            <li class="orderSeatItem">
                <span class="item-title">联系人</span>
                <span class="item-content">{{orderSeat.name}}</span>
            </li>
            <li class="orderSeatItem">
                <span class="item-title">联系方式</span>
                <span class="item-content">{{orderSeat.telNo}}</span>
            </li>
            <li class="orderSeatDetail">
                <span class="item-title">座位号</span>
                <div class="detailArea">
                    <div class="detail" v-for="(item,index) in orderSeat.detail" :key="index">
                        <span class="seatName">{{item.areaName}}</span>
                        <span class="seatRow">{{item.row}}排</span>
                        <span class="seatCol">{{item.col}}座</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { getOrderSeat } from "../../utils/orderSeat";
export default {
    name:'OrderDetail',
    data(){
        return {
            parkId:this.$route.params.parkId,
            orderId:this.$route.params.orderId,
            orderSeat:{}
        }
    },
    created(){
        this.getOrderDetail()
    },
    filters:{
        filterStatus(value){
            return value === 1 ? '正常' : '已退单'
        }
    },
    methods:{
        // 获取订单详情
        getOrderDetail() {
            getOrderSeat(this.parkId,this.orderId).then( res => {
                if (res.data.code != 200) {
                    return this.$toast.fail(res.data.error);
                }
                this.orderSeat = res.data.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .orderSeat{
        padding:1rem;
        background:#fff;
        color:#323232;
        font-size: 0.6rem;
        letter-spacing: 1px;
        ul .orderSeatItem{
            height:1.8rem;
            border-bottom:1px solid #e7e9eb;
            .item-title{
                display:inline-block;
                line-height: 1.8rem;
                width:3.5rem;
            }
            .item-content{
                display:inline-block;
                line-height: 1.8rem;
            }
        }
        ul .orderSeatDetail{
            display: flex;
            border-bottom:1px solid #e7e9eb;
            .item-title{
                display:inline-block;
                width:3.5rem;
                height:auto;
                padding-top:0.5rem;
            }
            .detailArea{
                .detail{
                    line-height:  1.8rem;
                }
            }          
        }
    }
</style>