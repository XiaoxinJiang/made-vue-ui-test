## 1、前言
由于公司需要搭建一套组件库，扩展element一些公司没有的组件，所以大佬们需要一个模板和文档描述。  
感谢[https://blog.csdn.net/github_36369819/article/details/79606380](https://blog.csdn.net/github_36369819/article/details/79606380)的帮助，由于时间这篇文章大部份基于这个上这个弄。   
技术上还是采取公司通用的vue-cli+less
## 1、基于vue-cli构建
### 1 全局构建vue-cli
### 2 使用vue-cli关键项目
使用 vue-cli 的 init 指令初始化一个名为 my-component 的项目

```
vue init webpack my-component
```
构建时脚手架会让你填写项目的一些描述和依赖，参考下面我选择的内容进行填写即可

```
# 项目名称
Project name? personal-components-library
# 项目描述
Project description? A Personal Vue.js components Library project
# 项目作者
Author? qiangdada
# 项目构建 vue 版本(选择默认项)
Vue build? standalone
# 是否下载 vue-router (后期会用到，这里选 Yes)
Install vue-router? Yes
# 是否下载 eslint (为了制定合理的开发规范，这个必填)
Use ESLint to lint your code? Yes
# 安装默认的标准 eslint 规则
Pick an ESLint preset? Standard
# 构建测试案例
Set up unit tests? Yes
# 安装 test 依赖 (选择 karma + mocha)
Pick a test runner? karma
# 构建 e2e 测试案例 (No)
Setup e2e tests with Nightwatch? No
# 项目初始化完是否安装依赖 (npm)
Should we run `npm install` for you after the project has been created? (recom
mended) npm
```
选好之后vue-cli会帮你把项目搭建好，自动进行依赖安装  
初始化项目的结构如下:

```
├── build                     webpack打包以及本地服务的文件
├── config                    不同环境的配置
├── index.html                入口html
├── node_modules              npm安装的依赖包
├── package.json              项目配置信息
├── README.md                 项目介绍
├── src                       我们的源代码
│   ├── App.vue               vue主入口文件
│   ├── assets                资源存放(如图片)
│   ├── components            可以复用的模块放在这里面
│   ├── main.js               入口js
│   ├── router                路由管理
├── static                    被copy的静态资源存放地址
├── test                      测试文档和案例
```
然后访问vue-cli提供的端口号就可以成功访问页面了
## 2、改造目录结构
首先，我们要明确本节的目的，我们需要修改目录，为了更好的开发组件库。
### 1 组件目录

```
build：这个目录主要用来存放构建相关的文件
packages： 这个目录下主要用来存放所有组件
examples：这个目录下主要用来存放组件库的展示 demo 和 文档的所有相关文件
src：这个目录主要用来管理组件的注册的主入口，工具，mixins等（对此我们需要改造初始化出来的 src 目录）
test：这个目录用来存放测试案例（继续延用初始化出来的目录）
lib：组件库打包出来后的目录
```
### 2 改造example目录
从前面我们知道，我们启动本地服务的时候，页面的的主入口文件是 index.html 。现在我们第一步就是将页面的主入口 index.html 和 main.js 挪到 examples 目录下面。examples 具体目录如下

```
├── assets                      css，图片等资源都在这
├── pages                       路由中所有的页面
├── src                         
│   ├── components              demo中可以复用的模块放在这里面
│   ├── entry.js                入口js
│   ├── index.tpl               页面入口
│   ├── App.vue                 vue主入口文件
│   ├── router.config.js        路由js
```

各个文件的修改如下
- entry.js

```
import Vue from 'vue'
import App from './App'
import router from './router.config'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```
- index.tpl

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>my-component</title>
  </head>
  <body>
    <div id="app">
    </div>
    <!-- built files will be auto injected -->
  </body>
</html>

```
- App.vue

```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

```
- router.config.js

```
import Vue from 'vue'
import Router from 'vue-router'
import hello from '../pages/hello' // 请自行去pages下面创建一个hello.vue，以方便之后的测试

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: hello
  }]
})

```
### 3 改造build打包目录
让新项目以改造的example为基础，跑起来  
- webpack.base.conf.js

```
entry: {
    // 抽离vue和vue-router模块，单独打包
    'vendor': ['vue', 'vue-router'],
    jui: './examples/src/entry.js'
},
```
- webpack.dev.conf.js

```
plugins: [
    ...
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'jui'],
      filename: 'index.html',
      template: 'examples/src/index.tpl',
      inject: true
    }),
    ...
]

