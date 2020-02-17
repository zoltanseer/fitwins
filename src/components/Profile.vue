<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card color="blue darken-4" dark class="mx-auto" max-width="400">
          <v-card-title class="headline mb-1">Üdv {{ user.name }}</v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <h4 class="title">Súlyod a verseny kezdetén:</h4>
            <v-row>
              <v-col :class="user.weightOnStart ? 'display-2' : ''" cols="12">
                {{
                  user.weightOnStart
                    ? user.weightOnStart + " kg"
                    : "Add meg a kezdeti súlyod"
                }}
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="indigo lighten-1"
                  v-if="!user.weightOnStart"
                  @click="openDialog(true)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <h4 class="title">Jelenlegi súlyod:</h4>
            <v-row>
              <v-col
                :class="user.currentWeight ? 'display-2' : ''"
                cols="12"
                @click="openDialog(false)"
              >
                {{
                  user.currentWeight
                    ? user.currentWeight + " kg"
                    : "Add meg a jelenlegi súlyod"
                }}
                <v-btn class="mx-2" fab dark small color="indigo lighten-1">
                  <v-icon>mdi-scale-bathroom</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <h4 class="title" v-if="user.percentage">
              Eddig {{ loss ? "fogytál" : "híztál" }}:
            </h4>
            <v-row v-if="user.percentage">
              <v-col class="display-2" cols="12">
                <v-icon large v-if="loss">mdi-minus</v-icon>
                <v-icon large v-else>mdi-plus</v-icon>
                {{ Math.abs(user.percentage) }} % {{ loss ? "👍" : "😬" }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card color="grey lighten-3" class="mx-auto mt-5" max-width="400">
          <v-card-title class="headline mb-1">Statisztika</v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <Chart :options="options" :chartdata="chartData(user.id)" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">{{ dialogTitle }}</v-card-title>

        <v-card-text>
          <v-text-field v-model.trim.number="weight" type="number">
            <span slot="append">kg</span>
          </v-text-field>
          <input type="text" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="saveDialog">Mentés</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as types from "@/store/types";
import Chart from "./Chart";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      weight: null,
      dialog: false,
      dialogForFirstWeight: false,
      dialogTitle: "",
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  components: {
    Chart
  },

  computed: {
    loss() {
      return this.user.currentWeight < this.user.weightOnStart;
    },
    ...mapGetters({
      user: types.USER,
      chartData: types.GET_USER_CHART_DATA
    })
  },

  watch: {
    chartData(newValue) {
      this.chartData = newValue;
    }
  },

  methods: {
    openDialog(start) {
      this.dialogForFirstWeight = start;

      if (start) {
        if (this.user.weightOnStart) {
          this.weight = this.user.weightOnStart;
        }
        this.dialogTitle = "Súlyod a verseny kezdetén";
      } else {
        if (this.user.currentWeight) {
          this.weight = this.user.currentWeight;
        }
        this.dialogTitle = "Jelenlegi súlyod";
      }

      this.dialog = true;
    },

    saveDialog() {
      if (this.dialogForFirstWeight) {
        this.$store.dispatch(types.SET_WEIGHT_ON_START, {
          weightOnStart: this.weight
        });
      } else {
        this.$store.dispatch(types.UPDATE_CURRENT_WEIGHT, {
          currentWeight: this.weight
        });
      }

      this.dialog = false;
    }
  }
};
</script>

<style>
.theme--dark.v-card > .v-card__text,
.theme--dark.v-card .v-card__subtitle {
  color: #fff !important;
}

.v-dialog .v-card__title.headline {
  white-space: nowrap;
}
</style>
