<template>
    <div class="home">
        <div class="main">
            <div class="logoBox"></div>
            <div v-if="!isShow" class="titleYes">
                <h2 class="title">华图在线申请获取以下权限</h2>
                <p>获取你的公开信息（昵称、头像等）</p>
            </div>
            <div v-else class="titleNo">
                <h2>您选择“拒绝”授权您的公开信息，</h2>
                <h2>小程序无法正常使用，请见谅！</h2>
            </div>
            <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="sqLogin">{{isShow?"重新授权":"允许"}}</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import plugins from "../../utils/plugins";
    export default {
      onLoad(e) {
        let _this = this;
        let pages = getCurrentPages();
        _this.currentPage = pages[pages.length - 2];
        console.log("授权页的上一个页面route：", _this.currentPage.route);
      },
      components: {},
      data() {
        return {
          isShow: false,
          currentPage: {}
        };
      },
      computed: {},
      methods: {
        bindGetUserInfo(e) {
          let that = this;
          if (e.mp.detail.userInfo) {
            //同意授权
            // var obj = e.mp.detail.userInfo

            // wx.setStorage({ key: 'userInfo', data: obj })
            wx.getUserInfo({
              withCredentials: true,
              success(userInfo) {
                console.log(userInfo);
                wx.setStorageSync("wxInfo", userInfo);
                plugins
                  .updateToken()
                  .then(res => {
                    return that.$myHttp.post(
                      "/lumenapi/v4/wechat/mini_app/save_user",
                      {
                        encryptedData: userInfo.encryptedData,
                        iv: userInfo.iv,
                        openId: res.data.openid,
                        rawData: userInfo.rawData,
                        signature: userInfo.signature
                      }
                    );
                  })
                  .then(res1 => {
                    wx.setStorageSync("unionId", res1.data.unionId);
                    console.log(`/${that.currentPage.route}`);
                    wx.navigateBack({ url: that.currentPage.route }); // 回退
                  });
              }
            });
          } else {
            //拒绝授权
            this.isShow = true;
          }
        }
      }
    };
</script>
<style lang="less" scoped>
    .home {
      position: relative;
      width: 100%;
      height: 100%;
      background: #ffffff;
      .main {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        .logoBox {
          height: 200rpx;
          width: 200rpx;
          margin: 220rpx auto 80rpx;
          //   background-color: rgba(243, 243, 243, 1);
          border-radius: 50%;
          background: rgba(243, 243, 243, 1)
            url("http://p.htwx.net/wxPdd/htlogo.png") no-repeat center;
        }
        .titleYes {
          width: 450rpx;
          padding: 0rpx 3rpx;
          margin: 0 auto;
          text-align: center;
          .title {
            font-size: 36rpx;
          }
          p {
            display: inline-block;
            height: 34rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Regular;
            color: rgba(136, 136, 136, 1);
            line-height: 34rpx;
          }
        }

        .titleNo {
          width: 600rpx;
          padding: 0rpx 2rpx;
          margin: 0 auto;
          text-align: center;
        }
        .h2 {
          font-size: 36px;
          font-family: PingFangSC-Regular;
          color: rgba(6, 6, 6, 1);
        }
        .sqLogin {
          color: #ffffff;
          margin: 64rpx 30rpx 0 30rpx;
          width: calc(~"100% - 60rpx");
          height: 88rpx;
          text-align: center;
          border-radius: 16rpx;
          background: rgba(255, 63, 71, 1);
        }
      }
    }
</style>