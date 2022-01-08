<template>
  <v-app id="inspire">
    <!-- top bar -->
    <v-app-bar app>
      <!-- dialog for creation -->
      <v-dialog persistent v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <!-- input validation card -->
        <DialogForm @close-dialog="closeDialog"></DialogForm>
      </v-dialog>
      <!-- toolbar -->
      <v-toolbar-title class="pl-5">Games</v-toolbar-title>
    </v-app-bar>

    <!-- main container -->
    <v-main class="grey lighten-2">
      <v-container>

        <AdvancedSearch></AdvancedSearch>

        <v-row class="mt-4">
          <v-col
            v-for="game in gamesdata"
            :key="game.title"
            cols="6"
            md="2"
            class="game"
          >
          <!-- TODO: setup router link -->
            <GameCard v-bind:title="game.title" v-bind:year="game.year" v-bind:minplayers="game.minplayers" v-bind:maxplayers="game.maxplayers" v-bind:id="game.id"></GameCard>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GameCard from '@/components/GameCard'
import DialogForm from '@/components/DialogForm'
import AdvancedSearch from '@/components/AdvancedSearch'

import axios from 'axios';

export default {
  name: 'Home',

  data: () => ({
    gameinfo: {
      title: '',
      genre: null,
      year: null, 
      minplayers: null,
      maxplayers: null
    },
    dialog: false,
    genres: [],
    players: [1,2,3,4,5,6,7,8,9,10],
    gamesdata: null,
  }),

  components: {
    GameCard, 
    DialogForm,
    AdvancedSearch
  },

  mounted: function() {
    this.populateField()
  },

  methods: {
    closeDialog() {
      this.dialog=false
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    async populateField() {
      const params = {}
      if (this.gameinfo.title) {
        params["title"] = this.gameinfo.title;
      }
      if (this.gameinfo.year) {
        params["year"] = this.gameinfo.year;
      }
      if (this.gameinfo.minplayers && this.gameinfo.maxplayers) {
        params["players"] = this.range(this.gameinfo.minplayers, this.gameinfo.maxplayers);
      } else if (this.gameinfo.minplayers) {
        params["players"] = [this.gameinfo.minplayers]
      } else if (this.gameinfo.minplayers) {
        params["players"] = [this.gameinfo.maxplayers]
      }
      try {
        let res = (await this.fetchData(params)).data
        res = res["data"]
        const res2 = []
        for (var i = 0; i < (await res).length; i++) {
          const elem = res[i]
          console.log(elem.players)
          const minplayers = Math.min.apply(Math, elem.players)
          const maxplayers = Math.max.apply(Math, elem.players)
          const gameId = elem.id
          res2.push({"title": elem.title, "year": elem.year, "minplayers": minplayers, "maxplayers": maxplayers, "id": gameId})
        }
        this.gamesdata = res2
      } catch (err) {
        console.log(err)
      }
    },
    async fetchData(params) {
      try {
        return await axios.get('http://127.0.0.1:8000/api/v1/game/', {params: params});
      } catch (err) {
        console.log(err)
      }
    }

  }
};
</script>
