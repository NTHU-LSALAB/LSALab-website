import { strapi } from "@/apis";
import { ref, watchEffect, onScopeDispose } from "vue";

type CachedRequestOptionsType = { params?: any; all?: boolean };

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

  const fetchRest = async () => {
    const {
      data: { data, meta },
    } = await strapi.get(key, {
      params: {
        ...options?.params,
        "pagination[page]": pg.value.page + 1,
      },
    });
    items.value = items.value?.concat(data);
    pg.value = meta.pagination;
    if (pg.value.page < pg.value.pageCount) {
      await fetchRest();
    }
  };

  const cache = new Map<string, { items: T[]; item: T; pg: any }>();

  onScopeDispose(() => {
    cache.clear();
  });

  watchEffect(async () => {
    isReady.value = false;
    isLoading.value = true;

    if (cache.has(key)) {
      const _cache = cache.get(key);
      if (_cache) {
        items.value = _cache.items;
        item.value = _cache.item;
        pg.value = _cache.pg;
        isReady.value = true;
        return;
      }
    }

    strapi
      .get(key, {
        params: options?.params,
      })
      .then(async ({ data: { data, meta } }) => {
        cache.set(key, {
          items: data,
          item: data,
          pg: meta,
        });
        items.value = item.value = data;
        pg.value = meta.pagination;
        isReady.value = true;
        if (options?.all) {
          await fetchRest();
        }
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
