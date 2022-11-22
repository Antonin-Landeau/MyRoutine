<template>
  <div
    class="fixed -left-full z-50 w-full h-screen bg-opacity-60 transition-all duration-700 ease"
    :class="isOpen ? 'left-[0%]  bg-opacity-60bg-black-default' : ''"
    @click.self="toggleMenu"
  >
    <div
      class="fixed -left-full h-full w-5/6 bg-white transition-all duration-700 ease"
      :class="
        isOpen ? 'left-[0%] drop-shadow-[100px_0px_35px_rgba(0,0,0,0.25)]' : ''
      "
    >
      <div class="flex flex-col h-full">
        <div class="mt-20">
          <h1 class="text-3xl text-center text-title py-5">
            <span class="font-bold text-green-400">My </span
            ><span class="font-bold text-title">Routine</span>
          </h1>
          <div v-if="!user">
            <router-link
              @click.self="toggleMenu"
              class="block text-white px-6 py-2 bg-green-default rounded-full w-fit drop-shadow mx-auto my-5"
              to="/register"
              >S'inscrire</router-link
            >
            <router-link
              @click.self="toggleMenu"
              to="/login"
              class="block font-semibold text-green-default ml-auto my-5"
            >
              Se connecter</router-link
            >
          </div>
        </div>
        <div>
          <router-link to="/" class="block px-10 py-2" @click="toggleMenu">
            <div class="flex items-center text-xl">
              <i class="fa-solid fa-house-user"></i>
              <p class="ml-4">Home</p>
            </div>
          </router-link>
          <router-link
            to="/challenges"
            class="block px-10 py-2"
            @click="toggleMenu"
          >
            <div class="flex items-center text-xl">
              <i class="fa-solid fa-list-check"></i>
              <p class="ml-4">Challenges</p>
            </div>
          </router-link>
        </div>
        <i v-if="user" @click="logOut" class="fa-solid fa-power-off text-2xl mt-auto mb-5"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ResponsiveMenu",
  setup() {
    const store = useStore(key);

    const isOpen = computed(() => store.state.menu.isOpen);
    const user = computed(() => store.state.user);

    const toggleMenu = () => {
      store.commit("toggleMenu");
    };
    const logOut = () => {
      store.commit("logOut")
      toggleMenu()
    }

    return { toggleMenu, logOut, isOpen, user };
  },
});
</script>
