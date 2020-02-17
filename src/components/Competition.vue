<template>
  <div>
    <v-list subheader>
      <v-subheader>Verseny</v-subheader>
      <template v-for="(user, index) in users">
        <v-list-item
          @click="profile(user.id)"
          :key="user.id"
          :class="[index === 0 ? 'teal lighten-5' : '' ]"
        >
          <v-list-item-avatar>
            <v-img :src="user.photoUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text
              :class="textClass(user.percentage)"
              class="percentage-text"
              v-text="
              plusOrMinus(user.percentage) +
                Math.abs(user.percentage) +
                '%'
            "
            ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="index + 1 < users.length" :key="index"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import * as types from "@/store/types";
import { mapGetters } from "vuex";
export default {
  name: "Competition",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      users: types.USERS
    })
  },
  created() {
    this.$store.dispatch(types.FETCH_USERS);
  },
  methods: {
    textClass(perc) {
      let ret = "";
      if (perc < 0) {
        ret = "red--text";
      }
      if (perc > 0) {
        ret = "green--text";
      }
      return ret;
    },
    plusOrMinus(perc) {
      let ret = "";
      if (perc < 0) {
        ret = "-";
      }
      if (perc > 0) {
        ret = "+";
      }
      return ret;
    }
  }
};
</script>

<style>
.v-list-item__title {
  font-size: 1.6em;
}
.percentage-text {
  font-size: 1.8em;
}
</style>
