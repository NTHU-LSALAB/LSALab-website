import { defineStore } from "pinia";

type ComponentState = {
  showMessage: boolean;
  message: string;
  showLoadingBar: boolean;
};
export const useComponentStore = defineStore("component", {
  state: (): ComponentState => ({
    showMessage: false,
    message: "",
    showLoadingBar: false,
  }),
  actions: {
    sendMessage(message: string) {
      if (this.showMessage) this.showMessage = false;
      this.message = message;
      this.showMessage = true;
    },
    hideMessage() {
      this.showMessage = false;
    },
    startLoading() {
      if (this.showLoadingBar) this.showLoadingBar = false;
      this.showLoadingBar = true;
    },
    finishLoading() {
      this.showLoadingBar = false;
    },
  },
});
