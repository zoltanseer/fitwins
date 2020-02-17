import { firestoreAction } from "vuexfire";
import { db } from "@/db";
import moment from "moment";
import * as types from "@/store/types";

const state = {
  feed: []
};

const getters = {
  [types.FEED]: state => state.feed,
  [types.USER_FEED]: state => state.userFeed,
  [types.GET_USER_CHART_DATA]: state => payload => {
    let data = [],
      labels = [],
      percentage = [];

    let userFeed = state.feed.filter(item => {
      return item.uid === payload;
    });

    userFeed.reverse().forEach(elem => {
      let date = moment(elem.timestamp).format("MMM DD");
      if (labels.indexOf(date) === -1) {
        labels.push(date);
        data.push(elem.weight);
        percentage.push(elem.percentage * -1);
      } else {
        let dataIndex = data.indexOf(elem.weight);
        data[dataIndex] = elem.weight;
        let percentageIndex = percentage.indexOf(percentage);
        percentage[percentageIndex] = elem.percentage * -1;
      }
    });

    return {
      labels,
      datasets: [
        {
          label: "Eredmény (kg)",
          data,
          backgroundColor: "rgba(187,222,251,0.4)",
          borderColor: "#2196F3",
          pointBackgroundColor: "#fff",
          pointBorderColor: "#2196F3"
        },
        {
          label: "Eredmény (%)",
          data: percentage,
          backgroundColor: "rgba(178,223,219,0.4)",
          borderColor: "#009688",
          pointBackgroundColor: "#fff",
          pointBorderColor: "#009688",
          hidden: true
        }
      ]
    };
  }
};

const mutations = {
  [types.SET_USER_FEED]: (state, payload) => {
    state.userFeed = payload;
  }
};

const actions = {
  [types.CREATE_POST]: firestoreAction(({ bindFirestoreRef }, payload) => {
    bindFirestoreRef(
      "feed",
      db.collection("feed").orderBy("timestamp", "desc")
    );
    db.collection("feed").add(payload);
  }),

  [types.FETCH_FEED]: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef(
      "feed",
      db.collection("feed").orderBy("timestamp", "desc")
    );
  })
};

export default {
  state,
  mutations,
  actions,
  getters
};
