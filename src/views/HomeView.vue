<template>
  <div v-if="user && !isAppStarting">
    <header class="flex items-center py-5 px-5">
      <Burger />
      <router-link
        to="/login"
        class="font-semibold text-green-default text-xl ml-auto"
      >
        <h1 class="text-3xl text-left text-title leading-[53px]">
          <span class="font-bold text-green-400">My </span
          ><span class="font-bold text-title">Routine</span>
        </h1>
      </router-link>
    </header>
    <main class="m-auto">
      <UserCard />
      <MyChallenges :userId="user.user_id" />
      <SuggestionChallenge />
      <LastChallenges />
    </main>

  </div>
  <div v-else-if="!isAppStarting">
    <header class="flex items-center py-5 px-5">
      <Burger />
      <router-link
        to="/login"
        class="font-semibold text-green-default text-xl ml-auto"
      >
        Se connecter</router-link
      >
    </header>
    <main class="m-auto">
      <Welcome />
      <SuggestionChallenge />
      <LastChallenges />
    </main>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import SuggestionChallenge from "@/components/Home/SuggestionChallenge.vue";
import Burger from "@/components/Burger.vue";
import Welcome from "@/components/Home/Welcome.vue";
import LastChallenges from "@/components/Home/LastChallenges.vue";
import UserCard from "@/components/library/Cards/UserCard.vue";
import MyChallenges from "@/components/Home/MyChallenges.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    SuggestionChallenge,
    Burger,
    Welcome,
    LastChallenges,
    UserCard,
    MyChallenges,
  },
  setup() {
    const store = useStore(key);

    const user = computed(() => store.state.user);
    const isAppStarting = computed(() => store.state.isAppStarting);


    return { user, isAppStarting };
  },
});
</script>
