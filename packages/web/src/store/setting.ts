import { defineStore } from "pinia";
export type Mode = "light" | "dark";
type Locale = "en" | "zh";
type State = {
  mode: Mode;
  locale?: Locale;
};
export const useSettingStore = defineStore("setting", {
  state: (): State => ({
    mode: "light",
    locale: undefined,
  }),
  actions: {
    init() {
      // tailwindcss
      if (this.mode === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    },
    updateMode(mode: Mode | string) {
      this.mode = mode as Mode;
      this.init();
    },
    toggleMode() {
      if (this.mode === "light") this.mode = "dark";
      else if (this.mode === "dark") this.mode = "light";
      this.init();
    },
    updateLocale(locale: Locale | string) {
      this.locale = locale as Locale;
    },
  },
  persist: true,
});
