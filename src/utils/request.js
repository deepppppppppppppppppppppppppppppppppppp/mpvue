var Fly = require("flyio/dist/npm/wx")
import plugins from "./plugins.js";
var request = new Fly;

request.config.baseURL = 'https://apitk.huatu.com'

request.interceptors.request.use((config) => {
    // wx.showLoading({
    //     title: '加载中',
    // })
    config.headers["X-Tag"] = "flyio";
    var loginInfo = wx.getStorageSync('loginInfo')
    config.headers["token"] = loginInfo.token
    config.headers["openId"] = loginInfo.openid
    return config
})

// request.interceptors.response.use(
//     (response, promise) => {
//         // wx.hideLoading();
//         return promise.resolve(response.data)
//     },
//     (err, promise) => {
//         wx.hideLoading();
//         wx.showToast({
//             title: err.message,
//             icon: 'none'
//         })
//         return promise.resolve()
//     }
// )

request.interceptors.response.use(
    function(response, promise) {
        return promise.resolve(response.data)
    },
    function(err, promise) {
        if (err.status === 401) {
            this.lock(); //锁定响应拦截器，
            return plugins.updateToken().then(res => {
                    console.log("401时重新刷新token,然后重新请求啊");
                    wx.setStorageSync("loginInfo", res.data);
                    Object.assign(err.request.header, { token: res.data.token, openId: res.data.openid });
                }).finally(() => this.unlock()) //解锁
                .then(() => {
                    return Fly.request(err.request);
                })
        } else {
            return promise.resolve(err.response.data)
        }
    }
)

export default request
