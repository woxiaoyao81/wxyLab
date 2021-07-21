# wxy-fab 介绍

## 组件来源

最近需要悬浮按钮，刚好官方有uni-fab，但在应用项目中却发现仍然存在诸多不足

- 不能自适应，使用绝对尺寸(硬伤)
- 不能拖动，不能吸边
- 不支持字体图标
- 位置太少，目前只能左上、左下、右上和右下，至于左/上/右/下中和中心五个位置没有
- 菜单只支持一组，而常见垂直两组或两侧两组，半圆或圆形展开没有，使用场景比较窄

在插件市场也没有功能比较全的软件，于是就基于官方uni-fab自己改造了，目前项目只是用到自适应、垂直两组和图标，所以第一版也是满足这个需求，其它有时间再完成

## 平台兼容性

<table>
<thead>
<tr>
<th>app</th>
<th>微信小程序</th>
<th>支付宝小程序</th>
<th>百度小程序</th>
<th>字节小程序</th>
<th>QQ小程序</th>
<th>快应用</th>
</tr>
</thead>
<tbody>
<tr>
<td>3.1.1 app-vue app-nvue</td>
<td>√</td>
<td>√</td>
<td>√</td>
<td>√</td>
<td>√</td>
<td>×</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>h5-Safari</th>
<th>Android Browser</th>
<th>微信浏览器(Android)</th>
<th>QQ浏览器(Android)</th>
<th>Chrome</th>
<th>IE</th>
<th>Edge</th>
<th>Firefox</th>
<th>pc-Safari</th>
</tr>
</thead>
<tbody>
<tr>
<td>√</td>
<td>√</td>
<td>√</td>
<td>√</td>
<td>√</td>
<td>×</td>
<td>√</td>
<td>√</td>
<td>√</td>
</tr>
</tbody>
</table>

## 基本用法

```html
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
```

## API

### Fab Props

|  属性名	|    类型	| 默认值		| 说明															|
| :-:		| :-:		| :-:			| :-:															|
| pattern	| Object	| -				| 可选样式配置项												|
| horizontal| String	| 'left'		| 水平对齐方式。`left`:左对齐，`right`：右对齐					|
| vertical	| String	| 'bottom'		| 垂直对齐方式。`bottom`:下对齐，`top`：上对齐					|
| direction	| String	| 'horizontal'	| 展开菜单显示方式。`horizontal`:水平显示，`vertical`：垂直显示	|
| popMenu	| Boolean	| true			| 是否使用弹出菜单											|
| content	| Array		| -				| 展开菜单内容配置项(改进见后面说明)|

**pattern配置项：**

|  参数				|    类型	| 默认值	| 说明				|
| :-:				|  :-:		| :-:		| :-:				|
| color				| String	| #3c3e49	| 文字默认颜色		|
| selectedColor		| String	| #007AFF	| 文字选中时的颜色	|
| backgroundColor	| String	| #ffffff	| 背景色			|
| buttonColor		| String	| #3c3e49	| 按钮背景色		|

**content配置项：**

|  参数				|    类型	| 说明			|
| :-:				|  :-:				| :-:		| :-:			|
| iconPath			| String	| 图片路径		|
| selectedIconPath	| String	| 选中后图片路径|
| text				| String	| 文字			|
| active			| Boolean	| 是否选中当前	|
| iconFont			| String	| 图标名称（只支持wxy-icon）|
| selectedIconFont	| String	| 选中后图标名称（只支持wxy-icon）|

### Fab Events

|  参数		|    类型	| 说明							|
| :-:		|  :-:		| :-:							|
| @trigger	| Function	| 展开菜单点击事件，返回点击信息|
| @fabClick	| Function	| 悬浮按钮点击事件	
	
### 展开菜单内容配置项重点说明

- 说明1：类型是数组，成员可以是对象，也可是数组(此时数组中成员必须是对象)
- 说明2: 图标支持图片或字体图标，并用字体图标优先。图片仍然是iconPath和selectedIconPath,字体图标是iconFont和selectedIconFont,目前字体图标是基于uni-icons修改增强的
- 说明3：图标下方文字自动换行修改为不换行


