import axios from "axios";
import { ref } from "vue";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
import { key } from "@/store";

export const isUserParticipating = () => {
  const token = localStorage.getItem("token");
  const isChallenger = ref<boolean>(false);
  const isLoading = ref(false);
  const errorMessage = ref<string>("");
  const store = useStore(key)

  const fetchIsParticipant = async (challenge_id: string | string[]) => {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      try {
        isLoading.value = true;
        const res = await axios.get(
          `http://localhost:8000/api/challenge/isParticipant?user_id=${decodedToken.id}&challenge_id=${challenge_id}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        store.state.challenge.isParticipating = res.data.isParticipant
        // isChallenger.value = res.data.isParticipant;
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        errorMessage.value = "Un probleme est survenu";
      }
    }
  };

  return { fetchIsParticipant, isLoading, errorMessage };
};
