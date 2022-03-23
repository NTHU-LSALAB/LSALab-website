import Wrapper from "./Wrapper.vue";
import "@/theme/variable.css";
import pinia from "@/store";
import i18n from "@/i18n";
import router from "@/router";
import { createApp } from "vue";

const app = createApp(Wrapper);

app.use(pinia);
app.use(router);
app.use(i18n());

const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

app.mount("#app");
