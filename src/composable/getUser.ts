import { key } from "@/store";
import { computed } from "vue";
import { useStore } from "vuex";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const getUser = () => {
  const store = useStore(key);
  const token = localStorage.getItem("token");
  const isAppStarting = computed(() => store.state.isAppStarting);
  if (token) {
    const decodedToken: any = jwt_decode(token);
    axios
      .get(
        `http://localhost:8000/api/user/getUserInfos?id=${decodedToken.id}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        if (!store.state.user) {
          store.commit("setUser", res.data);
          store.commit("setIsAppStarting", false);
        }
      })
      .catch(err => {
        if (err) {
          store.commit("setIsAppStarting", false);
        }
      })
  } else {
    setTimeout(() => {
      store.commit("setIsAppStarting", false);
    }, 2000);
  }

  return { isAppStarting };
};
