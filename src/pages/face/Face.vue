<template>
    <div class="face" v-wechat-title="$route.meta.title">
        <face-search  @change="handleChange" @hideList="handleHide"></face-search>
        <face-list :paramData="faceForm"  v-if="showFaceList"></face-list>
    </div>

</template>

<script>
import FaceList from './components/FaceList'
import FaceSearch from './components/FaceSearch'

export default {
    name:'Face',
    data(){
        return{
            faceForm:{},
            showFaceList:false
        }
    },
    components:{
        FaceList,
        FaceSearch
    },
    methods:{
        handleChange(value){
            this.showFaceList = true
            this.faceForm = value
        },
        handleHide(value){
            this.showFaceList = !value
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .face {
        background:#eee;
        height:100vh;
    }
</style>