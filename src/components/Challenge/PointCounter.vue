<template>
  <div v-if="id" class="flex justify-between items-center">
    <i @click="decrement(id)" class="fa-solid fa-circle-minus"></i>
    <div>{{ iteration }}</div>
    <i @click="increment(id)" class="fa-solid fa-circle-plus"></i>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "pointCounter",
  props: {
    id: Number,
  },
  setup(props, { emit }) {
    const store = useStore(key);
    console.log(props);
    const iteration = computed(() => {
      if (props.id) {
        console.log(store.state.challenge.missions[props.id - 1])
        return store.state.challenge.missions[props.id - 1].iteration;
      }
      return null
    });
    const increment = (id: any) => {
      store.commit("updateMission", { mission_id: id, by: 1 });
    };
    const decrement = (id: any) => {
      store.commit("updateMission", { mission_id: id, by: -1 });
    };
    return { increment, decrement, iteration };
  },
});
</script>
