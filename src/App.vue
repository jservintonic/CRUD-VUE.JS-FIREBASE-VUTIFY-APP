<template>
  <v-app>

    <v-app-bar
    app
    color="white"
    flat
    >



    </v-app-bar>
   

    <v-main>

    <v-container >

      <router-view />

    </v-container>

    </v-main>

  </v-app>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState(['isAuthenticated'])
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>


