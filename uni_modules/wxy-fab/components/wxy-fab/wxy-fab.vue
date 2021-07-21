<template>
	<view class="uni-cursor-point">
		<view
			v-if="popMenu && positionTrue && fabContent.length > 0"
			:class="{
				'uni-fab--leftBottom': leftBottom,
				'uni-fab--rightBottom': rightBottom,
				'uni-fab--leftTop': leftTop,
				'uni-fab--rightTop': rightTop
			}"
			class="uni-fab"
		>
			<!-- 官方 -->
			<template v-if="fabMode >= 1">
				<view
					:class="{
						'uni-fab__content--flexDirection': directionAuto === 'vertical',
						'uni-fab__content--other-platform': !isAndroidNvue
					}"
					class="uni-fab__content"
					:style="[fabStyle[0]]"
					elevation="5"
				>
					<view v-if="flexDirectionStart || horizontalLeft" class="uni-fab__item" :style="{ width: contentWidthMin }" />
					<view
						v-for="(item, index) in fabContent[0]"
						:key="index"
						:class="{ 'uni-fab__item--active': isShow }"
						class="uni-fab__item"
						:style="{'width': contentWidthMin, 'height': contentWidthMin }"
						@click="_onItemClick(index, item, 0)"
					>
						<template v-if="item.iconFont">
							<wxy-icon :name="item.active ? item.selectedIconFont : item.iconFont" size="1em" :color="item.active ? styles.selectedColor : styles.color" />
						</template>
						<template v-else>
							<image :src="item.active ? item.selectedIconPath : item.iconPath" class="uni-fab__item-image" mode="widthFix" />
						</template>
						<text class="uni-fab__item-text" :style="{ color: item.active ? styles.selectedColor : styles.color }">{{ item.text }}</text>
					</view>
					<view v-if="flexDirectionEnd || horizontalRight" class="uni-fab__item" :style="{ width: contentWidthMin }" />
				</view>
			</template>
			<template v-if="fabMode >= 2">
				<view
					:class="{
						'uni-fab__content--flexDirection': !(directionAuto === 'vertical'),
						'uni-fab__content--other-platform': !isAndroidNvue
					}"
					class="uni-fab__content"
					:style="[fabStyle[1]]"
					elevation="5"
				>
					<view v-if="leftTop || (leftBottom && flexDirectionEnd) || (rightTop && horizontalRight)" class="uni-fab__item" :style="{ width: contentWidthMin }" />
					<view
						v-for="(item, index) in fabContent[1]"
						:key="index"
						:class="{ 'uni-fab__item--active': isShow }"
						class="uni-fab__item"
						:style="{ 'width': contentWidthMin, 'height': contentWidthMin }"
						@click="_onItemClick(index, item, 1)"
					>
						<template v-if="item.iconFont">
							<wxy-icon :name="item.active ? item.selectedIconFont : item.iconFont" size="1em" :color="item.active ? styles.selectedColor : styles.color" />
						</template>
						<template v-else>
							<image :src="item.active ? item.selectedIconPath : item.iconPath" class="uni-fab__item-image" mode="widthFix" />
						</template>
						<text class="uni-fab__item-text" :style="{ color: item.active ? styles.selectedColor : styles.color }">{{ item.text }}</text>
					</view>
					<view v-if="rightBottom || (rightTop && flexDirectionStart) || (leftBottom && horizontalLeft)" class="uni-fab__item" :style="{ width: contentWidthMin }" />
				</view>
			</template>
		</view>
		<view
			:class="{
				'uni-fab__circle--leftBottom': leftBottom,
				'uni-fab__circle--rightBottom': rightBottom,
				'uni-fab__circle--leftTop': leftTop,
				'uni-fab__circle--rightTop': rightTop,
				'uni-fab__content--other-platform': !isAndroidNvue
			}"
			class="uni-fab__circle uni-fab__plus"
			:style="{ 'background-color': styles.buttonColor, 'width': contentWidthMin, 'height': contentWidthMin, 'border-radius': contentWidthMin }"
			@click="_onClick"
		>
			<view class="fab-circle-v" :class="{ 'uni-fab__plus--active': isShow && content.length > 0 }"></view>
			<view class="fab-circle-h" :class="{ 'uni-fab__plus--active': isShow && content.length > 0 }"></view>
		</view>
	</view>
</template>

<script>
let platform = 'other';
// #ifdef APP-NVUE
platform = uni.getSystemInfoSync().platform;
// #endif

