<template>
  <section class="my-16 mx-auto px-5">
    <h2 class="font-extrabold text-title text-left text-4xl uppercase">
      Mes Challenges
    </h2>
    <div
      class="gap-5 mt-7 flex overflow-auto flex-shrink-0 pb-3 whitespace-nowrap"
    >
      <VignetCard
        class="w-fit self-center"
        v-for="challenge in challenges"
        :key="challenge.id"
        :title="challenge.title"
        :thumbnail="challenge.thumbnail"
        :id="challenge.id"
      />
    </div>
    <div>
      <Icon name="Loader" class="w-40 mx-auto" v-if="isLoading"/>
    </div>
  </section>
</template>

<script lang="ts">
import { getMyChallenges } from "@/composable/getMyChallenges";
import { IChallenge } from "@/types/user";
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
import VignetCard from "../library/Cards/VignetCard.vue";
import Icon from "../library/Icon.vue";

export default defineComponent({
  name: "MyChallenges",
  components: { VignetCard, Icon },
  props: {
    userId: Number,
  },
  setup(props) {
    const { challenges, errorMessage, isLoading, fetchDatas } =
      getMyChallenges();

    fetchDatas(props.userId);


    return { challenges, isLoading, errorMessage };
  },
});
</script>
