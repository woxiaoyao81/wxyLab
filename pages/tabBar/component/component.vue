<template>
	<view class="page-container">
		<uni-list>
			<uni-list-item title="白板" link="navigateTo" to="/pages/wxymodule/signature"></uni-list-item>
			<uni-list-item title="弹窗容器" link="navigateTo" to="/pages/wxymodule/popup"></uni-list-item>
			<uni-list-item title="悬浮按钮" link="navigateTo" to="/pages/wxymodule/fab"></uni-list-item>
			<!-- <uni-list-item title="右键菜单" link="navigateTo" to="/pages/wxymodule/popmenu"></uni-list-item>			 -->
		</uni-list>
		<uni-file-picker v-model="imageValue" fileMediatype="all" mode="grid" @select="select" @progress="progress" @success="success" @fail="fail" />
	</view>
</template>

<script>
// TODO 修复Android v3 加载过慢问题
// #ifdef APP-PLUS
const domModule = weex.requireModule('dom');
domModule.addRule('fontFace', {
	fontFamily: 'uniicons',
	src: "url('/static/uni.ttf')"
});
// #endif
export default {
	data() {
		return {
			imageValue: []
		};
	},
	methods: {
		// 获取上传状态
		select(e) {
			console.log('选择文件：', e);
		},
		// 获取上传进度
		progress(e) {
			console.log('上传进度：', e);
		},

		// 上传成功
		success(e) {
			console.log('上传成功');
		},

		// 上传失败
		fail(e) {
			console.log('上传失败：', e);
		}
	}
};
</script>

<style></style>
