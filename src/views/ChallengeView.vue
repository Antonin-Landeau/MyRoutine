<template>
  <div class="relative pb-20">
    <div class="absolute justify-center items-center rounded-br-full">
      <div class="w-fit p-4">
        <Burger />
      </div>
    </div>
    <div
      class="bg-cover rounded-br-[70px] overflow-auto"
      :style="{
        backgroundImage: `url(http://localhost:8000/medias/${challenge?.thumbnail})`,
      }"
    >
      <div class="w-full h-40 bg-black-default bg-opacity-40 flex flex-col">
        <div class="mt-auto ml-4">
          <p class="text-left text-white text-sm line-clamp-2">
            {{ challenge?.description }}
          </p>
          <h2
            class="uppercase text-6xl font-bold tracking-tighter line-clamp-1 text-left text-white"
          >
            {{ challenge?.title }}
          </h2>
        </div>
      </div>
    </div>
    <button
      v-if="!isParticipant"
      class="block ml-5 my-5 p-2 px-4 rounded-full bg-green-default text-lg drop-shadow text-white"
      @click="participateToChallenge"
    >
      Participer
    </button>
    <ParticipantTab v-if="isParticipant" />
    <TabNav />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { getChallenge } from "@/composable/getChallenge";
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Burger from "@/components/Burger.vue";
import TabNav from "@/components/Challenge/TabNav.vue";
import ParticipantTab from "@/components/Challenge/UserState.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { isUserParticipating } from "@/composable/isParticipant";

export default defineComponent({
  name: "ChallengeView",
  components: {
    Burger,
    TabNav,
    ParticipantTab,
  },
  setup() {
    const store = useStore(key);
    const route = useRoute();
    const router = useRouter();

    const challenge_id = route.params.id;
    const isMenuOpen = computed(() => store.state.menu.isOpen);
    const user = computed(() => store.state.user);
    const isParticipant = computed(() => store.state.challenge.isParticipating);

    const { fetchIsParticipant } = isUserParticipating();
    fetchIsParticipant(route.params.id);

    const { challenge, errorMessage, isLoading, fetchDatas } = getChallenge();

    fetchDatas(challenge_id);
    const goBack = () => {
      router.go(-1);
    };

    const participateToChallenge = () => {
      if (user.value) {
        console.log(user.value);
        store.dispatch("partcipateToChallenge", {
          challenge_id: challenge_id,
          user_id: user.value.user_id,
        });
      } else {
        store.commit("setModal", {
          isOpen: true,
          title: "Connectez-Vous",
          description:
            "Vous devez vous connecter pour participer à ce challenge",
          action: {
            btnTitle: "Connexion",
            action: () => {
              router.push("/login");
            },
          },
        });
      }
    };

    return {
      challenge,
      isMenuOpen,
      goBack,
      isParticipant,
      participateToChallenge,
    };
  },
});
</script>
