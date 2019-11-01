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
                <div class="header">
                    <div class="title">联系人：</div>
                    <div class="content">{{item.linkName}}</div>
                </div>
                <div class="header">
                    <div class="title">手机号：</div>
                    <div class="content">{{item.linkMobile}}</div>
                </div>
                <div class="header">
                    <div class="title">证件号：</div>
                    <div class="content">{{item.linkIdcard}}</div>
                </div>
                <div class="header">
                    <div class="title">产品名称：</div>
                    <div class="content">{{item.productName}}</div>
                </div>
                <div class="status">
                    <span  class="Unpaid" v-if="item.orderStatus == 0 ||item.orderStatus == 1 || item.orderStatus ==2">未支付</span>
                    <span  class="tobeconsumed" v-if="item.orderStatus == 3 || item.orderStatus ==4 || item.orderStatus ==5 || item.orderStatus ==6">待消费</span>
                    <span class="consumption" v-if="item.orderStatus == 7">消费中</span>
                    <span class="consumed" v-if="item.orderStatus == 8">已消费</span>
                    <span class="returned-order" v-if="item.orderStatus == 9">已退单</span>
                </div>
                <div class="wrapper">
                     <div class="imgWrapper"  v-for="innerItem of item.faceDetails" :key="innerItem.orderId">
                        <img :src="innerItem.faceUrl"  v-if="innerItem.faceUrl" @click.stop="showPopUp01(innerItem)">
                        <img src="../../../assets/placeholder.png"  v-else>
                        <van-popup v-model="ashow">
                            <img style='width:90vw;margin-right:0' :src="asrc" ref="aface">
                        </van-popup>
                        <img :src="innerItem.aibeeFaceUrl" v-if="innerItem.aibeeFaceUrl"  @click.stop="showPopUp02(innerItem)">
                        <img src="../../../assets/placeholder.png"  v-else >
                        <van-popup v-model="bshow">
                            <img style='width:90vw;margin-right:0' :src="bsrc" ref="bface">
                        </van-popup>
                        <van-icon name="passed"  class="icon" size="1rem" @click.stop="hasActive($event,innerItem.id)" />
                    </div>
                </div>
                <div class="button">
                    <van-button type="warning" size="small" v-if="showBtn(item)" @click="deleteFace">删除人脸</van-button>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>


<script>
import Vue from 'vue';
import { Button } from 'vant';
import { getFaceList,deleteFace,resetFace} from '../../../utils/face'
import { Dialog } from 'vant';
import { List } from 'vant';
import { Popup } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(Popup);
Vue.use(List);
Vue.use(Dialog);
Vue.use(Button);
export default {
    name:'facelist',
    props:{
        list:Array,
        paramData:Object,
    },
    data(){
        return {
            loading:false,
            finished:false,
            faceList:[],
            concatFaceList:[],
            total:0,   //返回的总页数
            index:0,   //记录请求的次数
            error:false,
            form:this.paramData,
            ashow:false,
            bshow:false,
            asrc:"",
            bsrc:"",
            deleteId:""
        }
    },
    created(){
        this.getList()
    },
    methods:{
        showPopUp01(innerItem){
            if(!this.ashow){
                this.ashow = !this.ashow;
                this.asrc = innerItem.faceUrl
            }
        },
        showPopUp02(innerItem){
            if(!this.bshow){
                this.bshow = !this.bshow;
                this.bsrc = innerItem.aibeeFaceUrl
            }

        },
        getList(){
            if(!this.form) return 
            getFaceList(this.form)
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
        deleteFace(){
            Dialog.confirm({
                message: '确认要删除人脸？'
            }).then(() => {
                deleteFace(this.deleteId).then(res=>{
                    if(res.data.code != 200){
                        return this.$toast.fail(res.data.error);
                    }
                    this.$toast.success('操作成功')
                })
            })
        },
        //是否显示重设人脸按钮
        showBtn(item){
            switch(item.orderStatus){
                case '3':
                     return true
                     break;
                case '4':
                     return true
                     break;
                case '5':
                     return true
                     break;
                case '6':
                     return true
                     break;
                case '7':
                     return true
                     break;
                case '8':
                     return true
                     break;
                default:
                     return false
            }
        },
        hasActive(e,id){
            let iconList = document.querySelectorAll('.icon');
            let warpperList =  document.querySelectorAll('.imgWrapper');
            if(e.target.style.color == 'green'){
                e.target.style.color =''
                e.target.parentElement.style.border = '3px solid #fff'
                this.deleteId = ''
                return 
            }else{
                for(let i =0;i<iconList.length;i++){
                    iconList[i].style.color = ''
                }
                for(let j = 0;j<warpperList.length;j++){
                    warpperList[j].style.border = '3px solid #fff'
                }
                e.target.style.color ='green'
                e.target.parentElement.style.border = '3px solid green'
                this.deleteId = id
            }
        }
    }
}
</script>


<style lang='scss' scoped>

.list{
    .header{
        display:flex;
        .title{
            width:3rem;
            color:#777;
        }
        .content{
            flex:1;
            padding-left:0.4rem;
        }
    }
    .status{
        text-align:center;
        width:4rem;
        line-height:1.2rem;
        position: absolute;
        top:0.3rem;
        right:-1.2rem;
        transform:rotate(45deg);
        color:#fff;
        span{
            display: block;
            width:100%;
            height:100%;
        }
        .Unpaid{
            background:#CBD0D7
        }
        .tobeconsumed{
            background:#00dee5
        }
        .consumption{
            background:#ffc500
        }
        .consumed {
            background:#0081ff
        }
        .returned-order{
            background:#ff9214
        }
    }
    .wrapper{
        overflow: hidden;
        margin-top:0.2rem;
        .imgWrapper{
            font-size:0;
            float:left;
            margin-top:0.2rem;
            border:3px solid #fff;
            img{
                width:3rem;
                margin-right:0.2rem;
            }
            i{
                position: relative;
                top:-0.55rem;
                right:0;
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