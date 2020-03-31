<template>
     <div class="homeContainer" v-wechat-title="$route.meta.title">
    <div class="header" >
      <p class="header-title">{{dmqTicket.productName}}</p>
      <!-- <p class="header-title">宋城千古情</p> -->
      <div class="header-detail">
          <span class="detail-title">订单号：</span><span class="detail-content">{{dmqTicket.dmqOrderId}}</span>
      </div>
       <div class="header-detail">
          <span class="detail-title">手机号：</span><span class="detail-content">{{dmqTicket.mobile}}</span>
      </div>
       <div class="header-detail">
          <span class="detail-title">证件号：</span><span class="detail-content">{{dmqTicket.idCard}}</span>
      </div>
       <!-- <div class="status">
            <span class="status-noBook" v-if="dmqTicket.orderStatus == 0">未预约</span>
            <span class="status-back" v-if="dmqTicket.orderStatus == 3">已退单</span>
            <span class="status-booked" v-if="dmqTicket.orderStatus == 1">已预约</span>
       </div> -->
    </div>

    <div  v-if="ticketList &&ticketList.length>0 && dmqTicket.productType != 2">
      <div class="relate" v-for="(item,index) in ticketList" :key="index">
        <div class="city">{{item.city}}</div>
        <div class="item" v-for="(innerItem,index) in item.info" :key="index">
          <p class="item-name">{{innerItem.name}}</p>
          <div class="item-detail">
            <div class="left" :class="{'line': innerItem.number == 0}">
              <span class="detail-title" >可预约数量：</span ><span class="detail-content">{{innerItem.number}}</span>
            </div>
            <div class="right" v-if="innerItem.number>0">
                <span class="btn"  @click="handleBook(innerItem)">去预约</span>
            </div>
            <div class="right" v-else>
                <span class="unbtn">已预约</span>
            </div>
          </div>
        </div>
      </div>
    </div>
   

    <div class="moreChoose" v-if="dmqTicket.productType == 2">
      <div class="choose" @click="handleClick">
        <span class="number">剩余数量：{{number}}</span>
        <span class="tips" v-if="number > 0">请选择出游景区</span>
        <span class="tips" v-else style="color:red">暂时无法选择</span>
        <van-icon name="arrow-down" />
      </div>
      <van-popup 
          v-model="show"  
          position="bottom"
          :style="{ height: '40%' }"
      >
        <van-radio-group v-model="radio">
          <div class="title">请选择</div>
          <van-cell-group>
            <van-cell :title='item.info.name' :value="item.city" clickable @click="clickCell(item.info)"  v-for="(item,index) of moreChooseList" :key="index">
              <van-radio slot="right-icon" :name="item.info.id"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
    </div>

    <Tabbar />
  </div>
  
</template>

<script>
import { getReOrder, getTicket,getSurplusNumber } from "../../utils/api";
import Tabbar from "../../components/Tabbar";
import Vue from 'vue';
import { Popup } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Icon } from 'vant';

Vue.use(Collapse).use(CollapseItem);
Vue.use(Icon);
Vue.use(Cell).use(CellGroup);
Vue.use(Popup);



