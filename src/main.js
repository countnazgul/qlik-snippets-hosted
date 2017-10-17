import Vue from 'vue';
import {Select, Option, Notification} from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueClipboards from 'vue-clipboards';

import App from './App';

Vue.use(Select);
Vue.use(Option);
Vue.prototype.$notify = Notification;
Vue.use(VueClipboards);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
