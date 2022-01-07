<!-- help change this template to the one in https://vuetifyjs.com/en/components/cards/#weather-card -->
<!-- The edit button can replace the pop-up with the v-form -->
<template>
  <div>
   <!-- {{ this.$route.params.code}} -->
    <p>Title:{{ title }}, Year: ({{ year }})</p>
    <p>Number of players:{{ minplayers }}-{{ maxplayers }}</p>
    <p>Description: {{description}}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Game Detail",
  mounted: function() {
    this.populateFields()
  },
  data: () => ({
    title: null,
    year: null,
    minplayers: null,
    maxplayers: null
  }),
  methods: {
    async fetchData() {
      try {
        var url = 'http://127.0.0.1:8000/api/v1/game/' + this.$route.params.code + '/'
        return await axios.get(url);
      } catch (err) {
        console.log(err)
      }
    },
    async populateFields() {
      let res = (await this.fetchData()).data
      let elem = res["data"]
      this.minplayers = Math.min.apply(Math, elem.players)
      this.maxplayers = Math.max.apply(Math, elem.players)
      this.title = elem.title
      this.year = elem.year
      this.description = elem.description
    }
  }
}
</script>