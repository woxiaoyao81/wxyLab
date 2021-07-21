<template>
	<wxy-page bgcolor="green">
		<!-- <wxy-signature ref="signature" menu-flag page-flag @save="save" @saveall="saveall"></wxy-signature>	 -->
		<wxy-signature ref="signature" menu-flag page-flag host="hangzhou.goeasy.io" appkey="BC-72b4ef965516464badafb2a854558f4a" channel="usr2021070615423" @save="save" @saveall="saveall"></wxy-signature>	
	</wxy-page>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		save() {
			// 保存当前画布
			this.$refs.signature.save().then(res => {
				console.log(res);
			});
		},
		saveall() {
			// 保存所有画布
			this.$refs.signature.saveAll().then(res => {
				console.log(res);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.back-btn{
		position: fixed;
		left:10px;
		top:5px;
		z-index: 9999;
	}
</style>
