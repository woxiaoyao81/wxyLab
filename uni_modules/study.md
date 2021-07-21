## 组件开发学习笔记

### 1.如何设置动态样式(2021-07-06)

无论是组件或是页面中元素都存在动态样式的需求,按官方教程[Class与Style样式绑定](https://uniapp.dcloud.io/vue-basics?id=class-%e4%b8%8e-style-%e7%bb%91%e5%ae%9a), 这里重点说下样式style,整体来说有两大类：一是对象语法，另一个是数组语法

#### 对象语法

```vue
<!-- 官方示例：属性关键字是多个单词用短横线相连时则转化为小驼峰命名法 -->
<view :style="{ color: activeColor, fontSize: fontSize + 'px' }">333</view>
<!-- 另一种就是使用原属性关键字，但一定要加上单引号 -->
<view :style="{ color: activeColor, 'font-size': fontSize + 'px' }">333</view>

<!-- 一定要注意,直接传入样式对象变量是无效的！！！传入对象变量必须要在数组语法中才有效 -->
<view :style="style">333</view><!-- 这种是无效的 -->
...
computed:{
	style(){
		let style={};
		style.color="red";
		return style;
	}
}
```
在对象语法中，可以直接给每个属性赋值(可动态计算的),但不能是对象变量，若想是对象变量则必须写在数组语法中。

#### 数组语法

```vue
<!-- 官方示例：是在对象语法基础上再加上中括号(即数组语法) -->
<view :style="[{ color: activeColor, fontSize: fontSize + 'px' }]">444</view>

<!-- 数组语法相比对象语法更强大更灵活，如可以是默认样式与动态样式相结合,结合原则按先后顺序 -->
<view class="" :style="[{'color':'yellow'},style]">
...
computed:{
	style(){
		let style={};
		style.color="red";
		return style;
	}
}
```

通过上面的总结和测试，可以解决动态样式的设置，这个对于组件开发非常重要。

### 2.uni_modules中renderjs如何引入资源

[官方介绍目录规范](https://uniapp.dcloud.io/uni_modules?id=%e7%9b%ae%e5%bd%95%e7%bb%93%e6%9e%84)中指出如果是非项目类型的插件，比如组件、js sdk、页面模板、云函数，则需要放置在项目的uni\_modules目录下。此时uni\_modules目录下的目录结构和uni-app的项目结构是一致的。

官方同时建议在插件内部引用资源、跳转页面时，请尽量使用相对路径！！！

不过有一种情况比较特殊，就是renderjs中动态引入js文件，通过查看[秋云 ucharts echarts 高性能跨全端图表组件](https://ext.dcloud.net.cn/plugin?id=271)源码进行学习，以及官方介绍可知动态引入时view 层的页面运行在www根目录，其相对路径相对于www计算，此时引入应该从./uni_modules开始，若是H5版，还支持网络引入js。如下：
```javascript
// #ifdef APP-VUE
script.src = './uni_modules/qiun-data-charts/static/app-plus/echarts.min.js'
// #endif
// #ifdef H5
const rooturl = window.location.origin 
const directory = instance.getDataset().directory
script.src = rooturl + directory + 'uni_modules/qiun-data-charts/static/h5/echarts.min.js'
// #endif
```

### 3.renderjs基本使用
    
普通script工作在逻辑层，而renderjs工作在视图层，二者如何交换数据和调用方法呢？

1. 普通数据通过:data-变量来将值传递给renderjs中,常见获取this.$ownerInstance.getDataset(),owner.getDatase()和instance.getDataset()等如何区分
- this.$ownerInstance和owner是指向当前视图层，从templage开始，而instance是指当前节点，都是vue对象，常见调用有getDataset、callMethod等。
- 它们的成员$el是HTMLElement，$el.children则是HTMLCollection,此时访问同普通js一样，如访问绑定数据即是dataset，而不是getDataset()
2. 动态数据通过:prop="变量",:change:prop="renderjs.getResult"传递给renderjs,change是关键字，不可改变，而prop是任意命名，只要二者一致即可监控，调用renderjs方法，方法参数是(newVal, oldVal, owner, instance)
3. renderjs可通过callMethod调用逻辑层的方法，并传递参数，逻辑层无法调用renderjs视图层方法，只用通过上面第2条来实现了
	
如何理解微信小程序wxs，APP和H5的renderjs与逻辑层关系？

1. 微信小程序的wxs和APP的renderjs与逻辑层关系一样，都是工作在不同层,通过桥接进行通信，不过renderjs在wxs基层上引入window和document等，就是普通网页能力。
2. H5的renderjs与逻辑层就工作在相同层，不需要通信，this是指向同一个对象，不需要调用callMehod等，可直接使用另一个script中属性和方法

加载和退出顺序？

加载Mouted顺序都是先renderjs，后普通script，而退出beforeDestroy则比较特殊，H5仍然是这个顺序，而APP则只有逻辑层没有renderjs层退出！！！
