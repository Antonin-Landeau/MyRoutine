<template>
  <section class="my-16">
    <h2 class="font-extrabold text-title text-left text-4xl uppercase pl-5">
      Suggestion de challenge
    </h2>
    <Carousel v-if="challenges && !isLoading" :datas="challenges" />
    <div v-if="isLoading">Loading...</div>
    <div v-if="errorMessage && !isLoading">
      {{ errorMessage }}
    </div>
  </section>
</template>

<script lang="ts">
import { getChallenges } from "@/composable/getChallenges";
import { IChallenge } from "@/types/user";
import axios from "axios";
import { defineComponent } from "vue";
import Carousel from "./../library/Carousel.vue";

export default defineComponent({
  name: "SuggestionChallengeComponent",
  components: {
    Carousel,
  },
  setup() {
    const { challenges, errorMessage, isLoading, fetchDatas } = getChallenges();
    fetchDatas();
    return { challenges, errorMessage, isLoading };
  },
});
</script>
