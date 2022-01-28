import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' //Vuex
import 'amfe-flexible'
import './style/index.less'
// 动态设置rem基准值 引入flexible

import { NavBar, Form, Field, Button } from 'vant';
import { CountDown } from 'vant';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(CountDown);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Button);
















Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
