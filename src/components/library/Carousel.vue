<template>
  <div class="overflow-hidden">
    <div
      class="flex transition duration-700 ease bg-transparent"
      @touchstart="startDrag"
      @touchend="endDrag"
      @touchmove="duringDrag"
      ref="dragableZone"
      :style="{
        transform: `translateX(${-index * dragableZoneWidth}px)`,
      }"
    >
      <div
        ref="item"
        class="min-w-full overflow-hidden"
        v-for="data in datas"
        :key="data.title"
      >
        <SuggestionChallengeCard
          v-if="data"
          :description="data.description"
          :title="data.title"
          :thumbnail="data.thumbnail"
          :id="data.id"
        />
      </div>
    </div>
    <div class="flex gap-4 m-auto w-fit">
      <div
        v-for="data in datas"
        :key="data.title"
        :class="
          data.id - 1 === index ? 'bg-green-default w-[50px]' : 'bg-gray-400 w-[15px]'
        "
        class=" h-2 rounded-full transition-all duration-700 ease"
        @click="changeIndex(data.id - 1)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, VNodeRef } from "vue";
import SuggestionChallengeCard from "./Cards/SuggestionChallengeCard.vue";
import { IChallenge } from "@/types/user";

export default defineComponent({
  name: "CarouselComponent",
  props: {
    datas: [] as any,
  },
  components: {
    SuggestionChallengeCard,
  },
  setup(props) {
    const index = ref<number>(0);
    const dragableZone = ref();
    const item: VNodeRef = ref();
    const startX = ref<null | number>(null);
    const endX = ref<null | number>(null);
    const dragableZoneWidth = ref(0);
    const autoPlay = ref<boolean>(true);

    const startDrag = (event: TouchEvent) => {
      dragableZoneWidth.value = dragableZone.value.clientWidth;
      startX.value = event.touches[0].clientX;
    };
    const changeIndex = (a: any) => {
      dragableZoneWidth.value = dragableZone.value.clientWidth;
      index.value = a;
    };

    const endDrag = (event: TouchEvent) => {
      if (startX.value && endX.value) {
        if (startX.value > endX.value) {
          if (index.value !== props.datas.length - 1) {
            index.value = index.value + 1;
          }
        } else {
          if (index.value > 0) {
            index.value = index.value - 1;
          }
        }
      }
    };

    const duringDrag = (event: TouchEvent) => {
      endX.value = event.touches[0].clientX;
    };

    // const autoPlayf = () => {
    //   let sens = "right";
    //   if (autoPlay.value) {
    //     setInterval(() => {
    //       let sens = index.value === props.datas.length ? "left" : "right";
    //       if (sens === "right" && index.value !== props.datas.length - 1) {
    //         index.value = index.value + 1;
    //         console.log(index.value);
    //         console.log(sens);
    //       } else {
    //         if (sens === "left" && index.value > 0) {
    //           index.value = index.value - 1;
    //         }
    //       }
    //     }, 5000);
    //   }
    // };

    // autoPlayf();

    return {
      startDrag,
      endDrag,
      duringDrag,
      changeIndex,
      dragableZone,
      item,
      index,
      dragableZoneWidth,
      autoPlay,
    };
  },
});
</script>