```
重新运行npm run dev,启动新入口

### 4 改造src目录
src 目录主要用来存放组件的注册的主入口文件，工具方法，mixins等文件。我们从上面 examples 的目录可以知道，原先 src 中的一些文件是需要删掉的，改造后的目录如下

```
├── mixins                      mixins方法存放在这
├── utils                       一些常用辅助方法存放在这
├── index.js                    组件注册主入口
```
## 3、使用本地组件
1 在packages中创建一个hello组件，目录结构如下

```
├── packages                         
│   ├── hello
│       ├── src
│           ├── main.vue
│       ├── index.js
│   ├── index.js
```
- main.vue


```
<template>
  <div class="v-hello">
    hello {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'j-hello',
  props: {
    msg: String
  }
}
</script>

```
- src中的index.js

```
import Hello from './src/main'

Hello.install = function (Vue) {
  Vue.component(Hello.name, Hello)
}

export default Hello

```
- index.js

```
import Hello from './hello/index.js'

const components = [
  Hello
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
  Hello
}

```
- example/src/entry.js

```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.config'
import jui from '../../packages/index'
Vue.config.productionTip = false

Vue.use(jui)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```
## 4、css文件管理与打包
开始之前我们要明确几个点：
1. 对于组件库相关的css文件如何进行管理
2. 用哪种预处理器（由于公司架构原因采用less）
3. less如何进行打包，单个文件输出单个css文件
4. 当使用者引入组件库并使用时，组件的样式不能与使用者项目开发中样式冲突
### 样式目录结构
在packages文件下创建theme-default文件夹，具体目录如下
```
├── src                         
│   ├── common              存放组件公用的文件
│   ├── fonts               字体存放文件
│   ├── mixins              存放一些mixin的css文件
│   ├── index.less          主入口文件
│   ├── hello.less          对应hello组件的单一文件
├── gulpfile.js             less打包配置文件
├── package.json            相关的版本依赖
```
在 packages/theme-default/src/common 目录下创建 var.less

```
// prefix
@css-prefix: jui-;
@css-prefix-icon: jui-icon;

// color
@primary-color: #29b9b5;
@white-color: #FFFFFF;
@black-color: #000000;
@processing-color: @primary-color;

@primary-color-light-1: mix(@white-color, @primary-color, 10%);
@primary-color-light-2: mix(@white-color, @primary-color, 20%);
@primary-color-light-3: mix(@white-color, @primary-color, 30%);
@primary-color-light-4: mix(@white-color, @primary-color, 40%);
@primary-color-light-5: mix(@white-color, @primary-color, 50%);
@primary-color-light-6: mix(@white-color, @primary-color, 60%);
@primary-color-light-7: mix(@white-color, @primary-color, 70%);
@primary-color-light-8: mix(@white-color, @primary-color, 80%);
@primary-color-light-9: mix(@white-color, @primary-color, 90%);
```

在 packages/theme-default/src 目录下创建 hello.less

```
@import "common/var.less";
h2 {
  background: @primary-color-light-1;
}

```
index.less

```
@import "./hello.less";
```
gulpfile.js

```
const gulp = require('gulp')
const less = require('gulp-less')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')

// function compile() {
//   return src('./src/*.scss')
//     .pipe(sass.sync())
//     .pipe(autoprefixer({
//       browsers: ['ie > 9', 'last 2 versions'],
//       cascade: false
//     }))
//     .pipe(cssmin())
//     .pipe(dest('./lib'));
// }

gulp.task('compile', function () {
  return gulp.src('./src/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie > 8']
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'))
})
gulp.task('copyfont', function () {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'))
})
// function copyfont() {
//   return src('./src/fonts/**')
//     .pipe(cssmin())
//     .pipe(dest('./lib/fonts'));
// }

gulp.task('build', ['compile', 'copyfont'])
gulp.task('watch', function () {
  gulp.watch('./src/*.less', ['compile'])
})
// exports.build = series(compile, copyfont);

```
package.json

```
{
  "name": "j-theme-chalk",
  "version": "1.0.0",
  "description": "component theme",
  "main": "lib/index.css",
  "style": "lib/index.css",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "gulp build",
    "dev": "gulp build && gulp watch"
  },
  "keywords": [
    "j-ui"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^6.0.0",
    "gulp-cssmin": "^0.2.0",
    "gulp-less": "^4.0.1"
  }
}

```





