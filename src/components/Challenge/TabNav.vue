<template>
  <div
    class="px-5 flex overflow-auto flex-shrink-0 whitespace-nowrap text-black-default"
  >
    <router-link
      v-for="route in routes"
      :key="route.name"
      :to="`/challenge/${routeId}/${route.path}`"
      class="  flex flex-col items-center"
      ><div  class="py-2 px-3 " :class="path.includes(route.path) ? 'text-gray-default':'text-black font-bold'">{{ route.name }}</div>
      <div v-if="path.includes(route.path)" class="w-1/2 h-1 bg-green-default rounded"
      ></div
    ></router-link>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "TabNav",
  setup() {
    const route = useRoute();
    console.log(route.path);
    const path = computed(() => route.path)
    const routeId = ref(route.params.id);
    const routes = ref([
      {
        path: "missions",
        name: "Mission",
      },
      {
        path: "participants",
        name: "Participants",
      },
      {
        path: "leaderboard",
        name: "Leaderboard",
      },
    ]);

    return { routes, routeId, path  };
  },
});
</script>

<style>
.router-link-active,
.router-link-exact-active {
  color: #b3b3b3;
}

.link {
  color: black;
}
</style>
