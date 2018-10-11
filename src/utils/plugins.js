import api from '../utils/api';

const plugins = {
    /**
     * @file 获取小程序二维码
     * 
     * @param {Object} 二维码配置项 详：https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html
     */
    wxGenerateQrcode(param) {
        const ACCESS_TOKEN = wx.getStorageSync('wxAccessToken').access_token || ''

        return new Promise((resolve, reject) => {
            wx.request({
                url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${ACCESS_TOKEN}`,
                data: param,
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                responseType: 'arraybuffer',
                success: function(res) {
                    resolve(`data:image/png;base64,${wx.arrayBufferToBase64(res.data)}`)
                },
                fail: function(err) {
                    wx.showToast({
                        title: 'access_token GG',
                        icon: 'none',
                        duration: 3000,
                        mask: true
                    });
                }
            })
        })
    },

    //获取openid和token
    updateToken() {
        var that = this;
        console.log("请求openid")
        return new Promise((resolve, reject) => {
            wx.login({
                success: res => {
                    let body = { code: res.code };
                    wx.request({
                        url: "http://testapi.huatu.com/lumenapi/v4/wechat/mini_app/shop_user",
                        data: body,
                        method: 'get',
                        success: function(renspose) {
                            if (renspose.statusCode == 200) {
                                wx.setStorageSync("loginInfo", renspose.data.data);
                            }
                            return resolve(renspose.data)
                        }
                    })
                }
            });
        })
    },
    checkLogin() {
        return new Promise((resolve, reject) => {
            var openId = wx.getStorageSync('loginInfo').openid
            wx.request({
                url: "http://testapi.huatu.com/lumenapi/v4/wechat/mini_app/check_login",
                data: {
                    openId: openId
                },
                method: 'get',
                success: function(renspose) {
                    if (renspose.statusCode == 200) {
                        wx.setStorageSync("needLogin", renspose.data.data.needLogin);
                    }
                    return resolve(renspose.data)
                }
            })
        })
    },
    /**
     * @file 微信分享朋友，meiyouquan  例：<button  open-type="share" >xxx</button>
     * 
     * @param {Object} ele 触发分享源信息 
     * @param {Object} options 
     * @property {String} options.title 标题
     * @property {String} options.imageUrl 图片
     * @property {String} options.desc 描述
     * @property {String} options.callback 分享回调路由
     * @property {Object} options.scene 回调路由拼接参数
     * @returns {Object}
     */
    wxShareAppMessage(ele = '', { title = '', imageUrl = '', desc = '', callback = '', scene = {} }) {
        console.log('plugins.wxShareAppMessage：', ele);
        let paramsArr = []
        if (JSON.stringify(scene) != '{}') {
            Object.keys(scene).forEach(item => paramsArr.push(item + '=' + scene[item]))
            callback.search(/\?/) === -1 ? callback += '?' + paramsArr.join('&') : callback += '&' + paramsArr.join('&')
        }

        return {
            title: title,
            imageUrl: imageUrl,
            desc: desc,
            path: callback,
            success(res) {
                consle.log('wxShareAppMessage.success：', res);
            },
            fail(err) {
                consle.log('wxShareAppMessage.error：', err);
            }
        }
    }

}

export default plugins;