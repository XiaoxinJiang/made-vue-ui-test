import Hello from './hello/index.js'
import Row from './row/index.js'

const components = [
  Hello,
  Row
]

// 定义install方法，接受vue作为参数，如果使用use注册插件，则所有的组件都被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return false
  // 遍历组件使其全局注册组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否时直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Hello,
  Row
}
