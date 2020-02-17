import store from "@/store";
import * as types from "@/store/types";

export default (to, from, next) => {
  if (store.getters[types.USER]) {
    next();
  } else {
    next({ name: "login" });
  }
};
