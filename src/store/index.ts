import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { IMission, IUser, IModal } from "@/types/user";
import axios from "axios";
import jwt_decode from "jwt-decode";

export interface State {
  user: IUser | null;
  menu: {
    isOpen: boolean;
  };
  modal?: IModal;
  isAppStarting: boolean;
  challenge: {
    scores: {
      totalScore: number;
      daylyScore: number;
    };
    isParticipating: boolean;
    missions: IMission[];
    participateToday: boolean;
  };
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    user: null,
    menu: {
      isOpen: false,
    },
    isAppStarting: true,
    challenge: {
      isParticipating: false,
      scores: {
        totalScore: 0,
        daylyScore: 0,
      },
      participateToday: false,
      missions: [],
    },
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    toggleMenu(state) {
      state.menu.isOpen = !state.menu.isOpen;
    },
    logOut(state) {
      localStorage.removeItem("token");
      state.user = null;
    },
    setIsAppStarting(state, payload) {
      state.isAppStarting = payload;
    },
    updateScore(state) {
      let sum = 0;
      state.challenge.missions.forEach((mission: IMission) => {
        if (mission.score) {
          sum += mission.score;
        }
      });
      state.challenge.scores.daylyScore = sum;
    },
    setMissions(state, payload) {
      state.challenge.missions = payload;
    },
    updateMission(state, { mission_id, by }) {
      state.challenge.missions[mission_id - 1].iteration += by;
      state.challenge.missions[mission_id - 1].score =
        state.challenge.missions[mission_id - 1].iteration *
        state.challenge.missions[mission_id - 1].points;
      state.challenge.scores.totalScore +=
        by * state.challenge.missions[mission_id - 1].points;
      store.commit("updateScore");
    },
    resetMissionState(state) {
      state.challenge = {
        isParticipating: state.challenge.isParticipating,
        scores: {
          totalScore: state.challenge.scores.totalScore,
          daylyScore: state.challenge.scores.daylyScore,
        },
        participateToday: false,
        missions: [],
      };
    },
    setModal(state, payload) {
      state.modal = payload;
    },
    closeModal(state) {
      state.modal = undefined;
    },
  },
  actions: {
    async fetchMissions(context, payload) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwt_decode(token);
        try {
          const res = await axios.get(
            `http://localhost:8000/api/mission/getMissionChallengerConnected?user_id=${decodedToken.id}&challenge_id=${payload}`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );

          context.state.challenge.participateToday = res.data.participate;
          context.commit("setMissions", res.data.missions);
        } catch (error) {
          try {
            const res = await axios.get(
              `http://localhost:8000/api/mission/getMissionsChallenge?challenge_id=${payload}`
            );
            context.commit("setMissions", res.data);
          } catch (error) {
            console.log("Un probleme est survenu");
          }
        }
      }
    },
    async scoreForChallenge(context, payload) {
      const user_id = context.state.user?.user_id;
      const score = context.state.challenge.missions;
      const fomatedData = score.map((item) => ({
        points: item.score,
        iteration: item.iteration,
        mission_id: item.id,
        challenge_id: parseInt(payload),
        user_id: user_id,
      }));
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.post(
            `http://localhost:8000/api/score/createScore`,
            fomatedData,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    async updateScoreForChallenge(context, payload) {
      const user_id = context.state.user?.user_id;
      const score = context.state.challenge.missions;
      const token = localStorage.getItem("token");

      const fomatedData = score.map((item) => ({
        score_points: item.score,
        score_iteration: item.iteration,
        mission_id: item.id,
        user_id: user_id,
      }));

      console.log("update", score);

      if (token) {
        try {
          const res = await axios.put(
            `http://localhost:8000/api/score/updateScore`,
            fomatedData,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    async fetchChallengeStateOfUser(context, { challenge_id, user_id }) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/challenge/getChallengeStateOfUser?user_id=${user_id}&challenge_id=${challenge_id}`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
          console.log(res.data);
          context.state.challenge.scores = res.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async partcipateToChallenge(context, { challenge_id, user_id }) {
      console.log(challenge_id, user_id);
      const token = localStorage.getItem("token");

      try {
        const res = await axios.post(
          `http://localhost:8000/api/challenge/createChallengeParticipant`,
          {user_id, challenge_id},
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        context.state.challenge.isParticipating = true
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {},
});
