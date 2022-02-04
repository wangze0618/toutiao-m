import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' //Vuex
import 'amfe-flexible'
import './style/index.less'
// 动态设置rem基准值 引入flexible

import './utils/dayjs'
import { Tab, Tabs, NavBar, Form, Field, Button, List, Toast, Icon, Divider, Loading } from 'vant';
import { CountDown } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Grid, GridItem, Cell, CellGroup, Search } from 'vant';
import { Dialog, PullRefresh } from 'vant'
import { Popup } from 'vant';

Vue.use(Icon)
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(CellGroup);
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(CountDown);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Loading);
















Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
