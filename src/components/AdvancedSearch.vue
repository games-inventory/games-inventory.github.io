<template>
  <v-expansion-panels class="pt-5" accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>Advanced Search</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field dense filled v-model="title" placeholder="Title"></v-text-field>

        <v-row no-gutters>
          <v-col cols="3">
            <v-text-field dense filled v-model="genre" placeholder="Genre"></v-text-field>
          </v-col>
          <v-spacer vertical class="mx-4"></v-spacer>
          <v-col cols="3">
            <v-text-field dense filled v-model="year" placeholder="Year"></v-text-field>
          </v-col>
          <v-spacer vertical class="mx-4"></v-spacer>
          <v-col cols="1" class="pt-3">
            Players:
          </v-col>
          <v-col cols="1">
            <v-select
              v-model="minnumber"
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
                v-model="maxnumber"
                :items="players"
                dense
                chips
                outlined
              ></v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col align="end">
            <v-btn color="primary" v-on:click="submitData">Submit</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      genre: null,
      year: null, 
      minnumber: null,
      maxnumber: null,
      dialog: false,
      genres: [],
      players: [1,2,3,4,5,6,7,8,9,10],
      gamesdata: null,
    }
  }, 

  methods: {
    submitData() {
      // hookup to axios
    }
  }
}
</script>