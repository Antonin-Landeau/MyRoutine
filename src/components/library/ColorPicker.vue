<template>
  <div
    class="relative h-8 w-8 border-2 rounded-md"
    @click="toggleMenu"
    :style="{ backgroundColor: currentColor }"
  >
    <div
      v-if="isOpen"
      class="absolute top-[120%] grid grid-cols-3 gap-2 w-36 border p-2 rounded-lg"
    >
      <div
        v-for="color in colors"
        :key="color"
        class="w-8 h-8 rounded justify-self-center"
        :style="{ backgroundColor: color }"
        @click="changeColor(color)"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ColorPicker",
  props: {
    selectedColor: {
      type: String,
      default: "#FF000",
    },
  },
  setup(props, { emit }) {
    const currentColor = ref(props.selectedColor)
    const isOpen = ref(false);
    const colors = ref([
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#9e9e9e",
      "#607d8b",
    ]);
    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    const changeColor = (color: string) => {
      currentColor.value = color;
      emit("changeColor", color);
    };
    return { isOpen, colors, currentColor, toggleMenu, changeColor };
  },
});
</script>
<style lang=""></style>
