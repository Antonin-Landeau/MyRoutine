<template>
  <div class="px-5 my-5">
    <div class="flex items-center">
      <img
        class="block rounded-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] w-16"
        :src="`http://localhost:8000/medias/${user?.user_avatar}`"
        :alt="user?.user_pseudo + 'avatar'"
      />
      <div class="pl-5 text-left">
        <h2 class="text-xl text-black-default font-extrabold">
          {{ user?.user_firstname }} {{ user?.user_lastname }}
        </h2>
        <p class="text-sm text-gray-default">{{ user?.user_pseudo }}</p>
      </div>
    </div>
    <div class="flex w-fit gap-6 my-4">
      <span class="font-extrabold text-green-default">{{scores.totalScore ? scores.totalScore :'0'}}<span class="text-sm pl-1">RP</span></span>
      <span class="font-extrabold text-green-default">{{scores.daylyScore ? scores.daylyScore :'0'}}<span class="text-sm pl-1">DRP</span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "ParticipantTab",
  setup() {
    const route = useRoute();
    const store = useStore(key);
    const user = computed(() => store.state.user);
    const scores = computed(() => store.state.challenge.scores)
    const challenge_id = route.params.id;
    store.dispatch("fetchChallengeStateOfUser", {
      challenge_id: challenge_id,
      user_id: user.value?.user_id,
    });
    return { user, scores };
  },
});
</script>
