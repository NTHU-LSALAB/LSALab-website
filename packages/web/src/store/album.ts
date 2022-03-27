import { strapi } from "@/apis";
import { defineStore } from "pinia";

interface AlbumState {
  folders: any[];
  folderId?: string;
  files: any[];
  loading: boolean;
}

export const useAlbumStore = defineStore("album", {
  state: (): AlbumState => ({
    folders: [],
    folderId: undefined,
    files: [],
    loading: false,
  }),
  actions: {
    async fetchFolders() {
      this.$reset();
      this.loading = true;
      return strapi
        .get("google/drive/folders", {
          params: {
            folderName: "photo",
          },
        })
        .then(({ data }: { data: any[] }) => {
          this.folders = data;
          if (data[0]) this.fetchFiles(data[0].id);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async fetchFiles(folderId: string) {
      this.folderId = folderId;
      this.loading = true;
      return strapi
        .get("google/drive/files", {
          params: {
            folderId,
          },
        })
        .then(({ data }: { data: any[] }) => {
          this.files = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
