<template>
    <div class="programme" v-wechat-title="$route.meta.title">
        <home-swiper :list="swiperList"></home-swiper>
        <ul>
            <li class="item" v-for="item in dataList" :key="item.id">
                <div class="item_content">
                    <span class="item_content_title">{{item.name}}</span>
                    <a :href="item.url" class="item_content_arrow">>></a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import HomeSwiper from './component/Swiper'
import {getGuidance} from '../../utils/programme'
export default {
    name:"programme",
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
            dataList:[]
        }
    },
    created(){
        this.getGuidance()
    },
    methods:{
        getGuidance(){
            getGuidance().then(res=>{
                if (res.data.code != 200) {
                    this.$toast.fail(res.data.error);
                    return;
                }
                let data =  res.data.data;
                data.forEach(item=>{
                    if(item.id == '1'){
                        item.detailResponses.forEach(res =>{
                            this.dataList.push(res)
                        })
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .programme{
        background:#fff;
        min-height:100vh;
        .item{
            border-bottom:1px solid #ccc;
            padding:0.5rem;
            .item_content{
                position: relative;
                border:1px solid #ccc;
                line-height: 1.8rem;
                padding-left:0.5rem;
                .item_content_arrow{
                    display: inline-block;
                    background:#777;
                    padding:0.1rem 0.3rem;
                    border-radius:1rem;
                    line-height: 0.8rem;
                    color:#fff;
                    position: absolute;
                    right:0.2rem;
                    top:50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
</style>