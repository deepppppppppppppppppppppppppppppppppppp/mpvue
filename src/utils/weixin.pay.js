import api from '../utils/api'
export default {
    /**
     * 调起支付 兼容掌柜云支付
     * @param {any} [params.appId]
     * @param {any} [params.timestamp]
     * @param {any} [params.nonceStr]
     * @param {any} [params.package]
     * @param {any} [params.signType]
     * @param {any} [params.paySign]
     */
    getBrandWCPayRequest (param, key) {  // 新的调取微信支付的方式传参 key是不同入口调起的 key ==1 订单去支付
      let self = this
      var params = param.par
        wx.requestPayment({
          timeStamp: params.timeStamp,
          nonceStr: params.nonceStr,
          package: params.package,
          signType: params.signType,
          paySign: params.paySign,
          success: _res => {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
        },
         fail: _res => {
           var loginame = wx.getStorageSync('loginParm')
           var par = {
             userName: loginame,
             orderId: param.orderId
           }
           if (_res = "requestPayment:fail cancel") {
             par.type = 1
           } else {
             par.type = 2
           }
           var res = api.payFail(par)
           wx.navigateBack()
        },
        complete: _res=> {
        }
      })
    }
}
