import { IChallenge } from "@/types/user";
import axios from "axios";
import { ref } from "vue";

export const getChallenge = () => {

  const challenge = ref<IChallenge>();
  const isLoading = ref(false);
  const errorMessage = ref<string>("");

  const fetchDatas = async (challenge_id: string | string[]) => {
    isLoading.value = true;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/challenge/getChallenge?id=${challenge_id}`
      );
      challenge.value = res.data;
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      errorMessage.value = "Un probleme est survenu";
    }
  };
  return { challenge, fetchDatas, isLoading, errorMessage };
};
