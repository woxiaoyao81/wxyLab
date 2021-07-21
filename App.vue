<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef APP-PLUS
		// 防止顶部系统栏遮挡软件顶部的功能
		plus.navigator.setFullscreen(true);
		// 锁定屏幕方向 我锁定的是横屏自适应，其它参数见http://www.html5plus.org/doc/zh_cn/device.html#plus.screen.lockOrientation
		plus.screen.lockOrientation('landscape');
		// #endif
		//建立连接
		this.goeasy &&
			this.goeasy.connect({
				// id: '001', //pubsub选填，im必填
				// data: { avatar: '/www/xxx.png', nickname: 'Neo' }, //必须是一个对象，pubsub选填，im必填，用于上下线提醒和查询在线用户列表时，扩展更多的属性
				onSuccess: function() {
					//连接成功
					console.log('GoEasy connect successfully.'); //连接成功
				},
				onFailed: function(error) {
					//连接失败
					console.log('Failed to connect GoEasy, code:' + error.code + ',error:' + error.content);
				},
				onProgress: function(attempts) {
					//连接或自动重连中
					console.log('GoEasy is connecting', attempts);
				}
			});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
		//断开连接
		// this.goeasy.disconnect({
		// 	onSuccess: function() {
		// 		console.log('GoEasy disconnect successfully.');
		// 	},
		// 	onFailed: function(error) {
		// 		console.log('Failed to disconnect GoEasy, code:' + error.code + ',error:' + error.content);
		// 	}
		// });
	}
};
</script>

<style lang="scss">
/* 自定义变量 */
@import 'common/wxy.css';
/*每个页面公共css */
.page-container {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
</style>
