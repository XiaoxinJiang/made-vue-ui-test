// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.config'
import codeBlock from './components/code.vue'
import jui from '../../packages/index'
import '../../packages/theme-default/lib/index.css'
import '../style/index.less'
Vue.config.productionTip = false

Vue.component('code-block', codeBlock)
Vue.use(jui)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
