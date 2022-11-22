<template>
  <div
    class="flex flex-col transition-all duration-700 ease"
    :class="isOpen ? 'fixed z-50 delay-1000' : ''"
    @click="toggleMenu"
  >
    <div
      class="w-[25px] h-[3px] bg-black-default rounded-sm transition-all duration-700 ease"
      :class="isOpen ? 'w-4 rotate-45 translate-x-1' : ''"
    ></div>
    <div v-if="!variant"
      class="w-[38px] h-[3px] bg-green-default rounded-sm my-2 transition-all duration-700 ease"
      :class="isOpen ? 'w-12 -rotate-45 ' : ''"
    ></div>
    <div v-if="variant === 'white'"
      class="w-[38px] h-[3px] rounded-sm my-2 transition-all duration-700 ease"
      :class="isOpen ? 'w-12 -rotate-45 bg-green-default' : 'bg-white'"
    ></div>
    <div
      class="w-[25px] h-[3px] bg-black-default rounded-sm ml-auto transition-all duration-700 ease"
      :class="isOpen ? 'w-4 rotate-45 -translate-x-1' : ''"
    ></div>
  </div>
</template>
<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "burgerMenu",
  props: {
    variant: String,
  },
  setup() {
    const store = useStore(key);

    const isOpen = computed(() => store.state.menu.isOpen);

    const toggleMenu = () => {
      store.commit("toggleMenu");
    };

    return { toggleMenu, isOpen };
  },
});
</script>
