<template>
    <div class="traffic" v-wechat-title="$route.meta.title">
        <home-swiper :list="swiperList"></home-swiper>
        <h1 class="title">{{title}}</h1>
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item :title="item.name" :name="index"  v-for="(item,index) in trafficList" :key="item.id">
                <div class="item">
                    <a :href="item.url">{{item.name}}</a>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import HomeSwiper from './component/Swiper'
import {getTraffic} from '../../utils/programme'

export default {
    name:"Traffic",
    components:{
        HomeSwiper
    },
    data(){
        return {
            swiperList:[{
                id:"001",
                imgUrl:'https://static.dmqwl.com/booking/20191207/cc9b91ee1c3740b6bde1479684125aa2.jpg'
            },
            {
                id:"002",
                imgUrl:'https://static.dmqwl.com/booking/20191207/cc9b91ee1c3740b6bde1479684125aa2.jpg'
            }],
            activeName: ['0'],
            trafficList:[],
            title:""
        }
    },
    created(){
        this.getTraffic()
    },
    methods:{
        getTraffic(){
            getTraffic().then(res=>{
                if (res.data.code != 200) {
                    this.$toast.fail(res.data.error);
                    return;
                }
                let data = res.data.data;
                this.title = data[1].name
                this.trafficList = data[0].detailResponses
            })
        }
    }
}
</script>

<style lang="scss">
     .traffic{
        background:#fff;
        min-height:100vh;
        .title{
            line-height: 1.5rem;
            font-size: 0.8rem;
            text-align: center;
        }
        .item{
            // line-height: 1.5rem;
            padding:0.5rem 0;
            border-bottom:1px solid #f5f6f7;
        }
    }
</style>