<template >
    <div class='list' ref='list'>
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            >
            <van-cell
                v-for="item in concatFaceList"
                :key="item.id"
            >
                <div class="header">
                    <div class="title">订单号：</div>
                    <div class="content">{{item.orderNo}}</div>
                </div>
                <div class="wrapper">
                     <div class="imgWrapper" v-for="innerItem of item.faceDetails" :key="innerItem.visitorId">
                        <img :src="innerItem.faceUrl" alt="" v-if="innerItem.faceUrl">
                        <img src="../../../assets/placeholder.png" alt="" v-else>
                        <img :src="innerItem.aibeeFaceUrl" alt="" v-if="innerItem.aibeeFaceUrl">
                        <img src="../../../assets/placeholder.png" alt="" v-else>
                    </div>
                    <div class="infoWrapper">
                        <div class="header">
                            <div class="title">景区：</div>
                            <div class="content">{{item.parkName}}</div>
                        </div>
                    </div>
                </div>
                <div class="button">
                    <van-button type="info" size="small"  v-if="item.deleteFlag == 0" @click="resetFace(item.orderNo)">重置人脸</van-button>
                    <van-button type="warning" size="small" v-if="item.deleteFlag == 0" @click="deleteFace(item.id)">删除人脸</van-button>
                    <van-button type="primary" size="small" v-if="item.deleteFlag == 1" @click="restoreFace(item.id)">恢复人脸</van-button>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>


<script>
import Vue from 'vue';
import { Button } from 'vant';
import { getFaceList,deleteFace,resetFace,restoreFace} from '../../../utils/face'
import { Dialog } from 'vant';
import { List } from 'vant';

Vue.use(List);
Vue.use(Dialog);
Vue.use(Button);
export default {
    name:'facelist',
    props:{
        list:Array,
        paramData:Object
    },
    data(){
        return {
            loading:false,
            finished:false,
            faceList:[],
            concatFaceList:[],
            total:0,   //返回的总页数
            index:0,   //记录请求的次数
            param:this.paramData,
            error:false
        }
    },
    created(){
        this.getList(this.paramData)
    },
    methods:{
        getList(){
            getFaceList(this.param)
                .then(res=>{
                    if (res.data.code != 200) {
                        this.$toast.fail(res.data.error);
                        return;
                    }
                    this.loading = false
                    this.index++;
                    this.faceList  = res.data.data.data
                    this.concatFaceList = this.concatFaceList.concat(this.faceList)
                    this.total = res.data.data.totalCount
                }) 
                .catch(err => {
                    this.error = true
                })
        },
        onLoad(){
            setTimeout(()=>{
                if(this.index < this.total ){
                    this.getList();
                }else{
                    this.loading = false;
                    this.finished = true;
                } 
            },500)
        },
        resetFace(orderNo){
            Dialog.confirm({
                message: '确认允许重置人脸？'
            }).then(() => {
                resetFace(orderNo).then(res=>{
                    if(res.data.code != 200){
                        this.$toast.fail(res.data.error);
                    }
                    this.$toast.success('操作成功')
                })
            })
        },
        deleteFace(id){
            Dialog.confirm({
                message: '确认要删除人脸？'
            }).then(() => {
                deleteFace(id).then(res=>{
                    if(res.data.code != 200){
                        this.$toast.fail(res.data.error);
                    }
                    this.$toast.success('操作成功')
                })
            })
        },
        restoreFace(id){
            Dialog.confirm({
                message: '确认要恢复人脸？'
            }).then(() => {
                restoreFace(id).then(res=>{
                    if(res.data.code != 200){
                        this.$toast.fail(res.data.error);
                    }
                    this.$toast.success('操作成功')
                })
            })
        }
    }
}
</script>


<style lang='scss' scoped>

.list{
    .header{
        display:flex;
        .title{
            width:2.5rem;
            color:#777;
        }
        .content{
            flex:1;
        }
    }
    .wrapper{
        overflow: hidden;
        .imgWrapper{
            margin-top:0.1rem;
            float:left;
            img{
                width:3rem;
                margin-right:0.2rem;
            }
        }
        .infoWrapper{
            float:left;
            .header{
                display:flex;
                margin-left:0.3rem;
                .title{
                    width:2rem;
                    color:#777;
                }
                .content{
                    flex:1;
                }
            }
        }
    }
    .button{
        margin-top:0.5rem;
        .van-button{
            margin-right:0.2rem;
        }
    }
    
}

</style>