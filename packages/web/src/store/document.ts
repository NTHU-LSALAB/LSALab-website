import request, { strapi } from "@/apis";
import { defineStore } from "pinia";
export interface Item {
  id: string;
  attributes: {
    type: string;
    title: string;
    link: string;
    deadline?: string;
    ranking?: string;
  };
}
type Tag = "journals" | "links";
interface DocState {
  tag: Tag;
  doc: {
    items: Item[];
    meta: any;
  };
  loading: boolean;
  creating: boolean;
  editLoading: boolean;
}
export const useDocStore = defineStore("doc", {
  state: (): DocState => ({
    tag: "journals",
    doc: {
      items: [],
      meta: {},
    },
    loading: false,
    creating: false,
    editLoading: false,
  }),
  getters: {
    docs(state) {
      return state.doc.items.map((item) => ({
        id: item.id,
        ...item.attributes,
      }));
    },
  },
  actions: {
    updateTag(tag: string) {
      this.tag = tag as Tag;
    },
    async fetchDocs() {
      this.loading = true;
      return strapi
        .get(this.tag)
        .then(({ data }: { data: { data: Item[]; meta: any } }) => {
          // TODO: sort the docs
          this.doc!.items = data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async edit(item: Item) {
      this.editLoading = true;
      return strapi.put(`${this.tag}/${item.id}`, { data: item }).then(() => {
        this.editLoading = false;
        this.fetchDocs();
      });
    },
    async createDoc(data: any) {
      this.creating = true;
      return strapi
        .post(this.tag, { data })
        .then(this.fetchDocs)
        .finally(() => {
          this.creating = false;
        });
    },
    async deleteDoc(item: Item) {
      this.editLoading = true;
      return strapi
        .delete(`${this.tag}/${item.id}`)
        .then(this.fetchDocs)
        .finally(() => {
          this.editLoading = false;
        });
    },
  },
});
