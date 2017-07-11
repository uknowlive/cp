/**
 * @description:    扩展文件
 * @creattime:      2016-07-19
 * @author:         jelly
 */
define([], function() {


	var callbacks = function (opts) {
		return {
	        onShow: function() {
	        	avalon.vmodels.app.stay++
	        	opts.onShow && opts.onShow()
	        },
	        onShown: function() {
	        	opts.onShown && opts.onShown()
	        },
	        onClose: function() {
	        	opts.onClose && opts.onClose()
	        },
	        onClick: function() {
	        	opts.onClick && opts.onClick()
	        },
	        onClosed: function() {
	        	avalon.vmodels.app.stay--
	        	opts.onClosed && opts.onClosed()
	        }
	    }
	}

    // 扩展 notify 常用方法
    $.notify.success = function(opts) {
    	
        $.notify({
            element: '#j_notice',
            icon: 'icon iconfont icon-success',
            title: opts.title,
            message: opts.message,
            url: opts.url
        }, avalon.mix({type: "success"}, callbacks(opts)))
    }

    $.notify.info = function(opts) {
    	var template = '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<h6 style="margin:-5px 0 8px;font-weight:500;font-size:14px" data-notify="title">{1}</h6>' +
        '<p data-notify="message">{2}</p>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
        $.notify({
            element: '#j_notice',
            icon: 'icon iconfont icon-info',
            title: opts.title,
            message: opts.message,
            url: opts.url
        }, avalon.mix({type: "info", template: template}, callbacks(opts)))
    }

    $.notify.warning = function(opts) {
        $.notify({
            element: '#j_notice',
            icon: 'icon iconfont icon-warning',
            title: opts.title,
            message: opts.message,
            url: opts.url
        }, avalon.mix({type: "warning"}, callbacks(opts)))
    }

    $.notify.error = function(opts) {
        $.notify({
            element: '#j_notice',
            icon: 'icon iconfont icon-error',
            title: opts.title,
            message: opts.message,
            url: opts.url
        }, avalon.mix({type: "danger"}, callbacks(opts)))
    }


})
