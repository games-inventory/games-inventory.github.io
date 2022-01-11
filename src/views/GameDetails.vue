<template>
<v-app id="gamedetails">
  <v-container>
    <v-card
      class="ma-auto"
      max-width="600"
      color="#1565C0"
      dark
    >
      <v-card-title>
        <v-icon
          large
          left
        >
          mdi-gamepad-variant
        </v-icon>
        <span class="text-h6 font-weight-medium">{{ title }} {{!!year ? `(${year})` : ""}}</span>
      </v-card-title>

      <v-card-text class="text-h5 font-weight-light">
        {{ description }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-icon>
            <v-dialog persistent v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab small color="#4CAF50" v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <!-- input validation card -->
              <DialogForm 
                @close-dialog="closeDialog" 
                :isEdit="true"
                :gameDetails="getDetails"
              >
              </DialogForm>
          </v-dialog>
          </v-list-item-icon>
          
          <v-list-item-icon>
            <v-btn
              fab
              color="#C62828"
              small
              @click="deleteHandler"
            >
              <v-icon dark>
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1">
              mdi-account
            </v-icon>
            <span class="subheading mr-1">{{ minPlayers }}</span>
            <span class="mr-1">to</span>
            <span class="subheading"> {{ maxPlayers }}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</v-app>
</template>

<script>
import DialogForm from '@/components/DialogForm'
import axios from 'axios';

export default {
  name: "GameDetails",

  mounted: function() {
    this.populateFields()
  },

  data: () => ({
    dialog: false,
    title: null,
    year: null,
    minPlayers: null,
    maxPlayers: null,
    description: null,
    id: null
  }),

  components: {
    DialogForm
  },

  computed: {
    getDetails() {
      return {
        "title": this.title,
        "year": this.year,
        "minPlayers": this.minPlayers,
        "maxPlayers": this.maxPlayers,
        "desc": this.description,
        "id": this.id
      }
    }
  },

  methods: {
    async deleteHandler() {
      try {
        const url = 'http://127.0.0.1:8000/api/v1/game/' + this.id + '/delete/'
        return await axios.post(url)
      } catch (err) {
        console.log(err)
      }
      this.$router.go(-1)
    },
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
      this.minPlayers = Math.min.apply(Math, elem.players)
      this.maxPlayers = Math.max.apply(Math, elem.players)
      this.title = elem.title
      this.year = elem.year
      this.description = elem.description
      this.id = elem.id
    },
    closeDialog() {
      this.dialog = false
    }
  },
}
</script>