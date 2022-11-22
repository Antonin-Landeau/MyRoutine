<template>
  <header class="fixed">
    <div class="flex">
      <h1 class="text-2xl">Challenges</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/challenges">Challenges</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarComponent",
});
</script>
