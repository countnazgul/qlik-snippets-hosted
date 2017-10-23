import Vue from 'vue'
import Router from 'vue-router'
import Snippets from '../components/Snippets'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:id',
      name: 'Snippets',
      component: Snippets,
      props: true
    }
  ]
})
