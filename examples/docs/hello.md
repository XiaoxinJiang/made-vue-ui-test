## Hello
**Hello 组件，Hello 组件，Hello 组件，Hello 组件**
### 基本用法
<j-hello :msg="msg"></j-hello>
::: demo
```html
<template>
    <j-hello :msg="msg"></j-hello>
</template>
<script>
export default {
  data () {
    return {
      msg: '这只是一个最简单的组件展示'
    }
  }
}
</script>
```
:::
## API

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| msg | 文字展示 | String | — | - |