/**
 * Fab 悬浮按钮(基于官方悬浮按钮改进)
 * @description 点击可展开一个图形按钮菜单
 * @tutorial https://ext.dcloud.net.cn/plugin?id=144
 * @property {Object} pattern 可选样式配置项
 * @property {Object} horizontal = [left | right | center] 水平对齐方式
 * 	@value left 左对齐
 * 	@value right 右对齐
 *  @value center 中间对齐(增加)
 * @property {Object} vertical = [bottom | top | center] 垂直对齐方式
 * 	@value bottom 下对齐
 * 	@value top 上对齐
 *  @value center 中间对齐(增加)
 * @property {Object} direction = [horizontal | vertical] 展开菜单显示方式
 * 	@value horizontal 水平显示
 * 	@value vertical 垂直显示
 * @property {Array} content 展开菜单内容配置项
 * @property {Boolean} popMenu 是否使用弹出菜单，若为false则无法使用弹出菜单
 * @event {Function} trigger 展开菜单点击事件，返回点击信息
 * @event {Function} fabClick 悬浮按钮点击事件
 *
 * 目前问题：
 * 1、不能自适应，使用绝对尺寸(硬伤)
 * 2、不能拖动，不能吸边
 * 3、不支持字体图标
 * 4、不能两个方向展开菜单，这个需求在课堂教学中经常需要
 *
 * 拟实现功能:
 * 1、位置有五种:除了官方左上，右上、左下和右下外，增加中心、上中，下中，左中和右中等共五个位置
 * 2、菜单展开形式：
 * 左上，右上、左下和右下时:最多两栏，一栏时可水平或垂直(同官方)，两栏时第一个成员由direction指定，另一个是垂直于direction方向
 * 左中，右中，上中和下中时：一栏是半圆，两栏是两侧水平或垂直
 * 中心时:一栏是圆圈显示，两栏由direction指定两侧显示，四栏是上下左右方向显示
 * 暂时不考虑三栏情况
 *
 *
 * 增强说明:
 * @property content 展开菜单内容配置项（2021-06-15）
 * 说明1：类型是数组，成员可以是对象，也可是数组(此时数组中成员必须是对象)
 * 说明2: 图标支持图片或字体图标，并用字体图标优先。图片仍然是iconPath和selectedIconPath,字体图标是iconFont和selectedIconFont,目前字体图标是基于uni-icons修改增强的
 * 说明3：图标下方文字自动换行修改为不换行
 * @property direction（2021-06-15）
 * 基于多菜单进行了增强，一组菜单时同官方，两组菜单时是成直角显示
 * 
 * 增加说明:
 * @property scale 菜单之间绽放比例，默认是1.1，可高度菜单之间的距离（2021-06-15）
 *                 改进了官方对悬浮按钮加号居中定位为自适应的margin:auto，而不是固定的宽高居中（2021-07-05）
 *                 改进了展开菜单自适应居中问题，而不是固定宽高剧中（2021-07-05）
 *
 */
