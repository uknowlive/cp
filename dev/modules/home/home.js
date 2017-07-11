/**
 * @description:    首页
 * @creattime:      2017-06-21
 * @author:         jelly.lam
 */

define([], function() {
    var $carousel
    var vmodel = avalon.define({
        $id: "home",
        active: 0,
        sliderList: [{
            src: "/images/170629-2036B.jpg",
            href: "javascript:;",
            title: "图片1"
        }, {
            src: "/images/170526-1105I.jpg",
            href: "javascript:;",
            title: "图片2"
        }, {
            src: "/images/20170310-1706R.jpg",
            href: "javascript:;",
            title: "图片3"
        }, {
            src: "/images/170628-1746.jpg",
            href: "javascript:;",
            title: "图片4"
        }],
        tabList: [{
            active: true,
            src: "/images/index_slot_A-V2.png",
            href: "javascript:;",
            title: "PT",
            name: "古怪猴子"
        }, {
            active: false,
            src: "/images/index_slot_B-V2.png",
            href: "javascript:;",
            title: "MG",
            name: "古怪猴子"
        }, {
            active: false,
            src: "/images/index_slot_E-V2.png",
            href: "javascript:;",
            title: "TTG",
            name: "古怪猴子"
        }, {
            active: false,
            src: "/images/index_slot_G-V2.png",
            href: "javascript:;",
            title: "HB",
            name: "古怪猴子"
        }, {
            active: false,
            src: "/images/index_slot_H-V2.png",
            href: "javascript:;",
            title: "PNG",
            name: "古怪猴子"
        }],
        clickHandler: function(str) {
            $carousel.carousel(str)
        },
        mouseenter: function(e) {
            $carousel.carousel('pause')
        },
        mouseleave: function(e) {
            $carousel.carousel('cycle')
        },
        clickTabHandler: function(e, item) {
            avalon.each(vmodel.tabList, function(index, el) {
                el.active = false
            })
            item.active = true
        },
        openRankingHandler: function(e) {
            $(e.target).closest('div.ranking').animate({
                top: 0
            }, 300)
        },
        closeRankingHandler: function(e) {
            $(e.target).closest('div.ranking').animate({
                top: '-100%'
            }, 300)
        },
        $skipArray: ["$id", "clickHandler", "mouseenter", "clickTabHandler", "mouseleave", "openRankingHandler", "closeRankingHandler"]
    })

    return avalon.controller(function($ctrl) {
        // 给视图加载数据，可以返回false或任意不为true的错误信息或promise对象
        // params：视图所属的state的参数
        // resolve: return false的时候，进入同步等待，直到手动调用resolve
        // reject: 数据加载失败，调用
        $ctrl.$onEnter = function(params, resolve, reject) {
            
        }
        // 视图元素scan后触发
        $ctrl.$onRendered = function(params) {
            vmodel.active = 0
            $carousel = $("#carousel")
            $carousel.on('slid.bs.carousel', function(e) {
                vmodel.active = $(e.relatedTarget).index()
            })
        }
        // 视图卸载前触发
        $ctrl.$onBeforeUnload = function(params, resolve, reject) {
            $carousel.carousel("pause").off('slide.bs.carousel')
        }
        $ctrl.$vmodels = [vmodel]
    })

})
