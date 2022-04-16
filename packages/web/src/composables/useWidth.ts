import { ref, onMounted, onUnmounted } from "vue";

export function useWidth() {
  const width = ref(window.innerWidth);
  const onResize = () => {
    width.value = window.innerWidth;
  };
  onMounted(() => {
    window.addEventListener("resize", onResize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
  return width;
}
