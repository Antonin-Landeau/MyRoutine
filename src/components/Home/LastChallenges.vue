<template>
  <section class="my-16 mx-auto px-5">
    <h2 class="font-extrabold text-title text-left text-4xl uppercase">
      Derniers challenge
    </h2>
    <div class="grid grid-cols-2 justify-items-center w-fit mx-auto gap-5 my-7">
      <VignetCard
        class="w-fit self-center"
        v-for="data in datas"
        :key="data.id"
        :title="data.title"
        :thumbnail="data.thumbnail"
        :id="data.id"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { IChallenge } from "@/types/user";
import axios from "axios";
import { defineComponent } from "vue";
import VignetCard from "../library/Cards/VignetCard.vue";

export default defineComponent({
  name: "LastChallenges",
  components: { VignetCard },
  data() {
    return {
      datas: ([] as IChallenge[]) || null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/challenge/getChallenges")
      .then((res) => {
        this.datas = res.data;
      });
  },
});
</script>
