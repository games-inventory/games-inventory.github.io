<template>
    <v-container>
        <v-card class="mx-auto" max-width="300" @click=onclick>
            <v-card-title>
                {{ title }}
                <div class="text--secondary ml-1">({{ year }})</div>
            </v-card-title>

            <v-card-subtitle>
                {{ minplayers }}-{{ maxplayers }} players
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        props: {
            title: { default: "", type: String },
            year: { default: 0, type: Number },
            minplayers: { default: 0, type: Number},
            maxplayers: { default: 0, type: Number}
        },
        methods: {
            onclick: function() { // expand verbose card 
            }
        }
    }
</script>