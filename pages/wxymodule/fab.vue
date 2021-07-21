<template>
	<wxy-page bgcolor="green" btncolor="white">
		<!-- 悬浮菜单 -->
		<wxy-fab ref="fab" :content="fabArr" horizontal="left" vertical="bottom" />
	</wxy-page>
</template>

<script>
export default {
	data() {
		return {
			// 悬浮菜单
			fabArr: [
				[
					{
						iconFont: 'camera-line',
						selectedIconFont: 'camera-fill',
						text: '拍照',
						active: false
					},
					{
						iconFont: 'artboard-line',
						selectedIconFont: 'artboard-line',
						text: '白板',
						active: false
					},
					{
						iconFont: 'time-line',
						selectedIconFont: 'time-fill',
						text: '倒计时',
						active: false
					},
					{
						iconFont: 'logout-box-r-line',
						selectedIconFont: 'logout-box-r-fill',
						text: '下课',
						active: false
					}
				],
				[
					{
						iconFont: 'team-line',
						selectedIconFont: 'team-fill',
						text: '用户',
						active: false,
						method: 'showContact'
					},
					{
						iconFont: 'file-list-line',
						selectedIconFont: 'file-list-fill',
						text: '资源',
						active: false
					}
				]
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
