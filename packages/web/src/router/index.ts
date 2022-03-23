import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { useAuthStore, useComponentStore } from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const componentStore = useComponentStore();
  if (to.name === "LoginView" && authStore.me) {
    router.replace({ name: "HomeView" });
    return;
  }
  if (to.meta.auth && !authStore.internal) {
    componentStore.sendMessage("Please login");
    return;
  } else {
    if (to.name !== "LoginView" && to.name !== "RegisterView") {
      componentStore.startLoading();
    }
    next();
  }
});

export default router;
