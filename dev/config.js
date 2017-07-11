/**
 * @description:    系统全局配置
 * @creattime:      2016-07-19
 * @author:         jelly
 */
define(["md5"], function(md5) {

    // avalon 全局设置
    avalon.config({
        debug: false,
        loader: false
    })

    // 全局 ajax 配置
    // 全局激活 xhr 对象
    var activeXHR = {}

    $.ajaxSetup({
        type: "POST",
        dataType: "json",
        timeoutNumber: 20000,
        cache: false,
        dataFilter: function(data, type) {
            switch (type) {
                // 对json数据进行处理
                case 'json':
                    // avalon.log(JSON.parse(data))
                    break
            }
            return data
        },
        error: function() {},
        complete: function(xhr, status) {
            delete activeXHR[md5(this.url)]
        },
        beforeSend: function(xhr, opts) {
            // 防止重复提交
            var name = md5(this.url)
            activeXHR[name] && activeXHR[name].abort()
            activeXHR[name] = xhr
        },
        statusCode: {
            200: function() {},
            404: function() {}
        }
    })

    // notify 全局配置
    $.notifyDefaults({
        element: 'body',
        position: 'fixed',
        type: "info",
        allow_dismiss: true,
        allow_duplicates: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "center"
        },
        offset: 50,
        spacing: 20,
        z_index: 100,
        delay: 1400,
        timer: 500,
        url_target: '_self',
        mouse_over: "pause",
        animate: {
            enter: 'animated fadeindownbig',
            exit: 'animated fadeoutupbig'
        },
        onShow: avalon.noop,
        onShown: avalon.noop,
        onClose: avalon.noop,
        onClosed: avalon.noop,
        onClick: avalon.noop,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-6 col-md-4 col-lg-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span style="font-size:40px;position:absolute;height:36px;line-height:40px;overflow:hidden" data-notify="icon"></span>' +
            '<p class="text-overflow" style="padding-left:45px;line-height:36px" data-notify="message">{2}</p>' +
            '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    })


    


})
