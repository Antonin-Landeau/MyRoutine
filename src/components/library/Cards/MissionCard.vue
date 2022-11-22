<template>
  <div
    v-if="!user || !participant"
    class="flex justify-start p-3 my-5 drop-shadow-xl bg-white rounded-2xl"
  >
    <div>
      <div class="text-xl text-green-default">{{ mission?.id }}</div>
      <div class="ml-auto text-green-default text-sm">
        {{ mission?.points }}<span class="text-xs">RP</span>
      </div>
    </div>
    <p
      class="text-left ml-2 pl-2 leading-[19px] text-black-default font-thin border-l"
    >
      {{ mission?.m_order }}
    </p>
  </div>
  <div
    v-if="user && participant"
    class="flex justify-start p-3 my-5 drop-shadow-xl bg-white rounded-2xl"
  >
    <div>
      <div class="text-xl text-green-default">{{ mission?.id }}</div>
      <div class="ml-auto text-green-default text-sm">
        {{ mission?.points }}<span class="text-xs">RP</span>
      </div>
      <div
        v-if="mission?.isStackable"
        class="ml-auto text-green-default text-sm"
      >
        {{ mission?.score }}<span class="text-xs">DRP</span>
      </div>
    </div>
    <div
      class="text-left ml-2 pl-2 leading-[19px] text-black-default font-thin border-l"
    >
      <p>
        {{ mission?.m_order }}
      </p>
      <div v-if="mission?.isStackable">
        <PointCounter :id="mission?.id" />
      </div>
      <div v-if="!mission?.isStackable" >
        <input
          v-if="mission?.iteration !== 1"
          type="checkbox"
          :value="mission?.points"
          @change="(e) => checkInput(e, mission?.id)"
        />
        <div v-if="mission?.iteration === 1">
          <i class="fa-solid fa-check text-green-default"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { IMission } from "@/types/user";
import { computed, defineComponent, PropType, ref } from "vue";
import PointCounter from "@/components/Challenge/PointCounter.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MissionCardComposant",
  props: {
    participant: Boolean,
    mission: Object as PropType<IMission>,
  },
  components: {
    PointCounter,
  },
  setup(props) {
    console.log(props)
    const user = localStorage.getItem("token");
    const store = useStore(key);
    const dev = "web"
    const checkInput = (e: Event , id: number | undefined) => {
      console.log(id)
      if ((e.target as HTMLInputElement).checked) {
        store.commit("updateMission", {mission_id: id, by: 1});
      } else {
        store.commit("updateMission", {mission_id: id, by: -1});
      }
    };

    return { user, checkInput };
  },
});
</script>
