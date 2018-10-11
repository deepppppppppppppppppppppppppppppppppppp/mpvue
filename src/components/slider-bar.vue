<template>
    <div class="container">
         <div class="infoAll" v-for="(item,index) in commitInfo" :key="index">
            <ul>
                <li @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :data-type="item.type" @click="resetAddress(index)">
                    <div class="slider-item">
                        <div class="information">
                            <p class="personal">{{item.name}}     {{item.phone}}</p>
                           
                            <div class="address"> <span v-if="item.isDefault" >默认</span> {{item.address}}</div>
                        </div>
                        
                    </div>
                    <div class="editor" @click="update">
                         编辑
                    </div>
                    <div class="delect" @click="delect(index)">
                        删除
                    </div>
                </li>  
            </ul>
        </div>
        <div class="add" @click="toAdd" :class="{isIpx:model}">
            新建收货地址
        </div>
        <div class="isIpxFill" v-if="model"></div>
          
    </div>
</template>

<script>
import api from "@/utils/api";

export default {
  name: "slider",
  data() {
    return {
      commitInfo: [],
      model: false //iphoneX适配
    };
  },
  created() {
    for (var i = 0, len = this.commitInfo.length; i < len; i++) {
      if (this.commitInfo[i].isDefault == 1) {
        this.commitInfo[i].isDefault = true;
      } else {
        this.commitInfo[i].isDefault = false;
      }
    }
  },
  methods: {
    resetAddress(index){
        var addressid=this.commitInfo[index].id
        console.log(this.commitInfo[index].id)
        wx.navigateTo({
          url: `../pay/index?addressid=${addressid}`,
        });
        
    },
    async getAddress() {
      var par = {
        catchOne: 0,
        userName: "htwx_7723947"
      };
      var res = await api.getAddress(par);
      this.commitInfo = res.data;
      for (var i = 0, len = this.commitInfo.length; i < len; i++) {
        this.$set(this.commitInfo[i], "type", 0);
      }
      console.log(this.commitInfo);
    },
    // 滑动开始
    touchStart(e) {
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      this.startX = e.mp.changedTouches[0].clientX;
    },
    // 滑动结束
    touchEnd(e, index) {
      // 获取移动距离
      this.endX = e.mp.changedTouches[0].clientX;
      if (this.startX - this.endX > 10) {
        for (let i = 0; i < this.commitInfo.length; i++) {
          this.commitInfo[i].type = 0;
        }
        this.commitInfo[index].type = 1;
      } else if (this.startX - this.endX < -10) {
        for (let i = 0; i < this.commitInfo.length; i++) {
          this.$set(this.commitInfo[i], "type", 0);
        }
      }
    },
    // 点击回复原状
    recover(index) {
      this.commitInfo[index].type = 0;
    },
    //删除地址
    delect(index) {
      this.commitInfo.splice(index, 1);
    },
    //添加地址
    toAdd() {
      wx.navigateTo({
        url: "../pay/address"
      });
    },
    //修改地址
    update() {
      wx.navigateTo({
        url: "../pay/updateAddress"
      });
    }
  },
  mounted() {
    this.getAddress();
    //适配iphoneX
    let that = this;
    // 获取用户机型
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search("iPhone X") != -1) {
          that.model = true;
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
.isIpxFill {
  width: 100%;
  height: 68rpx;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.infoAll {
  width: 100%;
  ul {
    width: 100%;
    overflow: hidden; // overflow-x: scroll;
    background: #ffffff;
    li {
      // overflow: hidden;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      width: 1100rpx;
      height: 180rpx; //   background-color: red;
      border-bottom: 1rpx solid #eeeeee; //   垂直居中，  // 子div水平排列
      display: flex; //   justify-content:center;
      box-sizing: border-box;
      padding-top: 20rpx;
      .slider-item {
        width: 632rpx;
        .information {
          font-size: 28rpx;
          padding-left: 30rpx;
          .personal {
            color: #000000;
            margin-bottom: 20rpx;
          }
          .address {
            color: #6d7172;
            span {
              display: inline-block;
              width: 80rpx;
              height: 40rpx;
              font-size: 28rpx;
              border: 1rpx solid red;
              text-align: center;
              line-height: 40rpx;
            }
          }
        }
      }
      .editor {
        width: 117rpx;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 28rpx;
        margin-top: 42rpx;
        border-left: 1rpx solid #f3f3f3;
      }
      .delect {
        background: red;
        width: 144rpx;
        line-height: 150rpx;
        text-align: center;
        color: #ffffff;
        font-size: 28rpx;
      }
    }
  }
}

li[data-type="0"] {
  transform: translate3d(0, 0, 0);
}

li[data-type="1"] {
  transform: translate3d(-144rpx, 0, 0);
}
.add {
  position: fixed;
  bottom: 0;
  &.isIpx {
    bottom: 68rpx !important;
  }
  left: 0;
  right: 0;
  height: 88rpx;

  line-height: 88rpx;
  text-align: center;
  background: #fe2c00;
  color: #ffffff;
  font-size: 32rpx;
}
</style>