import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import {
  Select,
  Option,
  Notification,
  Col,
  Row,
  // Dialog,
  // Button,
  Table,
  TableColumn  
  //MessageBox
}
from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueClipboards from 'vue-clipboards';
import router from './router';
Vue.use(router);
Vue.use(VueAnalytics, {
  id: 'UA-108541744-1',
  router
});


import App from './App';


Vue.use(Select);
Vue.use(Option);
Vue.use(Col);
Vue.use(Row);
// Vue.use(Dialog);
// Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$notify = Notification;
// Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(VueClipboards);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