export default {
  name: "home",
  data() {
    return {
      id: "",
      ticketList:[],
      ticketData:null,
      moreChooseList:[],
      moreChooseData:null,
      dmqTicket:{},
      show:false,
      radio:"",
      value:"",
      number:"",
      type:0,
      status:0
    };
  },
  components: {
    Tabbar
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let pageUrl = window.location.href;
      let index = pageUrl.lastIndexOf("/");
      let orderID = pageUrl.slice(index + 1);
      sessionStorage.setItem("id", orderID);
      this.isLoading = true;
      getReOrder({ orderNo: orderID }).then(res => {
        if (res.data.code != 200) {
          this.$toast.fail(res.data.error);
          return;
        }
        
        this.dmqTicket = res.data.data
        this.type = this.dmqTicket.productType
        this.id = res.data.data.id;
        this.status = res.data.data.orderStatus;
        sessionStorage.setItem("orderId", this.id);
        // if(this.status == 3){
        //    return 
        // }
        if(this.type == 2){
            getSurplusNumber(this.id).then(res=>{
                if (res.data.code != 200) {
                  return this.$toast.fail(res.data.error);
                }
                this.number = res.data.data
            })
        }
        
        getTicket(this.id).then(res => {
          if (res.data.code != 200) {
            return this.$toast.fail(res.data.error);
          }
          if(this.type != 2){
            this.ticketData = res.data.data;
            for(let key in this.ticketData){
                let obj = {
                  city:key,
                  info:this.ticketData[key]
                }
                this.ticketList.push (obj)
            }
          }else{
            this.moreChooseData = res.data.data;
            for(let key in this.moreChooseData){
               for(let i = 0;i< this.moreChooseData[key].length;i++ ){
                  let obj = {
                  city:key,
                  info:this.moreChooseData[key][i]
                }
                this.moreChooseList.push (obj)
               }
            }
          }
        
        });
      });
    },
    handleBook(item) {
      if(item.number == 0){
        return this.$toast('可预约数量为0');
      }
      console.log(item)
      sessionStorage.setItem('type',this.type);
      sessionStorage.setItem("item", JSON.stringify(item));
      this.$router.push({
        name: "booking"
      });
    },
    handleClick(){
      if(this.number == 0){
         return
      }
      this.show = true
      this.radio = this.moreChooseList[0].id
    },
    clickCell(item){
      this.radio = item.id
      this.show = false
      this.value = item.name
      sessionStorage.setItem('type',this.type);
      sessionStorage.setItem("moreChooseItem", JSON.stringify(item));
      this.$router.push('/booking')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.homeContainer {
  box-sizing: border-box;
  padding: 0rem 0.5rem 3rem;
  .header{
    position: relative;
    background:#fff;
    padding: 0.4rem;
    border-radius: 0.2rem;
    margin-bottom: 1rem;
    .header-title{
      line-height: 1rem;
    }
    .header-detail{
      margin-top:0.5rem;
      display: flex;
      .detail-title{
        display: inline-block;
        color: #9c9c9c;
        width:3rem;
      }
      .detail-content{
        flex:1;
      }
    }
    // .status{
    //   color:#fff;
    //   position: absolute;
    //   right:0.5rem;
    //   bottom:0.4rem;
    //   span{
    //     display: block;
    //     border-radius:50%;
    //     width:3rem;
    //     height:3rem;
    //     line-height: 3rem;
    //     text-align:center;
    //   }
    //   .status-back{
    //     background:rgba(57,74,91,0.6)
    //   }
    //   .status-booked{
    //     background: linear-gradient(to right, #fdc830, #f37335);
    //   }
    // }
  
  }
  .relate{
    background:#fff;
    padding: 0.2rem 0.4rem 0.4rem;
    margin-bottom:0.5rem;
    border-radius: 0.2rem;
    .city{
      line-height: 1.2rem;
    }
    .item{
      background:#eee;
      padding:0.3rem  0.3rem 0.2rem;
      margin-top:0.3rem;
      .item-name{
        line-height: 1rem;
      }
      .item-detail{
        line-height: 1.5rem;
        display: flex;
        .left{
          flex:1;
          height:1.5rem;
          line-height: 1.5rem;
          
          .detail-title{
            color:#9c9c9c;
          }
        }
        .line{
          text-decoration-line:line-through;
        }
        .right{
          flex:1;
          text-align:right;
          height:1.5rem;
          line-height: 1.5rem;
          .btn{
            color:#fff;
            padding:0.2rem 1.2rem;
            background: linear-gradient(to right, #fdc830, #f37335);
            border-radius:0.7rem;
          }
          .unbtn{
            color:#fff;
            padding:0.2rem 1.2rem;
            background: linear-gradient(to right, #bdc3c7, #2c3e50);
            border-radius:0.7rem;
          }
        }
      }
    }
  }
  .moreChoose{
    background:#fff;
    padding: 0.5rem 0.4rem;
    border-radius: 0.2rem;
    .choose{
      display: flex;
      padding: 0.5rem 0;
      .number{
        flex: 0.7;
      }
      span{
        flex:1;
      }
    }
    .title{
      line-height: 1.5rem;
    }
    .van-cell{
      padding:0;
      .van-cell__title{
        flex:0.3;
      }
    }
    .van-popup{
      padding-top:0.2rem;
      .van-cell__title{
        flex:1;
        padding:0.2rem 0.4rem;
      }
      .van-cell__value{
        flex:0.2;
        padding:0.2rem 0.4rem;
        text-align:center;
        span{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .title{
        line-height: 1.2rem;
        padding:0.3rem;
        text-align:center;
      }
      .van-radio{
        margin:0 0.2rem;
      }
    }
  }

}
</style>
