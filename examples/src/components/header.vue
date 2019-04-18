<template>
  <header class="page-header" :style="$route.name === 'index' ? 'box-shadow:none' : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'">
    <div class="header-container">
      <router-link :to="{name: 'index'}"><img src="../../assets/logo.png" width="40"></router-link>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
