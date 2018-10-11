<!-- 功能按钮 slot -->
<template>
    <div class="packet_box">
        <div id="packet-wrapper">
            <div class="wrap-main">
                <!-- 红包模态框 -->
                <div id="red-packet-wrapper" v-if="_module == 1">
                    <div class="red-slot">
                        <div class="red-packet-main" @click="open" :style="{backgroundImage: 'url(' + redPacketData.img + ')'}"></div>
                    </div>
                </div>
            </div>
            <!-- 关闭 icon -->
            <i class="off-icon font_family icon-guanbix" @click="close"></i>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'redPacketModule',
      props: {
        // 显示隐藏
        visible: {
          type: Boolean,
          default: true
        },
        _module: {
          type: Number,
          default: 1
        },
        redPacketData: {
          type: Object,
          default: {}
        }
      },
      methods: {
        open() {
          var obj = {
            activityId: this.redPacketData.activityId,
            classId: this.redPacketData.classId,
            isLive: this.redPacketData.videoType
          }
          var url = `../activityInfo/components/activityDetail?classInfo=${JSON.stringify(
            obj
          )}`
          wx.navigateTo({ url })
          this.$emit('close')
        },
        close() {
          this.$emit('close')
        }
      }
    }
</script>
<style lang="less" scoped>
    #packet-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.75);
      width: 100%;
      height: 100%;
      z-index: 1000;
      .off-icon {
        // 关闭叉子
        display: block;
        width: 82rpx;
        height: 82rpx;
        margin: 0 auto;
        border-radius: 50%;
        border: 2px solid #fff;
        text-align: center;
        line-height: 82rpx;
        font-size: 40rpx;
        color: #fff;
      }
      .wrap-main {
        padding: 0 38rpx;
        margin: 220rpx auto 100rpx auto;
      }
      #red-packet-wrapper {
        // 红包模态框
        .red-slot {
          // 红包
          position: relative;
          .red-packet-main {
            width: 560rpx;
            height: 680rpx;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 0 auto;
          }
        }
      }
    }
</style>