export { useAlbumStore } from "./album";
export { useAuthStore } from "./auth";
export { useCalendarStore } from "./calendar";
export { useComponentStore } from "./component";
export { useDocStore } from "./document";
export { useDriveStore } from "./drive";
export { usePubStore } from "./pub";
export { useSettingStore } from "./setting";
export { useContentStore } from "./content";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import { createPinia } from "pinia";
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
export default pinia;
