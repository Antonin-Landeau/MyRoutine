<template>
  <div
    class="flex items-center justify-center w-full border-b-4 border-green-300"
  >
    <router-link to="/" class="block mr-auto ml-5">
      <i class="fa-solid fa-angle-left text-2xl"></i>
    </router-link>
    <h1 class="text-gray-600 font-bold text-lg py-4 mr-auto">Connexion</h1>
  </div>
  <LoginForm />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import LoginForm from "@/components/Forms/LoginForm.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginForm,
  },
  setup(){
    const store = useStore(key)
    const router = useRouter()
    onBeforeMount(() => {
      if (store.state.user) {
        router.push('/')
      }
    })
  }
});
</script>
