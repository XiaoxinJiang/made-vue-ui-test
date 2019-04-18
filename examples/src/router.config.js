// import Vue from 'vue'
// import Router from 'vue-router'
// import hello from '../pages/hello' // 请自行去pages下面创建一个hello.vue，以方便之后的测试

// Vue.use(Router)

// export default new Router({
//   routes: [{
//     path: '/',
//     component: hello
//   }]
// })

import Vue from 'vue'
import Router from 'vue-router'
import navConf from '../common/menuConfig'

Vue.use(Router)

let routes = []

Object.keys(navConf).forEach((header) => {
  routes = routes.concat(navConf[header])
})

let addComponent = (router) => {
  router.forEach((route) => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (route.type === 'pages') {
        route.component = r => require.ensure([], () =>
          r(require(`../pages/${route.name}.vue`)))
        return false
      } else {
        route.component = r => require.ensure([], () => r(require(`../docs/${route.name}.md`)))
      }
    }
  })
}

addComponent(routes)
routes.push({
  path: '/hello',
  component: r => require.ensure([], () => r(require('../docs/hello.md')))
  // component: require('../docs/hello.md')
})
console.log(JSON.parse(JSON.stringify(routes)), 'ffrr')

export default new Router({
  routes: routes
})
