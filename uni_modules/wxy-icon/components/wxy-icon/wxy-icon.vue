<template>
	<!-- 冒泡 -->
	<block v-if="bubble">		
		<text @click="_onClick" @longpress="_onLongpress" class="i-icon" :style="{ color: color, fontSize: getSize, fontWeight: bold,margin:getMargin}" :class="customClass">{{ icon[name] }}</text>
		<!-- 在官方动态样式绑定的对象语法基础上，发现另一种写法，测试通过 -->
		<!-- <text @click="_onClick" @longpress="_onLongpress" class="i-icon" :style="{ color: color, fontSize: getSize, 'font-weight': bold,margin:getMargin}" :class="customClass">{{ icon[name] }}</text> -->
	</block>
	<!-- 不冒泡 -->
	<block v-else>
		<text @click.stop.prevent="_onClick" @longpress.stop.prevent="_onLongpress" class="i-icon" :style="{ color: color, fontSize: getSize, fontWeight: bold,margin:getMargin}" :class="customClass">{{ icon[name] }}</text>		
	</block>
</template>
<script>
/**
 * 基于插件市场https://ext.dcloud.net.cn/plugin?id=4042改进(与wxy-icons不同是，wxy-icons是基于官方uni-icons图标库)
 * @tutorial https://remixicon.com/
 * @property {String} name	图标名,官方命名规则:ri-类名-line/fill(线状/填充),在官方图标上点击即可查看更多细节,本组件引用js已经移除ri前缀，其它一样
 * @property {String} color 颜色填充,支持rgb()、十六进制或关键字
 * @property {Number|String} size 大小，增加支持的字符串:%|px|rpx|em|vw|vh|vmax|vmin|auto，默认单位是rpx，默认大小是20rpx
 * @property {Boolean} bubble 是否冒泡，默认是true
 * @property {Number|String} bold  字体粗细,默认是normal
 * @property {String} margin  外边距，margin规范,增加支持的字符串%|px|rpx|em|vw|vh|vmax|vmin|auto，默认单位是px，默认大小是0 5px
 * @property {String} custom-class 新增加的图标类名
 * @event {Function} click 点击 Icon 触发事件
 * @event {Function} longpress 长按 Icon 触发事件
 * 
 * 增加图标可参考官方https://www.uviewui.com/guide/customIcon.html
 */
import icon from './icon.js';
// #ifdef APP-NVUE
var domModule = weex.requireModule('dom');
// 这里的CDN和css中的CDN一致
domModule.addRule('fontFace', {
	fontFamily: 'remixicon',
	src: "url('https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.ttf?t=1590207869815')"
});
// #endif
export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: 'black'
		},
		size: {
			type: [Number, String],
			default: 20
		},
		// 是否冒泡，默认是不冒泡
		bubble: {
			type: Boolean,
			default: true
		},
		// 字体粗细
		bold: {
			type: [Number, String],
			default: 'normal'
		},
		margin: {
			type: String,
			default: '0,5'
		},
		// 自定义类名
		customClass: {
			type: String,
			default: ''
		},
	},
	data() {
		return {
			icon
		};
	},
	computed: {
		getSize: function() {
			if (/(%|px|rpx|em|vw|vh|vmax|vmin|auto)$/.test(this.size)) return this.size;
			else return this.size + 'rpx';
		},
		getMargin:function(){
			let margin=this.margin.toString();
			let marginArr=margin.split(',').map(item=>{
				if (/(%|px|rpx|em|vw|vh|vmax|vmin|auto)$/.test(item)) return item;
				else return item + 'px';
			});
			return marginArr.join(' ');
			// if (/(%|px|rpx|em|vw|vh|vmax|vmin|auto)$/.test(this.margin)) return this.margin;
			// else return this.margin + 'px';
		},
	},
	methods: {
		// 点击事件
		_onClick(event) {
			this.$emit('click', event);
		},
		// 长按事件
		_onLongpress(event){
			this.$emit('longpress',event);
		}
	}
};
</script>
<style scoped>
/* #ifndef APP-NVUE */
@font-face {
	font-family: remixicon;
	src: url('https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.ttf?t=1590207869815') format('truetype');
}
/* #endif */
.i-icon {
	/* 内级块 */
	display: inline-flex;
	font-family: remixicon !important;
	text-decoration: none;
	font-style: normal;
	/* 水平垂直居中 */
	text-align: center;
	vertical-align: middle;
}
</style>
