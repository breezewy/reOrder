<template>
    <div class="face">
        <face-search  @change="handleChange"></face-search>
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
            if(value){
                this.showFaceList = true
                this.faceForm = value
            }
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