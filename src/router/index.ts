import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { store } from "@/store";
import HomeView from "../views/HomeView.vue";
import ChallengesView from "../views/ChallengesView.vue";
import ChallengeView from "../views/ChallengeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import Missions from "../components/Challenge/Missions.vue"
import Participants from "../components/Challenge/Participants.vue"
import Leaderboard from "../components/Challenge/Leaderboard.vue"
import jwtDecode from "jwt-decode";
import { IDecodedToken } from "@/types/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/challenges",
    name: "challenges",
    component: ChallengesView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      noUser: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      noUser: true,
    },
  },
  {
    path: "/challenges",
    name: "challenge",
    component: ChallengesView
  },
  {
    path: "/challenge/:id",
    name: "challenge",
    component: ChallengeView,
    children: [
      {
        path: "missions",
        component: Missions,
      },
      {
        path: "participants",
        component: Participants
      },
      {
        path: "leaderboard",
        component: Leaderboard
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");

  if (to.meta.noUser) {
    if (token) {
      const decodedToken: IDecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return "/";
      }
    }
  }
  return true;
});

export default router;
