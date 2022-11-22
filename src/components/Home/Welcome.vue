<template>
  <section class="px-5 pt-10">
        <h1 class="text-[40px] text-left text-title mb-7 leading-[53px]">
          Bienvenue sur <span class="font-bold text-green-400">My </span
          ><span class="font-bold text-title">Routine</span>
        </h1>
        <p class="text-justify text-base leading-5 mb-7">
          <router-link class="text-green-default font-semibold" to="/register"
            >Inscrits toi</router-link
          >
          gratuitement et participe à de nombreuses routines qui pourait te
          plaire dans la pages
          <router-link class="text-green-default font-semibold" to="/challenges"
            >challenges</router-link
          >
          ou créer tes propres challenges. Tu peux à ton tour les partager.
        </p>
        <router-link
          class="block text-white px-6 py-3 bg-green-default rounded-full w-fit drop-shadow"
          to="/register"
          >M'inscrire</router-link
        >
      </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WelcomeComposant",
})
  
</script>
