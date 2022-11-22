<template>
  <div class="mx-auto px-5 my-5">
    <img
      :src="`http://localhost:8000/medias/${user?.user_avatar}`"
      :alt="user?.user_avatar"
      class="block rounded-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] w-28 mx-auto"
    />
    <div class="mt-7">
      <h2 class="text-2xl text-center text-title line-clamp-1 tracking-tighter">
        Hi,
        <span class="font-extrabold text-title"
          >{{ user?.user_firstname }} {{ user?.user_lastname }}</span
        >
      </h2>
      <p class="text-center text-sm text-gray-default">{{ user?.user_pseudo }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { key } from "@/store";
import axios from "axios";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "UserCard",
  setup(props) {
    const store = useStore(key);
    const user = computed(() => store.state.user);

    return { user };
  },
});
</script>
