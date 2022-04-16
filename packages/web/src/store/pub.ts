import { defineStore } from "pinia";
import { Moment } from "moment";
import { strapi } from "@/apis";
import { Ref } from "vue";
import { useCachedRequest } from "@/composables/useCachedRequest";

export interface Venue {
  id: number;
  attributes: {
    name: string;
  };
}
export interface Publication {
  id: number;
  attributes: {
    title: string;
    field: { data: Field };
    topic?: { data: Topic };
    venue: { data: Venue };
    venueName?: string;
    image: { data: any };
    members: string[];
    year?: number;
    date?: Moment;
    webLink?: string;
    slidesLink?: string;
    videoLink?: string;
    codeLink?: string;
    // paper award?
    award?: string;
    tags?: string[];
  };
}

export interface Topic {
  id: number;
  attributes: {
    name: string;
    type: string;
    image: { data?: any };
    background: string;
    members?: string[];
    collaborators?: string[];
    softwares?: string[];
    tags?: string[];
    publications: { data: Publication[] };
  };
}

export interface Field {
  id: number;
  attributes: {
    name: string;
    topics: { data: Topic[] };
  };
}

interface PubState {
  pubLoaded: Ref<boolean>;
  pubs: Ref<Publication[] | undefined>;
  venues: Ref<Venue[] | undefined>;
  fields?: Ref<Field[] | undefined>;
  pubPg: Ref<any>;
  loadingPubs: Ref<boolean>;
  topic?: Topic;
}
export const usePubStore = defineStore("pub", {
  actions: {
    getTopic(key: string) {
      strapi
        .get("topics", {
          params: {
            populate: "*",
            "filters[type][$eq]": key,
          },
        })
        .then(({ data }) => {
          this.topic = data.data[0];
        });
    },
  },
  state: (): PubState => {
    // const { venues, fields, pubs, pagination } = usePubRequest();
    const { items: venues } = useCachedRequest<Venue>("venues");
    const { items: fields } = useCachedRequest<Field>("fields", {
      params: {
        populate: ["topics", "topics.image", "publications"],
        sort: ["id"],
      },
    });
    const {
      items: pubs,
      pg: pubPg,
      isLoading: loadingPubs,
      isReady: pubLoaded,
    } = useCachedRequest<Publication>("publications", {
      params: {
        sort: ["year:desc", "date:desc"],
        populate: "*",
      },
      all: true,
    });
    return {
      pubLoaded,
      topic: undefined,
      venues,
      fields,
      pubs,
      pubPg,
      loadingPubs,
      // pagination,
    };
  },
});
