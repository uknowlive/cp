/**
 * @description:    入口文件
 * @creattime:      2017-06-20
 * @author:         jelly.lam
 */

// 加载全局样式
require('./vendor/bootstrap/css/bootstrap.css')
require('./vendor/bootstrap/css/bootstrap-theme.css')
require('./resouces/font/iconfont.css')
require('./resouces/css/animate.min.css')
require('./resouces/css/commons.less')
require('./resouces/css/404.less')
require('./resouces/css/home.less')


// bootstrap 插件脚本
require('bootstrap')
require('notify')

// oniui 插件
require("mmPromise")
require("mmHistory")
require("mmRouter")
require("mmState")
require("store")
require("progressbar")
require("lazyload")


// 扩展文件
require("./extend")
// 配置文件
require("./config")
// 路由配置文件
require("./service")

// API配置文件
var api = require("./api")

// 定义一个顶层的vmodel，用来放置全局共享数据
var vmodel = avalon.define({
    $id: "app",
    active: '',
    // 全局读秒
    countdown: 1,
    // 是否登录
    isLogin: false,
    // 用户信息
    uBean: {},
    $progressOpts: {
        simulate: 100,
        value: 0,
        indeterminate: true,
        onComplete: function() {
    		var that = this
    		setTimeout(function() {
    			that.toggle = false
    		}, 50)
        }
    },
    // 验证码路径
    codelink: setCodeLink(),
    // 验证码请求状态
    codeloaded: false,
    // 显示验证码
    showcode: false,
    // 登录提交数据
    loginPost: {
    	username: '',
		password: '',
		checkcode: ''
    },
    // 系统公告
    sysNoticeList: [],
    // 移动版折叠操作面板
    pannelToggle: false,
    // 子菜单面板
    showDropDown: false,
    ajaxLoading: false,
    // 停留在页面中的提示窗口数量
    stay: 0,
    // 刷新验证码
    refreshCode: function() {
    	if (vmodel.codeloaded) {
    		vmodel.codeloaded = false
    		vmodel.codelink = setCodeLink()
    	}
    },
    // 加载验证码
    loadcode: function(e) {
    	vmodel.codeloaded = true
    },
    // 验证码输入框事件
    focus: function(e) {
    	vmodel.showcode = true
    },
    click: function(e) {
    	e.stopPropagation()
    	$('#vcode').focus()
    },
    clickBodyHandler: function(e) {
    	vmodel.showcode = false
    },
    // 退出
    logout: function() {
        $.ajax({
            type: 'get',
            url: api.user.logout,
            success: function(res) {
                avalon.log(res)
            }
        })
    },
    // 用户登录
    login: function(e) {
        var opts
        var form = e.target
        var result = validetor(form)
    	e.preventDefault()
        if (result)
            return $.notify.warning(result)
        vmodel.ajaxLoading = true
    	$.ajax({
    		url: api.user.login,
    		data: vmodel.loginPost.$model,
    		success: function(res) {
                var defaults = {
                    message: res.message
                }
                switch (res.error) {
                    // 登录成功
                    case 0:
                        $.notify.success(avalon.mix(defaults, {
                            onClose: function() {
                                vmodel.isLogin = true
                                vmodel.uBean = res.uBean
                                avalon.store.set('uBean', res.uBean)
                            }
                        }))
                        break
                    default:
                        switch (res.code) {
                            // 验证码错误
                            case '2-1005':
                                avalon.mix(defaults, {
                                    onClose: function() {
                                        removeClass($('input.verificationcode', form).focus().addClass('danger'), 1000)
                                    }
                                })
                                break
                            // 密码或用户名错误
                            case '2-1074':
                                avalon.mix(defaults, {
                                    onClose: function() {
                                        removeClass($('input.username', form).focus().addClass('danger'), 1000)
                                        removeClass($('input.password', form).addClass('danger'), 1000)
                                    }
                                })
                                break
                        }
                        $.notify.error(defaults)
                        
                }
    		},
            complete: function() {
                vmodel.ajaxLoading = false
            }
    	})
    },
    toggleHandler: function() {
        vmodel.pannelToggle = !vmodel.pannelToggle
    },
    mouseenter: function(e) {
        vmodel.showDropDown = true
    },
    mousemoveHandler: function(e) {
        vmodel.showDropDown = false
    },
    mousemove: function(e) {
        e.stopPropagation()
    },
    $skipArray: ["$progressOpts", "refreshCode", "loadcode", "focus", "clickBodyHandler", "click", "login", "logout"]
})


vmodel.$watch('isLogin', function(a, b) {

})

vmodel.$watch('countdown', function(a, b) {
    // 每10秒检测一次登录状态
    if (a % 10 === 0) {
        vmodel.isLogin && checkLoginState()
    }
})

vmodel.$watch('showDropDown', function(a, b) {
    $('#submenu').stop(true)[a ? 'slideDown' : 'slideUp'](300)
})

// 变更验证码
function setCodeLink() {
	return '/LoginCode?' + (+new Date())
}

// 轮巡检测用户登录状态
function checkLoginState() {
    $.ajax({
        url: '/API/GetGlobal',
        data: {SysMsgId: 0},
        success: function(res) {
            switch (res.code) {
                // 已登录
                case "0-1":
                    vmodel.isLogin = true
                    vmodel.uBean = res.data.uBean
                    avalon.store.set('uBean', res.data.uBean)
                    break
                // 其它登录状态
                default:
                    vmodel.uBean = {}
                    vmodel.isLogin = false
                    avalon.store.remove('uBean')
            }
        }
    })
}

// 获取系统公告
function getSysNotice() {
    $.ajax({
        url: '/API/GetSysNotice',
        success: function(res) {

        }
    })
}

// getSysNotice()

// 登录表单验证
function validetor(form) {
    if (vmodel.loginPost.username.length < 1 && !/\s/g.test(vmodel.loginPost.username)) {
        return {
            message: '用户名不能为空!',
            onClose: function() {
                removeClass($('input.username', form).focus().addClass('danger'), 1000)
            }
        }
    }
    if (vmodel.loginPost.password.length < 1 && !/\s/g.test(vmodel.loginPost.password)) {
        return {
            message: '密码不能为空!',
            onClose: function() {
                removeClass($('input.password', form).focus().addClass('danger'), 1000)
            }
        }
    }
    if (vmodel.loginPost.checkcode.length < 1 && !/\s/g.test(vmodel.loginPost.checkcode)) {
        return {
            message: '验证码不能为空!',
            onClose: function() {
                removeClass($('input.verificationcode', form).focus().addClass('danger'), 1000)
            }
        }
    }
    return false
}

function removeClass($el, time) {
    setTimeout(function() {
        $el.removeClass('danger')
    }, time)
}

setInterval(function() {
    vmodel.countdown = vmodel.countdown < 60 ? vmodel.countdown += 1 : 1
}, 1000)


  

avalon.scan()



// 进入视图后默认做一次登录检测
checkLoginState()

