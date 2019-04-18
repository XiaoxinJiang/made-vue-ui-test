<template>
  <div  class="pg-index">
    <div class="index-container">
      <img src="../assets/logo.png">
      <p>一款轻量级、模块化的前端 UI 组件库</p>
    </div>
    <div class="index-contain">
      <div class="buttom-index">
        <router-link :to="{name: 'guid'}">开始使用</router-link>
        <!-- <a target="_blank" class="btn-github" href="https://github.com/VV-UI/VV-UI">GitHub</a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
    }
  }
}
</script>
