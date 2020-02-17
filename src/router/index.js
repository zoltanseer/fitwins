import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Auth/Login";
import Profile from "@/components/Profile";
import PublicProfile from "@/components/PublicProfile";
import Feed from "@/components/Feed";
import Competition from "@/components/Competition";

import AuthGuard from "./auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "profile",
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: "/profile/:id",
    name: "public_profile",
    component: PublicProfile,
    beforeEnter: AuthGuard
  },
  {
    path: "/competition",
    name: "competition",
    component: Competition,
    beforeEnter: AuthGuard
  },
  {
    path: "/feed",
    name: "feed",
    component: Feed,
    beforeEnter: AuthGuard
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
