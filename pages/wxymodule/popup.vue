<template>
	<wxy-page>
		<!-- 弹窗容器 -->
		<wxy-popup v-model="show" :mode="mode" :height="height" :width="width" :border-radius="radius">
			<view class="pop-container">
				<view class="pop-item title center"><text>弹窗示例</text></view>
				<view class="pop-item subtitle"><text>主要完成弹窗容器，可提供弹窗相关操作</text></view>
				<view class="pop-item"><text>1、提供上、下、左、右和中五个位置弹窗</text></view>
				<view class="pop-item"><text>2、提供了默认设置，可简化调用</text></view>
				<view class="pop-item"><text>3、可设置宽度或高度，若超过高度则自动滚动</text></view>
				<view class="pop-item"><text>4、可设置圆角、宽度、高度、最大(小)宽度或高度</text></view>
			</view>
		</wxy-popup>
		<view class="page-column page-center" style="height: 100%;">
			<view class="page-row">
				<button type="default" @click="bindTop">上弹窗</button>
				<button type="default" @click="bindBottom">下弹窗</button>
				<button type="default" @click="bindCenter">中弹窗</button>
				<button type="default" @click="bindLeft">左弹窗</button>
				<button type="default" @click="bindRight">右弹窗</button>
			</view>
			<view class="page-row">
				<view>弹窗选项:</view>
				<checkbox-group @change="checkboxChange">
					<checkbox value="width" color="#FFCC33" style="transform:scale(0.7)" />
					限宽
					<checkbox value="height" color="#FFCC33" style="transform:scale(0.7)" />
					限高
					<checkbox value="radius" color="#FFCC33" style="transform:scale(0.7)" />
					圆角
				</checkbox-group>
			</view>
		</view>
	</wxy-page>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			mode: 'center',
			height: '',
			width: '',
			radius: null
		};
	},
	methods: {
		bindTop() {
			this.show = true;
			this.mode = 'top';
		},
		bindBottom() {
			this.show = true;
			this.mode = 'bottom';
		},
		bindCenter() {
			this.show = true;
			this.mode = 'center';
		},
		bindLeft() {
			this.show = true;
			this.mode = 'left';
		},
		bindRight() {
			this.show = true;
			this.mode = 'right';
		},
		bindWidth() {
			this.show = true;
			this.mode = 'right';
		},
		bindHeight() {
			this.show = true;
			this.mode = 'right';
		},
		checkboxChange: function(e) {
			console.log(e.detail.value);
			let values = e.detail.value;
			if (values.includes('width')) this.width = '500px';
			else this.width = '';
			if (values.includes('height')) this.height = '100px';
			else this.height = '';
			if (values.includes('radius')) this.radius = '14px';
			else this.radius = '';
			// var items = this.items,
			// 	values = e.detail.value;
			// for (var i = 0, lenI = items.length; i < lenI; ++i) {
			// 	const item = items[i]
			// 	if(values.indexOf(item.value) >= 0){
			// 		this.$set(item,'checked',true)
			// 	}else{
			// 		this.$set(item,'checked',false)
			// 	}
			// }
		}
	}
};
</script>

<style lang="scss" scoped></style>