export default {
	props: {
		pattern: {
			type: Object,
			default() {
				return {};
			}
		},
		horizontal: {
			type: String,
			default: 'left'
		},
		vertical: {
			type: String,
			default: 'bottom'
		},
		direction: {
			type: String,
			default: 'horizontal'
		},
		content: {
			type: Array,
			default() {
				return [];
			}
		},
		show: {
			type: Boolean,
			default: false
		},
		popMenu: {
			type: Boolean,
			default: true
		},
		scale: {
			type: Number,
			default: 1.1
		}
	},
	data() {
		return {
			fabShow: false,
			isShow: false,
			isAndroidNvue: platform === 'android',
			styles: {
				color: '#3c3e49',
				selectedColor: '#007AFF',
				backgroundColor: '#fff',
				buttonColor: '#007AFF'
			},
			fabMode: 1, //菜单个数：可选1,2,3,4
			fabDirection: 1, //菜单样式：水平1,垂直2,直角3,圆4,半圆5
			fabPosition: 'leftCenter', //菜单位置,取值是leftCenter和rightCenter,主要是修正三个菜单时情况,
			fabMaxNum: 1, //计算菜单成员最大数量
			fabContent: []
		};
	},
	computed: {
		contentWidth() {
			// #ifdef H5
			return (this.fabMaxNum + 1) * 1.6 * this.scale + 0.5 + 'em';
			// #endif
			// #ifndef H5
			return (this.fabMaxNum + 1) * 2 * this.scale + 0.5 + 'em';
			// #endif
		},
		contentWidthMin() {
			// #ifdef H5
			return 1.6 * this.scale + 'em';
			// #endif
			// #ifndef H5
			return 2 * this.scale + 'em';
			// #endif
		},
		// 动态计算宽度
		boxWidth() {
			return this.getPosition(3, 'horizontal');
		},
		// 动态计算高度
		boxHeight() {
			return this.getPosition(3, 'vertical');
		},
		// 计算左下位置
		leftBottom() {
			if (this.getPosition(0, 'left', 'bottom')) this.menuStyle = Object.assign({}, this.menuStyle, { left: '10px', right: 'auto', bottom: '10px', top: 'auto' });
			return this.getPosition(0, 'left', 'bottom');
		},
		// 计算右下位置
		rightBottom() {
			if (this.getPosition(0, 'right', 'bottom')) this.menuStyle = Object.assign({}, this.menuStyle, { left: 'auto', right: '10px', bottom: '10px', top: 'auto' });
			return this.getPosition(0, 'right', 'bottom');
		},
		// 计算左上位置
		leftTop() {
			if (this.getPosition(0, 'left', 'top')) this.menuStyle = Object.assign({}, this.menuStyle, { left: '10px', right: 'auto', bottom: 'auto', top: '10px' });
			return this.getPosition(0, 'left', 'top');
		},
		// 计算右上位置
		rightTop() {
			if (this.getPosition(0, 'right', 'top')) this.menuStyle = Object.assign({}, this.menuStyle, { left: 'auto', right: '10px', bottom: 'auto', top: '10px' });
			return this.getPosition(0, 'right', 'top');
		},
		//计算中心位置
		centerCenter() {
			return this.getPosition(0, 'center', 'center');
		},
		leftCenter() {
			return this.getPosition(2, 'center', 'left');
		},
		rightCenter() {
			return this.getPosition(2, 'center', 'right');
		},
		topCenter() {
			return this.getPosition(1, 'center', 'top');
		},
		bottomCenter() {
			return this.getPosition(1, 'center', 'bottom');
		},
		flexDirectionStart() {
			return this.getPosition(1, 'vertical', 'top');
		},
		flexDirectionEnd() {
			return this.getPosition(1, 'vertical', 'bottom');
		},
		horizontalLeft() {
			return this.getPosition(2, 'horizontal', 'left');
		},
		horizontalRight() {
			return this.getPosition(2, 'horizontal', 'right');
		},
		// 对于左中、右中、上中和下中，方向是自动计算，其它位置direction可手动指定(增加)
		directionAuto() {
			if (this.horizontal.toLowerCase() == 'center' && this.vertical.toLowerCase() != 'center') return 'horizontal';
			if (this.vertical.toLowerCase() == 'center' && this.horizontal.toLowerCase() != 'center') return 'vertical';
			return this.direction;
		},
		// 位置是否合法(增加)
		positionTrue() {
			// 左下、右下、左上、右上、中心、左中，右中，上中和下中9个位置
			return (
				this.leftBottom ||
				this.rightBottom ||
				this.leftTop ||
				this.rightTop ||
				this.centerCenter ||
				this.leftCenter ||
				this.rightCenter ||
				this.topCenter ||
				this.bottomCenter
			);
		},
		fabStyle() {
			// 菜单样式
			let fabStyle = [];
			if (this.fabMode >= 1) {
				fabStyle.push(Object.assign({}, this.menuStyle, { width: this.boxWidth, height: this.boxHeight }));
			}
			if (this.fabMode >= 2) {
				if (this.fabDirection == 3) fabStyle.push(Object.assign({}, this.menuStyle, { width: this.boxHeight, height: this.boxWidth }));
			}
			return fabStyle;
		}
	},
	watch: {
		pattern(newValue, oldValue) {
			//console.log(JSON.stringify(newValue))
			this.styles = Object.assign({}, this.styles, newValue);
		}
	},
	created() {
		this.isShow = this.show;
		if (this.top === 0) this.fabShow = true;
		// 初始化样式
		this.styles = Object.assign({}, this.styles, this.pattern);
		this.menuStyle = { backgroundColor: this.styles.backgroundColor };
		// 解析菜单内容
		this.fabContent = this.getFabContent();
	},
	methods: {
		_onClick() {
			this.$emit('fabClick');
			if (!this.popMenu) return;
			this.isShow = !this.isShow;
		},
		open() {
			this.isShow = true;
		},
		close() {
			this.isShow = false;
		},
		/**
		 * 按钮点击事件(基于官方进行增强)		 *
		 */
		_onItemClick(index, item, k = 0) {
			// 用户选择反馈到组件上
			let fabContent = JSON.parse(JSON.stringify(this.fabContent));
			fabContent = fabContent.map((el, ik) => {
				if (ik == k) {
					return el.map((val, ii) => {
						val.active = false;
						if (ii == index) val.active = true;
						return val;
					});
				} else
					return el.map(val => {
						val.active = false;
						return val;
					});
			});
			this.fabContent = fabContent;
			// 用户选择反馈到父组件
			this.$emit('trigger', {
				index,
				item,
				k
			});
		},
		/**
		 * 获取 位置信息(尽量简化if...else if嵌套，不然太low了)
		 */
		getPosition(types, paramA, paramB) {
			if (types === 0) return this.horizontal === paramA && this.vertical === paramB;
			if (types === 1) return this.direction === paramA && this.vertical === paramB;
			if (types === 2) return this.direction === paramA && this.horizontal === paramB;
			return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
		},
		getFabContent() {
			// 解析菜单内容：一维数组是官方原始格式，另一个是二维数组，长度不超过4个
			let content = JSON.parse(JSON.stringify(this.content));
			let fabContent = [];
			if (Object.prototype.toString.call(content).slice(8, -1) === 'Array') {
				if (content.length == 0) return [];
				// 一维数组时要过滤不是对象的
				if (Object.prototype.toString.call(content[0]).slice(8, -1) === 'Object') {
					this.fabMode = 1;
					this.fabDirection = this.direction == 'horizontal' ? 1 : this.direction == 'vertical' ? 2 : 1;
					this.fabMaxNum = content.length;
					if (this.centerCenter) this.fabDirection = 4;
					fabContent.push(content.filter(item => Object.prototype.toString.call(item).slice(8, -1) === 'Object'));
				}
				// 二维数组
				if (Object.prototype.toString.call(content[0]).slice(8, -1) === 'Array') {
					// 1.过滤不是数组
					content = content.filter(item => Object.prototype.toString.call(item).slice(8, -1) === 'Array');
					// 2.过滤二维成员不是对象的
					content = content.map(item => item.filter(val => Object.prototype.toString.call(val).slice(8, -1) === 'Object'));
					// 3.根据位置限制个数
					fabContent = content.filter(item => !this.empty(item));
					fabContent = fabContent.filter((item, index) => index <= 3);
					if (this.leftBottom || this.rightBottom || this.leftTop || this.rightTop) fabContent = fabContent.filter((item, index) => index <= 1);
					if (this.leftCenter || this.rightCenter || this.topCenter || this.bottomCenter) fabContent = fabContent.filter((item, index) => index <= 2);
					// 4.菜单个数
					this.fabMode = fabContent.length;
					// 5.菜单最大数目
					fabContent.map(item => {
						if (item.length > this.fabMaxNum) this.fabMaxNum = item.length;
					});
					// 6.菜单样式
					if (fabContent.length == 1) {
						this.fabDirection = this.direction == 'horizontal' ? 1 : this.direction == 'vertical' ? 2 : 1;
						if (this.centerCenter) this.fabDirection = 4;
					}
					if (fabContent.length == 2) {
						if (this.leftBottom || this.rightBottom || this.leftTop || this.rightTop) this.fabDirection = 3;
						if (this.leftCenter || this.rightCenter) this.fabDirection = 2;
						if (this.topCenter || this.bottomCenter) this.fabDirection = 1;
						if (this.centerCenter) this.fabDirection = this.direction == 'horizontal' ? 1 : this.direction == 'vertical' ? 2 : 1;
					}
					if (fabContent.length == 3) {
						if (this.leftBottom) this.fabPosition = 'leftCenter';
						if (this.rightBottom) this.fabPosition = 'rightCenter';
						if (this.leftTop) this.fabPosition = 'leftCenter';
						if (this.rightTop) this.fabPosition = 'rightCenter';
						this.fabDirection = 5;
					}
					if (fabContent.length == 3) {
						this.fabPosition = 'centerCenter';
						this.fabDirection = 3;
					}
				}
			}
			return fabContent;
		},
		// 判断是否为空
		empty: function(value) {
			switch (typeof value) {
				case 'undefined':
					return true;
				case 'string':
					if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
					break;
				case 'boolean':
					if (!value) return true;
					break;
				case 'number':
					if (0 === value || isNaN(value)) return true;
					break;
				case 'object':
					if (null === value || value.length === 0) return true;
					for (var i in value) return false;
					return true;
			}
			return false;
		}
	}
};
</script>

