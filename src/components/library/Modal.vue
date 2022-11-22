<template>
  <div
    @click.self="closeModal"
    class="fixed flex z-50 w-full h-full bg-black bg-opacity-50 items-center justify-center"
  >
    <div class="bg-white drop-shadow-sm h-fit mx-9 rounded-2xl">
      <h3 class="border-b font-bold text-black-default text-xl p-3">
        {{ modal?.title }}
      </h3>
      <p class="m-3 tracking-tighter">
        {{ modal?.description }}
      </p>
      <div class="flex justify-around mb-3">
        <div @click="closeModal" class="p-2 rounded-2xl border-2">Fermer</div>
        <div
          @click="actionToDo"
          class="p-2 rounded-2xl border-2 border-green-default bg-green-default text-white"
        >
          {{ modal?.action.btnTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";

import { IModal } from "@/types/user";

export default defineComponent({
  name: "ModalComponent",
  props: {
    modal: {} as PropType<IModal>,
  },
  setup(props) {
    const store = useStore(key);
    const closeModal = () => {
      store.commit("closeModal");
    };
    const actionToDo = () => {
      props.modal?.action.action();
      store.commit("closeModal");
    };
    return { closeModal, actionToDo };
  },
});
</script>
