<template>
  <div>
    <p>{{ game.title }} ({{ game.year }})</p>
    <p>{{ game.minplayers }}-{{ game.maxplayers }}</p>
  </div>
</template>

<script>
  import dummy from '@/data/dummy'
  export default {
    setup() { } 
  }
</script>