<style scoped>
.uni-fab {
	position: fixed;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	z-index: 10;
}

.uni-cursor-point {
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
}

.uni-fab--active {
	opacity: 1;
}

.uni-fab--leftBottom {
	left: 5px;
	bottom: 10px;
	/* #ifdef H5 */
	left: calc(5px + var(--window-left));
	bottom: calc(10px + var(--window-bottom));
	/* #endif */
	padding: 10px;
}

.uni-fab--leftTop {
	left: 5px;
	top: 10px;
	/* #ifdef H5 */
	left: calc(5px + var(--window-left));
	top: calc(10px + var(--window-top));
	/* #endif */
	padding: 10px;
}

.uni-fab--rightBottom {
	right: 5px;
	bottom: 10px;
	/* #ifdef H5 */
	right: calc(5px + var(--window-right));
	bottom: calc(10px + var(--window-bottom));
	/* #endif */
	padding: 10px;
}

.uni-fab--rightTop {
	right: 5px;
	top: 10px;
	/* #ifdef H5 */
	right: calc(5px + var(--window-right));
	top: calc(10px + var(--window-top));
	/* #endif */
	padding: 10px;
}

.uni-fab__circle {
	position: fixed;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;

	background-color: #3c3e49;
	z-index: 11;
}

.uni-fab__circle--leftBottom {
	left: 15px;
	bottom: 20px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	bottom: calc(20px + var(--window-bottom));
	/* #endif */
}

