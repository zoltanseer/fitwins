<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <h1 class="headline font-weight-light">Események</h1>
        <v-card
          class="mx-auto mt-4"
          :class="colors[Math.floor(Math.random() * 15)]"
          dark
          max-width="400"
          v-for="(f, index) in feed"
          :key="index"
        >
          <v-card-title>
            <v-list-item-avatar left small>
              <v-img class="elevation-6" :src="f.user.photoUrl"></v-img>
            </v-list-item-avatar>
            <span class="subtitle-1 ">{{ getDate(f.timestamp) }}</span>
          </v-card-title>

          <v-card-text class="title font-weight-bold">
            {{ f.user.name }} frissítette a súlyát! <br /><br />
            <span class="title">
              {{ f.percentage === 0 ? "Súly a verseny kezdetén: " : "Jelenleg "
              }}<strong>{{ f.weight }} kg</strong></span
            >

            <span class="title" v-if="f.percentage !== 0"> és ezzel</span>
            <br />
            <span class="title" v-if="f.percentage !== 0">
              <strong>{{ Math.abs(f.percentage) }} %</strong>-ot
              {{ f.percentage > 0 ? "fogyott" : "hízott 😬" }}
            </span>
          </v-card-text>

          <!-- <v-card-actions>
            <v-list-item class="grow"> -->
          <!-- <v-list-item-content>
                <v-list-item-title>{{ f.user.name }}</v-list-item-title>
              </v-list-item-content> -->

          <!-- <v-row align="center" justify="end">
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">45</span>
              </v-row> -->
          <!-- </v-list-item>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as types from "@/store/types";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "Feed",
  data() {
    return {
      colors: [
        "blue darken-1",
        "blue darken-2",
        "blue darken-3",
        "blue darken-4",
        "indigo darken-1",
        "indigo darken-2",
        "indigo darken-3",
        "indigo darken-4",
        "deep-purple darken-1",
        "deep-purple darken-2",
        "deep-purple darken-3",
        "deep-purple darken-4",
        "teal darken-1",
        "teal darken-2",
        "teal darken-3",
        "teal darken-4"
      ]
    };
  },
  methods: {
    getDate(ts) {
      moment.locale("hu");
      return moment(ts).format("MMMM DD - HH:mm:ss");
    }
  },
  computed: {
    ...mapGetters({
      feed: types.FEED
    })
  },
  created() {}
};
</script>

<style>
.v-avatar {
  margin: 0 16px 0 0 !important;
}
</style>
