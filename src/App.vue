<template>
  <v-app>
    <v-app-bar app color="blue darken-3" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="./assets/icon.png"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title>Döngő léptek</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-menu bottom left v-if="user">
        <template v-slot:activator="{ on }">
          <v-avatar v-on="on">
            <img :src="user.photoUrl" />
          </v-avatar>
        </template>

        <v-list>
          <v-list-item @click="logOut">
            <v-list-item-title>Kijelentkezés</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation app grow color="blue darken-2" v-if="user">
      <v-btn :to="{ name: 'profile' }" exact>
        <span>Profil</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'competition' }">
        <span>Verseny</span>
        <v-icon>mdi-medal</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'feed' }">
        <span>Események</span>
        <v-icon>mdi-post</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import * as types from "@/store/types";
export default {
  name: "App",
  data: () => ({}),

  computed: {
    user() {
      return this.$store.getters[types.USER];
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch(types.SIGN_OUT);
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>
