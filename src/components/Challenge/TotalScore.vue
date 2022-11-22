<template>
  <div
    class="fixed bg-white p-3 bottom-0 w-full left-0 flex items-center border-t"
    v-if="daylyScore > 0"
  >
    <span class="font-extrabold text-green-default"
      >{{daylyScore  ?daylyScore : "0"
      }}<span class="text-sm pl-1">DRP</span></span
    >

    <button
      class="bg-green-default py-1 px-4 rounded-full ml-auto"
      @click="saveChanges"
    >
      Save
    </button>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "TotalScore",
  setup() {
    const store = useStore(key);
    const daylyScore = computed(() => store.state.challenge.scores.daylyScore);
    const route = useRoute();

    const participateToday = computed(
      () => store.state.challenge.participateToday
    );

    const saveChanges = () => {
      if (participateToday.value) {
        store.dispatch("updateScoreForChallenge", route.params.id);
      } else {
        store.dispatch("scoreForChallenge", route.params.id);
      }
    };

    return { daylyScore, saveChanges };
  },
});
</script>

<style scoped></style>
