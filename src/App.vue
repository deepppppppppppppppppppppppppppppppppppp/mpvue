<script>
    // Use Vuex
    const mtjwxsdk = require("./utils/sdk/mtj-wx-sdk.js");
    export default {
      onLaunch() {
        wx.getUserInfo({
          withCredentials: true,
          success(res) {
            console.log("你已经授权过了");
            wx.setStorage({ key: "wxInfo", data: res }); //后面授权同意后，这块数据需要上报
          },
          fail: function() {
            wx.navigateTo({
              // 没有授权过的用户，跳转到自己写的授权提示页面
              url: "/pages/login/shouquan"
            });
          }
        });
      }
    };
</script>
