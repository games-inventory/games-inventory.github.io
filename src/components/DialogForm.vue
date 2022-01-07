<template>
  <v-card outlined>
    <v-card-title>
      Add a game
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
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
      ></v-text-field>

      <v-text-field
        v-model="desc"
        :rules="descRules"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="minplayers"
        :rules="minRules"
        label="Min Number of Players"
        required
      ></v-text-field>

      <v-text-field
        v-model="maxplayers"
        :rules="maxRules"
        label="Max Number of Players"
        required
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
  export default {
    data: () => ({
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
      ],
      year: '',
      yearRules: [
        v => !!v || 'Year is required',
        v => /^[1-9]\d{3,}$/.test(v) || 'Year must be from 1000',
      ],
      desc: '',
      descRules: [
        v => !!v || 'Description is required',
      ],
      minplayers: '',
      minRules: [
        v => !!v || 'Min number is required',
        v => /^[1-9]\d*$/.test(v) || 'Number of players must be valid and at least 1'
      ],
      maxplayers: '',
      maxRules: [
        v => !!v || 'Max number is required',
        v => /^[1-9]\d*$/.test(v) || 'Number of players must be valid and at least 1',
      ],
    }),

    methods: {
      submit () {
        const isValid = this.$refs.form.validate()
        // axios call if valid
        if (isValid) {
          // axios call
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