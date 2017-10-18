import Vue from 'vue';
import {
  Select,
  Option,
  Notification,
  Col,
  Row,
  Dialog,
  Button,
  //MessageBox
}
from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueClipboards from 'vue-clipboards';

import App from './App';

Vue.use(Select);
Vue.use(Option);
Vue.use(Col);
Vue.use(Row);
Vue.use(Dialog);
Vue.use(Button);
Vue.prototype.$notify = Notification;
// Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(VueClipboards);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
