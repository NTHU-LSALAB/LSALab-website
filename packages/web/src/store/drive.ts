import { strapi } from "@/apis";
import { renderHref } from "@/utils/component";
import moment from "moment";
import { defineStore } from "pinia";
interface State {
  folders: any[];
  folderId?: string;
  files: any[];
  loading: boolean;
  uploading: boolean;
  editLoading: boolean;
}
export const useDriveStore = defineStore("drive", {
  state: (): State => ({
    folders: [],
    folderId: undefined,
    files: [],
    loading: false,
    uploading: false,
    editLoading: false,
  }),
  getters: {
    storeFiles: (state) => {
      return state.files.map((file: any) => {
        return {
          id: file.id,
          date: moment(file.name, "YYYY-MM-DD").format("YYYY-MM-DD"),
          presenter: file.owners[0].displayName,
          name: file.name,
          webViewLink: file.webViewLink,
          display: renderHref(file.name, file.webViewLink),
          actions: "actions",
        };
      });
    },
  },
  actions: {
    updateFile(payload: any) {
      const file = this.files.find((file: any) => file.id === payload.id);
      file.name = payload.name;
    },
    deletFile(payload: any) {
      this.files = this.files.filter((file: any) => file.id !== payload.id);
    },
    async fetchFolders() {
      this.$reset();
      this.loading = true;
      return strapi
        .get("google/drive/folders")
        .then(({ data }: { data: any[] }) => {
          data.sort(
            (a, b) =>
              parseInt(a.name.split(" ")[0]) - parseInt(b.name.split(" ")[0])
          );
          this.folders = data;
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
    async edit(file: any) {
      this.editLoading = true;
      return strapi
        .put(`google/drive/files/${file.id}`, {
          name: file.name,
        })
        .then(({ data }) => {
          this.updateFile(data);
        })
        .finally(() => {
          this.editLoading = false;
        });
    },
    async uploadFile(data: any) {
      this.uploading = true;
      const { file, title } = data;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("mimeType", file.type);
      formData.append("folderId", this.folderId!);
      formData.append("file", file.file);
      return strapi
        .post("google/drive/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.fetchFiles(this.folderId!);
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    async deleteFile(file: any) {
      this.editLoading = true;
      return strapi
        .delete(`google/drive/files/${file.id}`)
        .then(({ data }) => {
          this.deletFile(file);
        })
        .finally(() => {
          this.editLoading = false;
        });
    },
  },
});
