import { IChallenge, IMission } from "@/types/user";
import axios from "axios";
import { ref } from "vue";
import jwt_decode from "jwt-decode";

export const getMissions = () => {
  const missions = ref<IMission[]>();
  const isLoading = ref(false);
  const errorMessage = ref<string>("");
  const token = localStorage.getItem("token");

  const fetchDatas = async (challenge_id: string | string[]) => {
    isLoading.value = true;
    if (!token) {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/mission/getMissionsChallenge?challenge_id=${challenge_id}`
        );
        missions.value = res.data;
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        errorMessage.value = "Un probleme est survenu";
      }
    }
    if (token) {
      const decodedToken: any = jwt_decode(token);
      try {
        console.log("fetch datas")
        const res = await axios.get(
          `http://localhost:8000/api/mission/getMissionChallengerConnected?user_id=${decodedToken.id}&challenge_id=${challenge_id}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        missions.value = res.data;
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        errorMessage.value = "Un probleme est survenu";
      }
    }
  };
  return { missions, fetchDatas, isLoading, errorMessage };
};
