/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_STRAPI_ENDPOINT: string;
  readonly VITE_SEARCH_APP_ID: string;
  readonly VITE_SEARCH_API_KEY: string;
  readonly VITE_SEARCH_INDEX: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "vue-instantsearch/vue3/es";
