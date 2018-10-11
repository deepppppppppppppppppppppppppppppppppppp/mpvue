module.exports = [{
        path: "pages/jobList/index",
        config: {
            navigationBarTitleText: '公考搜职位',
            navigationBarTextStyle: 'black',
            navigationBarBackgroundColor: '#fff',
        }
    },
    {
        path: "pages/my/index",
        config: {
            navigationBarTitleText: '个人中心',
            navigationBarTextStyle: 'black',
            navigationBarBackgroundColor: '#fff',
        }
    },
    {
        path: "pages/test1/index"
    },
    { ///分包
        path: 'packageA/logs',
        subPackage: true,
        config: { // 页面配置，即 page.json 的内容
            navigationBarTitleText: '查看启动日志'
        }
    }
]