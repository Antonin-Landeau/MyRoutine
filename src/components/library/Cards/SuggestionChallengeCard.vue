<template>
  <router-link :to="`/challenge/${id}/missions`"
    class="block relative bg-cover overflow-hidden bg-bottom pb-28 rounded-2xl drop-shadow mx-5 my-7"
    :style="{
      backgroundImage: `url(http://localhost:8000/medias/${thumbnail})`,
    }"
  >
    <div class="bg-white ml-auto p-4 drop-shadow-[0_50px_35px_rgba(0,0,0,0.7)]">
      <h3 class="text-3xl text-title text-left font-bold pb-2">{{ title }}</h3>
      <p class="line-clamp-3 text-xs text-justify">{{ description }}</p>
    </div>
    <router-link class="absolute bottom-5 right-5 block text-white px-5 py-1 bg-green-default rounded-full w-fit drop-shadow-[0_20_60px_rgba(128,237,153,0.7)]" to="/login">Voir le challenge</router-link>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SuggestionChallengeCard",
  props: {
    id: Number,
    title: String,
    description: String,
    thumbnail: String,
  },
  setup(props) {
    return;
  },
});
</script>
