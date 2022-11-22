<template>
  <div class="flex flex-col my-4">
    <label class="text-left font-bold mb-2">{{label}}</label>

    <input
      :type="type"
      :value="modelValue"
      @input="onChange"
      class="drop-shadow py-2 px-5 outline-none text-lg rounded-2xl"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";



export default defineComponent({
  name: "InputComponent",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: String,
    type: String,
  },
  setup(props, { emit, attrs }) {

    const onChange = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value);
    };
    return { onChange };
  },
});
</script>
