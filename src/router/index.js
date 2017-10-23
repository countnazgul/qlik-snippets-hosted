import Vue from 'vue'
import Router from 'vue-router'
import UI from '../components/UI'
// import Snippet from '../components/Snippet';
import Rest from '../components/Rest'

Vue.use(Router)

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
      path: '/:id',
      name: 'Snippets',
      component: UI,
      props: false
    },
    {
      path: '/api/:id',
      name: 'Rest',
      component: Rest,
      props: false
    }    
  ]
})
