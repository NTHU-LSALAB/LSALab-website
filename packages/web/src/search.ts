import algoliasearch from "algoliasearch";

export const searchClient = algoliasearch(
  import.meta.env.VITE_SEARCH_APP_ID,
  import.meta.env.VITE_SEARCH_API_KEY
);
export const searchIndex = searchClient.initIndex("lsalab");
