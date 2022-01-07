<template>
  <v-app id="inspire">
    <!-- top bar -->
    <v-app-bar app>
      <v-toolbar-title>Games</v-toolbar-title>
    </v-app-bar>

    <!-- main container -->
    <v-main class="grey lighten-2">
      <v-container>

        <!-- advanced search component -->
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>Advanced Search</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field dense filled v-model="gameinfo.title" placeholder="Title"></v-text-field>

              <v-row no-gutters>
                <v-col cols="3">
                  <v-text-field dense filled v-model="gameinfo.genre" placeholder="Genre"></v-text-field>
                </v-col>
                <v-spacer vertical class="mx-4"></v-spacer>
                <v-col cols="3">
                  <v-text-field dense filled v-model="gameinfo.year" placeholder="Year"></v-text-field>
                </v-col>
                <v-spacer vertical class="mx-4"></v-spacer>
                <v-col cols="1" class="pt-3">
                  Players:
                </v-col>
                <v-col cols="1">
                  <v-select
                    v-model="gameinfo.minnumber"
                    :items="players"
                    dense
                    chips
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="0" class="pt-3 pl-10" align-content="center">
                  to
                </v-col>
                <v-col cols="1">
                  <v-select
                      v-model="gameinfo.maxnumber"
                      :items="players"
                      dense
                      chips
                      outlined
                    ></v-select>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col align="end">
                  <v-btn color="primary">Submit</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- store cards later -->
        <v-row class="mt-4">
          <v-col
            v-for="game in dummydata"
            :key="game.title"
            cols="6"
            md="2"
            class="game"
          >
            <GameCard v-bind:title="game.title" v-bind:year="game.year" v-bind:minplayers="game.minplayers" v-bind:maxplayers="game.maxplayers"></GameCard>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GameCard from '@/components/GameCard'
import dummy from '@/data/dummy'

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
    genres: [],
    players: [1,2,3,4,5,6,7,8,9,10],
    dummydata: dummy
  }),
  components: {
    GameCard
  }
};
</script>