.uni-fab__circle--leftTop {
	left: 15px;
	top: 20px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	top: calc(20px + var(--window-top));
	/* #endif */
}

.uni-fab__circle--rightBottom {
	right: 15px;
	bottom: 20px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	bottom: calc(20px + var(--window-bottom));
	/* #endif */
}

.uni-fab__circle--rightTop {
	right: 15px;
	top: 20px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	top: calc(20px + var(--window-top));
	/* #endif */
}

.uni-fab__circle--left {
	left: 0;
}

.uni-fab__circle--right {
	right: 0;
}

.uni-fab__circle--top {
	top: 0;
}

.uni-fab__circle--bottom {
	bottom: 0;
}

.uni-fab__plus {
	font-weight: bold;
}

.fab-circle-v {
	position: absolute;
	width: 3px;
	/* height: 31px; */
	height: 1em;
	/* 居中 */
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: white;
	transform: rotate(0deg);
	transition: transform 0.3s;
}

.fab-circle-h {
	position: absolute;
	height: 3px;
	/* width: 31px; */
	width: 1em;
	/* 居中 */
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: white;
	transform: rotate(0deg);
	transition: transform 0.3s;
}

.uni-fab__plus--active {
	transform: rotate(135deg);
}

.uni-fab__content {
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	display: flex;
	/* 改进官方flex-start或flex-end布局为space-evenly */
	/* justify-content: space-evenly; */
	justify-content: space-evenly;
	/* #endif */
	flex-direction: row;
	width: 2em;
	border-radius: 2em;
	/* #ifdef H5 */
	width: 1.6em;
	border-radius: 1.6em;
	/* #endif */
	overflow: hidden;
	transition-property: width, height;
	transition-duration: 0.2s;
	border-color: #dddddd;
	border-width: 1rpx;
	border-style: solid;
	/* 为支持多菜单显示，position为absolute */
	position: absolute;
	/* left: 10px; */
	/* top: 10px; */
	/* bottom: 10px; */
	/* right: 10px; */
}

.uni-fab__content--other-platform {
	border-width: 0px;
	box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
}

.uni-fab__content--flexDirection {
	flex-direction: column;
}

.uni-fab__item {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* width: 55px;
	height: 55px; */
	width: 2em;
	height: 2em;
	/* #ifdef H5 */
	width: 1.6em;
	height: 1.6em;
	/* #endif */
	opacity: 0;
	transition: opacity 0.2s;
}

.uni-fab__item--active {
	opacity: 1;
}

.uni-fab__item-image {
	width: 1em;
	height: 1em;
	margin-bottom: 3px;
}

.uni-fab__item-text {
	color: #ffffff;
	font-size: 12px;
	text-align: center;
	/* 多文字不换行 */
	white-space: nowrap;
	/* 超过则截断 */
	width: 100%;
	text-overflow: clip;
}

.uni-fab__item--first {
	width: 2em;
	/* #ifdef H5 */
	width: 1.6em;
	/* #endif */
}
</style>
