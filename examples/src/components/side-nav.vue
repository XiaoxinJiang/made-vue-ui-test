<template>
  <div class="side-nav">
    <div v-for="title in (Object.keys(data))" class="group-container">
      <p class="side-nav-title">{{title}}</p>
      <div class="side-nav-items" v-for="nav in data[title]" v-if="nav.desc">
        <router-link :class="$route.name===nav.name ? 'active' : ''" v-if="nav.name" :to="{name: nav.name}">{{nav.desc}}</router-link>
        <p v-else class="side-nav-group">{{nav.desc}}</p>
        <div v-for="item in nav.items">
          <router-link :to="{name: item.name}" :class="$route.name===item.name ? 'active' : ''" class="slid-nav-component">{{item.desc}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navConf from '../../common/menuConfig'
export default {
  data () {
    return {
      data: navConf
    }
  }
}
</script>
