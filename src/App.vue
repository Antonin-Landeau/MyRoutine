<template>
  <div
    v-if="isAppStarting"
    class="fixed flex w-full h-full z-50 bg-green-default justify-center items-center"
  >
    <div>
      <h1 class="text-white text-3xl">App is starting</h1>
      <p>Loading ...</p>
    </div>
  </div>
  <Modal v-if="modal?.isOpen" :modal="modal" />

  <ResponsiveMenu />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, } from "vue";
import ResponsiveMenu from "./components/ResponsiveMenu.vue";
import Modal from "./components/library/Modal.vue";
import { getUser } from "./composable/getUser";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { key } from "./store";

export default defineComponent({
  name: "HomeView",
  components: {
    ResponsiveMenu,
    Modal
  },
  setup() {
    const { isAppStarting } = getUser();
    const store = useStore(key)
    const modal = computed(() => store.state.modal);

    
    return { isAppStarting, modal };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
