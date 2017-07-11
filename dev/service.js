/**
 * 路由配置
 */

// 首页
avalon.state("home", {
    url: "/",
    views: {
        "@hd": {
            template: function() {
                return require("text!./modules/commons/header.html")
            }
        },
        "@ft": {
            template: function() {
                return require("text!./modules/commons/footer.html")
            }
        },
        "@container": {
            //配置模块模板和控制器
            templateProvider: function() {
                return new Promise(function(rs) {
                    require.ensure([], function() {
                        rs(require("text!./modules/home/home.html"))
                    })
                })
            },
            controllerProvider: function() {
                return new Promise(function(rs) {
                    require.ensure([], function() {
                        rs(require("./modules/home/home.js"))
                    })
                })
            }
        }
    }
})

// 错误页面404
avalon.state("error", {
    url: "/error",
    views: {
        "@hd": {
            template: function() {
                return require("text!./modules/commons/header.html")
            }
        },
        "@ft": {
            template: function() {
                return require("text!./modules/commons/footer.html")
            }
        },
        "@container": {
            //配置模块模板和控制器
            templateProvider: function() {
                return new Promise(function(rs) {
                    require.ensure([], function(tt) {
                        rs(require("text!./modules/error/404.html"))
                    })
                })
            },
            controllerProvider: function() {
                return new Promise(function(rs) {
                    require.ensure([], function() {
                        rs(require("./modules/error/404.js"))
                    })
                })
            }
        }
    }
})


/**
 * 路由全局配置
 */
avalon.state.config({
    onBeforeUnload: function(fromState, toState) {
        // 页面跳转时候现实进度条
        if (fromState) {
            if (avalon.vmodels.$progress.success) {
                avalon.vmodels.$progress.reset()
            } else {
                avalon.vmodels.$progress.start()
            }
        }
    },
    onAbort: function(fromState, toState) {
    },
    onUnload: function(fromState, toState) {
        
    },
    onBegin: function(fromState, toState) {
        
    },
    onLoad: function(fromState, toState) {
        // 设置导航条当前激活状态
        avalon.vmodels.app.active = toState.stateName
        // 页面跳转时候现实进度条
        if (fromState && toState) {
            avalon.vmodels.$progress.end('100')
        }
    },
    onError: function(object, state) {
    }
})

// 404错误页
avalon.router.error(function(p, r, a) {
    avalon.router.navigate("/error")
})

avalon.history.start({
    basepath: "/",
    fireAnchor: false
})
