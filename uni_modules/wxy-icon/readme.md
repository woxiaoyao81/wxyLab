# wxy-icon 介绍

基于插件市场i-icon (https://ext.dcloud.net.cn/plugin?id=4042) 增强改进而来，这里首先感谢原作者

## 组件改进

1. 大小支持更多单位，如果是数值则单位是rpx，如果有单位rpx,px,%,auto,em,vw,vh等
2. 点击是否支持冒泡
3. 支持设置图标margin，默认是0 5px
4. 事件支持单击或长按
5. 支持增加其它图标，方法可参考官方uni-icons增加方法

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
<td>×</td>
<td>×</td>
<td>×</td>
<td>×</td>
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

## 参数说明
|属性名		|类型|默认值	|说明|
|:-:		|:-:		|:-:		|:-:|
|name		|String	|-			|图标名,官方命名规则:ri-类名-line/fill(线状/填充),本组件引用js已经移除ri前缀,	|
|size		|Number\|String	|20	|大小尺寸，增加支持的字符串:%\|px\|rpx\|em\|vw\|vh\|vmax\|vmin\|auto，默认单位是rpx，默认大小是20rpx|
|color		|String	|black|颜色类型，支持rgb()、十六进制或关键字|
|bubble  	|Boolean|true	|是否冒泡|
|bold   	|Number\|String|noraml	|字体粗细|
|custom-class		|String|-	|新增加的图标类名|
|margin|String|0,5|外边距，margin规范,增加支持的字符串%\|px\|rpx\|em\|vw\|vh\|vmax\|vmin\|auto，默认单位是px，默认大小是0 5px|
		
|事件称名|说明|返回值|
|:-:|:-:|:-:|
|click|点击 Icon 触发事件|event|
|longpress|长按 Icon 触发事件|event|