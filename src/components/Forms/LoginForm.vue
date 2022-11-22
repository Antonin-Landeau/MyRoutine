<template>
  <form>
    <div class="px-5 mt-10 mx-auto max-w-sm">
      <div class="flex flex-col my-4">
        <label class="text-gray-600 text-left font-bold text-sm">Email</label>
        <input
          class="border-b border-green-400 py-2 outline-none text-lg text-gray-400"
          type="email"
          v-model="email"
        />
      </div>
      <div class="flex flex-col my-4">
        <label class="text-gray-600 text-left font-bold text-sm"
          >Password</label
        >
        <input
          class="border-b border-green-400 py-2 outline-none text-lg text-gray-400"
          type="password"
          v-model="password"
        />
      </div>
    </div>
    <p class="text-red-400 font-semibold text-sm" v-if="errorMessage">{{errorMessage}}</p>
    <div v-if="loading">Loading...</div>
  </form>
  <div
    class="fixed flex bottom-8 left-1/2 -translate-x-1/2 w-full justify-around"
  >
    <button
      class="text-gray-600 text-center font-bold text-lg"
      @click="handleSubmit"
    >
      Connexion
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { key } from "@/store";
import jwt_decode from "jwt-decode";

export default defineComponent({
  name: "LoginForm",
  components: {},
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const loading = ref(false);

    const store = useStore(key);
    const router = useRouter();

    

    const handleSubmit = () => {
      if (!email.value || ! password.value) {
        return errorMessage.value = "Veuillez renseigner tout les champs."
      }
      loading.value = true;
      axios
        .post("http://localhost:8000/api/user/login", {
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          const decodedToken: any = jwt_decode(res.data.token);
          axios
            .get(
              `http://localhost:8000/api/user/getUserInfos?id=${decodedToken.id}`,
              {
                headers: {
                  Authorization: `token ${res.data.token}`,
                },
              }
            )
            .then((res) => {
              if (!store.state.user) {
                store.commit("setUser", res.data);
              }
            });
          loading.value = false;
          router.push("/");
        })
        .catch((err) => {
          loading.value= false;
          errorMessage.value= "Email ou mot de passe incorecte."
        });
    };
    return {
      handleSubmit,
      loading,
      errorMessage,
      email,
      password,
    };
  },
});
</script>
