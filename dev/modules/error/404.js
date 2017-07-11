/**
 * @description:    404错误页面
 * @creattime:      2017-06-21
 * @author:         jelly.lam
 */

define([], function() {

    var vmodel = avalon.define({
        $id: "error"
    })

    return avalon.controller(function($ctrl) {
        $ctrl.$onEnter = function(param, rs, rj) {
            
        }
        $ctrl.$onRendered = function() {
            
        }
        $ctrl.$onBeforeUnload = function() {
            
        }
        $ctrl.$vmodels = [vmodel]
    })

    
})
