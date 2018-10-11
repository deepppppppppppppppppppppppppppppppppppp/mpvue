import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import request from './utils/request'
import './styles/weui.css'
import './styles/common.css'
import "./styles/iconfont/iconfont.css" /* 例：<div class="font_family icon-xxxxx" ></div> */
import api from '@/utils/api'

Vue.config.productionTip = false
Vue.prototype.$myHttp = request
Vue.prototype.$putForm = api.putForm
// 挂载一个全局的图片路径,方便后期修改图片地址的时候,做统一修改
Vue.prototype.$imagePath = '../../static'
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        pages: [],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: "#4A4A4A",
            backgroundColor: "#ffffff",
            borderStyle: "black",
            list: [{
                    selectedIconPath: "static/icon/tiku1.png",
                    iconPath: "static/icon/aaa81.png",
                    pagePath: "pages/jobList/index",
                    text: "职位库"
                },
                {
                    selectedIconPath: "static/icon/huodong1.png",
                    iconPath: "static/icon/huodong.png",
                    pagePath: "pages/my/index",
                    text: "我的"
                },
                {
                    selectedIconPath: "static/icon/news-active.png",
                    iconPath: "static/icon/news.png",
                    pagePath: "pages/test1/index",
                    text: "临时测试"
                }
            ]
        },
        usingComponents: {}
    }
}