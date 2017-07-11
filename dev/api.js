/**
 * Api配置文件
 */
define([], function() {
	var URL = '/API/'

	return {
		// 公共接口
		base: {

		},
		// 用户行为
		user: {
			// 登录
			login: URL + 'AppLogin',
			logout:  URL + 'logout'
		}
	}


})

