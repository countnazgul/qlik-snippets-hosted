import Vue from 'vue';
import Router from 'vue-router';
import UI from '../components/UI';
import Rest from '../components/Rest';
import Documentation from '../components/Documentation';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: UI,
      props: false
    },    
    {
      path: '/snippet/:id',
      name: 'Snippets',
      component: UI,
      props: false
    },
    {
      path: '/api/:id',
      name: 'Rest',
      component: Rest,
      props: false
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: Documentation,
      props: false
    }    
  ]
});
