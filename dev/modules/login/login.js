/**
 * @description:    登录模块
 * @creattime:      2017-06-21
 * @author:         jelly.lam
 */

define([], function() {

    var vmodel = avalon.define({
        $id: "login"
    })

    
    return avalon.controller(function($ctrl) {
        // 进入视图
        $ctrl.$onEnter = function(param, rs, rj) {
            
        }
        // avalon.scan后
        $ctrl.$onRendered = function() {
        }
        // 视图销毁前
        $ctrl.$onBeforeUnload = function() {
           
        }
        $ctrl.$vmodels = [vmodel]
    })
})
