<template>
  <v-container fluid style="height: 100%;padding: 0">
    <v-row style="height: 100%;">
      <v-col cols="12" style="height: 100%; padding: 0">
        <v-row
          align="center"
          justify="center"
          class="grey lighten-5"
          style="height: 100%;"
        >
          <v-btn
            x-large
            outlined
            :disabled="loading"
            :loading="loading"
            color="blue darken-2"
            @click="onSigninFacebook"
            ><v-icon left>mdi-facebook</v-icon>Bejelentkezés</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/types";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: types.USER,
      error: types.ERROR,
      loading: types.LOADING
    })
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push({ name: "profile" });
      }
    }
  },
  methods: {
    ...mapActions({
      onSigninFacebook: types.SIGN_IN
    })
  }
};
</script>

<style></style>
