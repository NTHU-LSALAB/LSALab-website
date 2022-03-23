import request, { strapi } from "@/apis";
import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";

type AuthState = {
  accessToken?: string;
  me?: any;
};
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: undefined,
    me: undefined,
  }),
  getters: {
    internal: (state) =>
      state.me?.email.split("@").at(-1) === "lsalab.cs.nthu.edu.tw" ||
      state.me.role.type === "member",
  },
  actions: {
    async getMe() {
      strapi
        .get("users/me", {
          params: {
            populate: ["role"],
          },
        })
        .then(({ data }) => {
          console.log(data);
        });
    },
    async checkToken() {
      if (this.accessToken) {
        const result: any = jwt_decode(this.accessToken);
        const { exp } = result;
        if (Date.now() >= exp * 1000) {
          // expired
          this.logout();
        }
      }
    },
    async getLoginURI() {
      return request
        .get("auth/login-uri", {
          params: {
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          },
        })
        .then(({ data }) => {
          return data;
        });
    },
    async getToken({
      access_token,
      refresh_token,
    }: {
      access_token: string;
      refresh_token?: string;
    }) {
      this.$reset();
      return strapi
        .get("/auth/google/callback", {
          params: {
            access_token,
            refresh_token,
          },
        })
        .then(({ data }) => {
          const { jwt, user } = data;
          this.accessToken = jwt;
          this.me = user;
        });
    },
    async refresh() {
      const { email } = this.me;
      return request
        .post("auth/refresh", {
          email,
        })
        .then(({ data }) => {
          const { access_token } = data;
          this.accessToken = access_token;
        });
    },
    async register({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) {
      return strapi
        .post("/auth/local/register", {
          username,
          email,
          password,
        })
        .then(({ data }) => {
          // Handle success.
          const { jwt, user } = data;
          console.log(user);
          this.accessToken = jwt;
          this.me = user;
        });
    },
    async login({
      identifier,
      password,
    }: {
      identifier: string;
      password: string;
    }) {
      return strapi
        .post("/auth/local", {
          identifier,
          password,
        })
        .then(({ data }) => {
          // Handle success.
          const { jwt, user } = data;
          this.accessToken = jwt;
          this.me = user;
        });
    },
    async logout() {
      this.$reset();
    },
  },
  persist: true,
});
