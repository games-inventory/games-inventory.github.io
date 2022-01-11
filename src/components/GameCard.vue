<template>
    <v-container>
        <v-card class="mx-auto" max-width="300" @click=onclick>
            <v-card-title>
                {{ title }}
                <div class="text--secondary ml-1">({{ year }})</div>
            </v-card-title>

            <v-card-subtitle>
                {{ minPlayers }}-{{ maxPlayers }} players
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        props: {
            id: { default: -1, type: Number },
            title: { default: "", type: String },
            year: { default: 0, type: Number },
            minPlayers: { default: 0, type: Number },
            maxPlayers: { default: 0, type: Number }
        },
        methods: {
            onclick: function() { 
                this.$router.push( { path: `/game/${this.id}` } )
            }
        }
    }
</script>