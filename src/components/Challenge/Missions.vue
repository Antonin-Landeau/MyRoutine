<template>
  <div class="px-5 mx-auto pt-2">
    <MissionCard
      v-for="mission in missions"
      :key="mission.id"
      :mission="mission"
      :participant="isParticipant"
    />
    <TotalScore />
  </div>
</template>
<script lang="ts">
import { getMissions } from "@/composable/getMissions";
import { key } from "@/store";
import { computed } from "@vue/reactivity";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import MissionCard from "../library/Cards/MissionCard.vue";
import TotalScore from "./TotalScore.vue";

export default defineComponent({
  name: "MissionComponent",
  components: {
    MissionCard,
    TotalScore,
  },
  setup() {
    const route = useRoute();
    const totalScore = ref<number>(0);
    const store = useStore(key);
    const user = computed(() => store.state.user);
    const missions = computed(() => store.state.challenge.missions);
    const isParticipant = computed(() => store.state.challenge.isParticipating);


    store.dispatch("fetchMissions", route.params.id);

    onBeforeUnmount(() => {
      console.log('Coimponent mission unmounted')
      store.commit("resetMissionState")
    })


    return {
      missions,
      isParticipant,
      totalScore,
    };
  },
});
</script>
