<template>
  <div class="tips" v-show="visible">
    <div id="tips-wrapper">
      <div class="tips-container" :class="{fixHigh:setH}">
        <div class="close" @click="visible=false">
          <i class=" font_family icon-guanbix"></i>
        </div>
        <h6 class="title">{{title}}</h6>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      setH: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      }
    }
  }
</script>
<style lang='less' scoped>
  #tips-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    .tips-container {
      background: #fff;
      width: 560rpx;
      // height: 408rpx;
      border-radius: 16rpx;
      position: relative;
      box-sizing: border-box;
      padding: 24rpx 30rpx;
      &.fixHigh {
        height: 698rpx;
      }
      .close {
        color: #a0a1a7;
        position: absolute;
        top: -30rpx;
        right: -30rpx;
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #a0a1a7;
        border-radius: 50%;
        .icon-guanbix {
          font-size: 30rpx;
          color: #fff;
        }
      }
      .title {
        text-align: center;
        font-size: 28rpx;
        color: #060606;
        line-height: 40rpx;
      }
    }
  }
</style>
