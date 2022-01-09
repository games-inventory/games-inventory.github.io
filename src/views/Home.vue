<template>
  <v-app id="inspire">

    <v-app-bar app>
      <!-- dialog (creation) -->
      <v-dialog persistent v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <!-- input validation card -->
        <DialogForm @close-dialog="closeDialog"></DialogForm>
      </v-dialog>

      <v-toolbar-title class="pl-5">Games</v-toolbar-title>
    </v-app-bar>

    <!-- main container -->
    <v-main class="grey lighten-2">
      <v-container>

        <AdvancedSearch></AdvancedSearch>

        <!-- generate cards -->
        <v-row class="mt-4">
          <v-col
            v-for="game in gamesData"
            :key="game.title"
            cols="6"
            md="2"
            class="game"
          >
            <GameCard v-bind:title="game.title" v-bind:year="game.year" v-bind:minPlayers="game.minPlayers" v-bind:maxPlayers="game.maxPlayers" v-bind:id="game.id"></GameCard>
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
      minPlayers: null,
      maxPlayers: null
    },
    dialog: false,
    gamesData: null,
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
      if (this.gameinfo.minPlayers && this.gameinfo.maxPlayers) {
        params["players"] = this.range(this.gameinfo.minPlayers, this.gameinfo.maxPlayers);
      } else if (this.gameinfo.minPlayers) {
        params["players"] = [this.gameinfo.minPlayers]
      } else if (this.gameinfo.minPlayers) {
        params["players"] = [this.gameinfo.maxPlayers]
      }
      try {
        let res = (await this.fetchData(params)).data
        res = res["data"]
        const res2 = []
        for (var i = 0; i < (await res).length; i++) {
          const elem = res[i]
          console.log(elem.players)
          const minPlayers = Math.min.apply(Math, elem.players)
          const maxPlayers = Math.max.apply(Math, elem.players)
          const gameId = elem.id
          res2.push({"title": elem.title, "year": elem.year, "minPlayers": minPlayers, "maxPlayers": maxPlayers, "id": gameId})
        }
        this.gamesData = res2
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
