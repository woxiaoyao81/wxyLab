# wxy-color-picker 介绍

项目白板需要取色，在插件市场找到了自认为比较适合的[t-color-picker 颜色选择器](https://ext.dcloud.net.cn/plugin?id=412)，不过是2019年作品，再也没有更新了，于是我自己在此基础上改进为uni-module版，并添加了黑白两种预选颜色,以后完成作者未完成部分

下面是该插件原作者说明

此组件基本全平台支持。（支付宝，百度，头条小程序理论上都支持，但是没有很细致的测试这几个平台）

## 功能亮点

- 全颜色选择，支持色相选择，透明度选择
- rgba 颜色显示 ，二进制颜色显示
- 可定义备选色
- 自定义默认颜色

##未实现

- 只能选择，不能手动输入 （代码比较简单，需要可自行实现，有现成的方法可以调用）
- 颜色添加收藏 （可在备选色的基础上扩展，不会涉及到基本逻辑的改动）
- 已经实现 HSLA 颜色模式 ，但未做展示，可自行扩展
- 未实现拾色功能，将来可能也不会去实现，app 上这个功能可能不实用

## 调用方式

```html
<template>
    <view>
	    <button @click="open">打开颜色选择器</button>
        <wxy-color-picker ref="colorPicker" :color="color" @confirm="confirm"></wxy-color-picker>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                color: {r: 255,g: 0,b: 0,a: 0.6}
            };
        },
        methods: {
            open(item) {
                // 打开颜色选择器
                this.$refs.colorPicker.open();
            },
            confirm(e) {
                console.log('颜色选择器返回值：'+ e)
            }
        }
    };
</script>
```

## 属性说明

|属性名|类型|默认值|说明|
|------|----|-----|----|
|color		|Object		|{r: 0,g: 0,b: 0,a: 1}	|颜色选择器初始颜色														|
|spare-color|Object		|						|备选色，格式为:[ {r: 0,g: 0,b: 0,a: 1}]									|
|confirm	|function	|						|确认选择函数 ，返回值:event = {rgba:{r: 0,g: 0,b: 0,a: 1},hex:'#000000'}	|