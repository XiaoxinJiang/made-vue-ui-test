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
