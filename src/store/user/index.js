import * as firebase from "firebase";
import { firestoreAction } from "vuexfire";
import { db } from "@/db";

import * as types from "@/store/types";

const state = {
  user: null,
  users: []
};

const getters = {
  [types.USER]: state => state.user,
  [types.USERS]: state => state.users
};

const mutations = {
  [types.SET_USER]: (state, payload) => {
    state.user = payload;
  },

  [types.SET_USERS]: (state, payload) => {
    state.users = payload;
  },

  [types.UPDATE_USER]: (state, payload) => {
    state.user = { ...state.user, ...payload };
  }
};

const actions = {
  [types.SIGN_IN]: firestoreAction(({ bindFirestoreRef, commit, dispatch }) => {
    commit(types.SET_LOADING, true);
    commit(types.RESET_ERROR);
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(user => {
        commit(types.SET_LOADING, false);
        bindFirestoreRef(
          "user",
          db.collection("users").doc(user.user.uid)
        ).catch(error => {
          commit(types.SET_LOADING, false);
          commit(types.SET_ERROR, error);
        });
        dispatch(types.FETCH_FEED);
      });
  }),

  [types.AUTO_SIGN_IN]: firestoreAction(
    ({ bindFirestoreRef, dispatch }, payload) => {
      bindFirestoreRef("user", db.collection("users").doc(payload.uid)).then(
        document => {
          if (!document) {
            let newUser = {
              id: payload.uid,
              name: payload.displayName,
              email: payload.email,
              photoUrl: payload.photoURL,
              weightOnStart: null,
              currentWeight: null,
              percentage: null
            };
            db.collection("users")
              .doc(payload.uid)
              .set(newUser);
          }
          dispatch(types.FETCH_FEED);
        }
      );
    }
  ),

  [types.SIGN_OUT]: ({ commit }) => {
    firebase.auth().signOut();
    commit(types.SET_USER, null);
  },

  [types.SET_WEIGHT_ON_START]: firestoreAction(
    ({ state, dispatch }, payload) => {
      db.collection("users")
        .doc(state.user.id)
        .update(payload);
      let feedParams = {
        user: db.collection("users").doc(state.user.id),
        uid: state.user.id,
        timestamp: 1578261600000,
        weight: payload.weightOnStart,
        percentage: 0
      };
      dispatch(types.CREATE_POST, feedParams);
    }
  ),

  [types.UPDATE_CURRENT_WEIGHT]: firestoreAction(
    ({ state, dispatch }, payload) => {
      const percentage = calculatePercentage(
        payload.currentWeight,
        state.user.weightOnStart
      );
      db.collection("users")
        .doc(state.user.id)
        .update({ ...payload, ...percentage });
      let feedParams = {
        user: db.collection("users").doc(state.user.id),
        uid: state.user.id,
        timestamp: new Date().getTime(),
        weight: payload.currentWeight,
        percentage: percentage.percentage,
        liked_by: []
      };
      dispatch(types.CREATE_POST, feedParams);
    }
  ),

  [types.FETCH_USERS]: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef(
      "users",
      db.collection("users").orderBy("percentage", "desc")
    );
  })
};

export default {
  state,
  mutations,
  actions,
  getters
};

function calculatePercentage(current, start) {
  return {
    percentage: parseFloat((100 - (current * 100) / start).toFixed(2))
  };
}
