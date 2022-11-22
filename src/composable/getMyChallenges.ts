import { IChallenge } from "@/types/user";
import axios from "axios";
import { ref } from "vue";

export const getMyChallenges = () => {
  const token = localStorage.getItem("token");
  const challenges = ref<IChallenge[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string>("");

  const fetchDatas = async (user_id: number | undefined) => {
    isLoading.value = true;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/challenge/getUserChallenges?user_id=${user_id}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      challenges.value = res.data;
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      errorMessage.value = "Un probleme est survenu";
    }
  };
  return { challenges, fetchDatas, isLoading, errorMessage };
};
