<template>
    <div class="search">
        <div class="search-area">
            <select  class="select" v-model="value" @change="changeValue">
                <option :value ="0">手机号</option>
                <option :value ="1">姓名</option>
                <option :value="2">证件号</option>
                <option :value="3">订单号</option>
            </select>
            <van-search
                placeholder="请输入手机号搜索" 
                show-action
                shape="round"
                @search="onSearch"
                @clear="handleClear"
                @input="handleInput"
                v-if="value == 0" 
                v-model="faceForm.mobile"
                >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <van-search
                placeholder="请输入姓名搜索" 
                show-action
                shape="round"
                @search="onSearch"
                @clear="handleClear"
                @input="handleInput"
                v-if="value == 1" 
                v-model="faceForm.name"
                >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <van-search
                placeholder="请输入证件号搜索" 
                show-action
                shape="round"
                @search="onSearch"
                @clear="handleClear"
                @input="handleInput"
                v-if="value == 2" 
                v-model="faceForm.idCard"
                >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <van-search
                placeholder="请输入订单号搜索" 
                show-action
                shape="round"
                @search="onSearch"
                @clear="handleClear"
                @input="handleInput"
                v-if="value == 3" 
                v-model="faceForm.orderNo"
                >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
    </div>

</template>

<script>
import Vue from 'vue';
import { Search } from 'vant';
import FaceList from './FaceList'


Vue.use(Search);
export default {
    name:"FaceSearch",
    components:{
        FaceList
    },
    data(){
        return {
            value:0,
            faceForm:{
                mobile:"",
                name:"",
                idCard:"",
                orderNo:"",
                page:{
                    pageNum:0,
                    pageSize:4
                }
            },
            faceList:[],
            hideFaceList:true

        }
    },
     methods:{
        handleClear(){
            this.faceForm={
                mobile:"",
                name:"",
                idCard:"",
                orderNo:"",
                page:{
                    pageNum:0,
                    pageSize:4
                }
            },
            this.$emit('hideList',this.hideFaceList)
        },
        onSearch(){
            switch(this.value){
                case 0:
                        if(this.checkPhone(this.faceForm.mobile)){
                            this.deleteProperty(this.faceForm)
                            this.$emit('change',this.faceForm)
                        }
                        break;
                case 1:
                        if(this.faceForm.name == ''){
                            this.$toast('请输入姓名进行搜索');
                            return 
                        }
                        this.deleteProperty(this.faceForm)
                        this.$emit('change',this.faceForm)
                        break;
                case 2:
                        if(this.checkIdCard(this.faceForm.idCard)){
                            this.deleteProperty(this.faceForm)
                            this.$emit('change',this.faceForm)
                        }
                        break;
                case 3:
                        if(this.faceForm.orderNo == ''){
                            this.$toast('请输入订单号进行搜索');
                            return 
                        }
                        this.deleteProperty(this.faceForm)
                        this.$emit('change',this.faceForm)
                        break;
                
            }
        },
        changeValue(){
            this.$emit('hideList',this.hideFaceList)
            this.faceForm = {
                mobile:"",
                name:"",
                idCard:"",
                orderNo:"",
                page:{
                    pageNum:0,
                    pageSize:4
                }
            }
        },
        checkPhone(value){
            const reg = /^1[0-9]{10}$/;
            if(value== ""){
                this.$toast('请输入手机号进行搜索');
                return false
            }
            if(!reg.test(value)){
                this.$toast('手机号格式错误');
                return false
            }
            return true
        },
        checkIdCard(idcard){
            const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(idcard == ""){
                this.$toast('请输入证件号进行搜索');
                return false
            }
            if (!regIdCard.test(idcard)) {
                this.$toast('身份证格式错误');
                return false;
            } else {
                return true;
            }
        },
        deleteProperty(form){
            if(form.mobile == '')
                delete form.mobile
            if(form.name == '')
                delete form.name
            if(form.idCard == '')
                delete form.idCard
            if(form.orderNo == '')
                delete form.orderNo
        },
        handleInput(value){
            this.$emit('hideList',this.hideFaceList)  
        }
    }
}
</script>


<style lang="scss" scoped>
    .search{
        box-sizing: border-box;
        padding: 1rem 0.4rem;
        background:#eee;
        .search-area{
            display: flex;
            .select{
                width:3rem;
                padding-left: 0.1rem;
            }
            .van-search{
                flex:1;
            }
        }
    }
</style>