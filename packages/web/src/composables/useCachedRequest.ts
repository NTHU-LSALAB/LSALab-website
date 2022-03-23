import { strapi } from "@/apis";
import { ref, watchEffect, onScopeDispose } from "vue";

type CachedRequestOptionsType = { params: any };

export function useCachedRequest<T>(
  key: string,
  options?: CachedRequestOptionsType
) {
  const items = ref<T[]>();
  const item = ref<T>();
  const pg = ref<any>();
  const isLoading = ref(false);
  const isReady = ref(false);
  const error = ref<Error | undefined>();

  const cache = new Map<string, { items: T[]; item: T; pg: any }>();

  onScopeDispose(() => {
    cache.clear();
  });

  watchEffect(async () => {
    isReady.value = false;
    isLoading.value = true;

    if (cache.has(key)) {
      const _cache = cache.get(key)!;
      items.value = _cache.items;
      item.value = _cache.item;
      pg.value = _cache.pg;
      isReady.value = true;
      return;
    }

    strapi
      .get(key, {
        params: options?.params,
      })
      .then(({ data: { data, meta } }) => {
        cache.set(key, {
          items: data,
          item: data,
          pg: meta,
        });
        items.value = data;
        item.value = data;
        pg.value = meta.pagination;
        isReady.value = true;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        isLoading.value = false;
      });
  });

  return { items, item, pg, error, isLoading, isReady };
}
