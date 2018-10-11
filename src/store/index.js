import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import activityStore from '@/pages/jobList/store'
import classCenterStore from '@/pages/test1/store'


Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
    // 做模块化处理,每个功能一个store.js文件,然后统一在这边引入
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    state: {},
    mutations: {},
    actions: {},
    modules: {
        classCenterStore,
        activityStore,

    },
})


export default store