<template>
  <div class="flex items-center justify-center w-full">
    <router-link to="/" class="block mr-auto ml-5">
      <i class="fa-solid fa-angle-left text-2xl"></i>
    </router-link>
    <h1 class="text-gray-600 font-bold text-lg py-4 mr-auto">S'inscrire</h1>
  </div>
  <RegisterForm />
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import RegisterForm from "../components/Forms/RegisterForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    RegisterForm,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();

    const user = computed(() => store.state.user);
  },
});
</script>
