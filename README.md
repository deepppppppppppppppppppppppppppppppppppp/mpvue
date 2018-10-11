# shui

>mpvue脚手架-支持热更新、vuex、小程序分包、封装了新版授权流程、flyio

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

如何获取小程序在 app onLaunch/onShow 时候传递的 options
在所有的组件内可以通过 this.$root.$mp.appOptions 进行获取。
