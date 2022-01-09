<template>
  <v-card outlined>
    <v-card-title>
      {{ isEdit ? "Edit a game" : "Add a game" }}
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      class="ma-5"
    >
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="year"
        :rules="yearRules"
        label="Year"
        required
        type="number"
        hide-spin-buttons
      ></v-text-field>

      <v-textarea
        v-model="desc"
        :rules="descRules"
        label="Description"
        outlined
      ></v-textarea>

      <v-text-field
        v-model="minplayers"
        :rules="minRules"
        label="Min Number of Players"
        required
        type="number"
        hide-spin-buttons
      ></v-text-field>

      <v-text-field
        v-model="maxplayers"
        :rules="maxRules"
        label="Max Number of Players"
        required
        type="number"
        hide-spin-buttons
      ></v-text-field>

      <v-card-actions>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="submit"
        >
          Submit
        </v-btn>

        <v-btn
          color="warning"
          class="mr-4"
          @click="clear"
        >
          Reset
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="close"
        >
          Cancel
        </v-btn>
    </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  import axios from 'axios';
  export default {
    props: {
      isEdit: { default: false, type: Boolean },
    },

    data() {
      return {
        valid: true,
        title: '',
        titleRules: [
          v => !!v || 'Title is required',
        ],
        year: null,
        yearRules: [
          v => !!v || 'Year is required',
          v => v >= 1000 || 'Year must be from 1000',
        ],
        desc: '',
        descRules: [
          v => !!v || 'Description is required',
        ],
        minplayers: null,
        minRules: [
          v => !!v || 'Min number is required',
          v => v >= 1 || 'Number of players must be valid and at least 1'
        ],
        maxplayers: null,
        maxRules: [
          v => !!v || 'Max number is required',
          v => (v >= 1) || 'Number of players must be valid and at least 1',
          v => (v >= this.minplayers) || 'Max must be at least the min'
        ],
      }
    },

    computed: {
      range(start, end) {
        if (start > end) {
          return [-1, -1] // placeholder for invalid
        } else {
          return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
      }
    },

    methods: {
      async addHelper() {
        try {
          const url = 'http://127.0.0.1:8000/api/v1/game/create/'
          const data = { title: this.title, year: parseInt(this.year), description: this.desc, players: this.range(parseInt(this.minplayers), parseInt(this.maxplayers)) }
          return await axios.post(url, data);
        } catch (err) {
          console.log(err)
        }
      },
      submit () { // should be async later
        const isValid = this.$refs.form.validate()
        // axios call if valid
        if (isValid) {
          // axios call depending on edit or not
          if (this.isEdit) {
            // edit
          } else {
            console.log(this.addHelper())
          }
          this.$emit("close-dialog")
        }
        this.$refs.form.reset()
      },
      clear () {
        this.$refs.form.reset()
      },
      close () {
        this.$emit("close-dialog")
      }
    },
  }
</script>