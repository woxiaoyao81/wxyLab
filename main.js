import Vue from 'vue'
import App from './App'
// 通过node_modules安装
import GoEasy from 'goeasy'

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.prototype.goeasy = GoEasy.getInstance({
	host: "hangzhou.goeasy.io", //若是新加坡区域：singapore.goeasy.io
	appkey: "BC-72b4ef965516464badafb2a854558f4a",
	modules: ['pubsub'] //根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});

const app = new Vue({
	...App
});

app.$mount();
