<template>
  <form>
    <div class="px-5 mt-3">
      <div class="relative w-full h-[9px] bg-gray-300 rounded">
        <div
          class="absolute h-[9px] bg-green-default transition-all duration-700 ease-out rounded"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

    <div class="px-5 mt-10 max-w-sm mx-auto">
      <div v-if="currentStep === 1">
        <Input v-model="lastname" type="text" label="Nom" />
        <Input v-model="firstname" type="text" label="Prenom" />
        <Input v-model="birthDate" type="date" label="Date de naissance" />
        <Input v-model="pseudo" type="string" label="Pseudo" />
      </div>
      <div v-if="currentStep === 2">
        <Input v-model="email" type="email" label="Email" />
        <Input v-model="password" type="password" label="Mot de passe" />
        <Input
          v-model="confirmPassword"
          type="password"
          label="Confirme mot de pass"
        />
      </div>
      <div v-if="currentStep === 3">
        <div class="flex flex-col my-4">
          <label class="text-gray-600 text-left font-bold text-sm"
            >Photo de profile</label
          >
          <input
            type="file"
            class="border-b border-green-400 py-2 outline-none text-lg text-gray-400"
            @change="onFilePicked"
          />
        </div>
        <div class="flex flex-col my-4">
          <label class="text-gray-600 text-left font-bold text-sm"
            >Choose a color</label
          >
          <ColorPicker :selected-color="colorProfile" @changeColor="setColor" />
        </div>
      </div>
    </div>
  </form>
  <div
    class="fixed flex bottom-8 left-1/2 -translate-x-1/2 w-full justify-around max-w-sm"
  >
    <button
      v-if="currentStep > 1"
      @click="prevStep"
      class="px-2 py-1 bg-green-300 rounded-lg text-lg border-2 border-green-300 text-white font-semibold"
    >
      Précédent
    </button>
    <button
      v-if="currentStep < 3"
      @click="nextStep"
      class="px-2 py-1 bg-green-300 rounded-lg text-lg border-2 border-green-300 text-white font-semibold"
    >
      Suivant
    </button>
    <button
      class="text-gray-600 text-center font-bold text-lg"
      @click="handleSubmit"
      v-if="currentStep === 3"
    >
      S'inscrire
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Input from "../library/Input.vue";
import ColorPicker from "../library/ColorPicker.vue";
import jwt_decode from "jwt-decode";

import axios from "axios";
import { useStore } from "vuex";
import { key } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterForm",
  components: {
    Input,
    ColorPicker,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();
    const steps = ref(3);
    const currentStep = ref(1);

    const progress = computed(() => {
      return (currentStep.value / steps.value) * 100;
    });

    const firstname = ref("");
    const lastname = ref("");
    const pseudo = ref("");
    const birthDate = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const avatar = ref("");
    const colorProfile = ref("#00FF00");

    const nextStep = () => {
      currentStep.value = currentStep.value + 1;
    };
    const prevStep = () => {
      currentStep.value = currentStep.value - 1;
    };

    const handleSubmit = () => {
      let data = new FormData();

      data.append("email", email.value);
      data.append("password", password.value);
      data.append("confirmPassword", confirmPassword.value);
      data.append("firstName", firstname.value);
      data.append("lastName", lastname.value);
      data.append("pseudo", pseudo.value);
      data.append("color", colorProfile.value);
      data.append("birthDate", birthDate.value);
      data.append("avatar", avatar.value);

      axios
        .post("http://localhost:8000/api/user/register", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
              console.log(res.data);
              if (!store.state.user) {
                store.commit("setUser", res.data);
              }
            });
          router.push("/");
        })
        .catch((err) => {
          console.log(err)
        });

      console.log(data);
    };

    const setColor = (color: string) => {
      console.log(color);
    };
    const onFilePicked = (e: any) => {
      avatar.value = e.target.files[0];
    };

    return {
      currentStep,
      steps,
      nextStep,
      prevStep,
      handleSubmit,
      onFilePicked,
      setColor,
      progress,
      firstname,
      lastname,
      birthDate,
      email,
      password,
      confirmPassword,
      avatar,
      colorProfile,
      pseudo,
    };
  },
});
</script>
