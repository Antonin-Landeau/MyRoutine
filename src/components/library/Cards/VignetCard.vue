<template>
  <router-link :to="`/challenge/${id}/missions`">
    <div
      class="w-32 h-32 bg-cover bg-center rounded-2xl "
      :style="{
        backgroundImage: `url(http://localhost:8000/medias/${thumbnail})`,
      }"
    ></div>
    <h4 class="text-center pt-2">{{ title }}</h4>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "vignetComponent",
  props: {
    title: String,
    thumbnail: String,
    id: Number,
  },
  setup(props) {
    return;
  },
});
</script>
