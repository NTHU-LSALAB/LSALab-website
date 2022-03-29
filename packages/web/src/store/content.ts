import { defineStore } from "pinia";
import { strapi } from "@/apis";
import { Ref } from "vue";
import { useCachedRequest } from "@/composables/useCachedRequest";
import { Moment } from "moment";

export interface New {
  id: number;
  attributes: {
    title: string;
    date: Moment;
  };
}

interface ContentState {
  news: Ref<New[] | undefined>;
  loadingNews: Ref<boolean>;
  newPg: Ref<any>;
}
export const useContentStore = defineStore("content", {
  actions: {
    loadNews() {
      if (!this.loadingNews && this.newPg.page < this.newPg.pageCount) {
        this.loadingNews = true;
        strapi
          .get("publications", {
            params: {
              sort: ["date:desc"],
              populate: "*",
              "pagination[page]": this.newPg.page + 1,
            },
          })
          .then(({ data: { data, meta } }) => {
            if (!this.news) return;
            this.news = this.news.concat(data);
            this.newPg = meta.pagination;
          })
          .finally(() => {
            this.loadingNews = false;
          });
      }
    },
  },
  state: (): ContentState => {
    const {
      items: news,
      pg: newPg,
      isLoading: loadingNews,
    } = useCachedRequest<New>("news", {
      params: {
        sort: ["date:desc"],
        populate: "*",
      },
    });
    return {
      news,
      newPg,
      loadingNews,
    };
  },
});
