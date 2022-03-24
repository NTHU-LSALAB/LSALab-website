import request, { strapi } from "@/apis";
import { useComponentStore } from "@/store/component";
import { defineStore } from "pinia";
type State = {
  loading: boolean;
  events: {
    [year: number]: {
      [month: number]: {
        [date: number]: any[];
      };
    };
  };
  selectedDate: {
    year: number;
    month: number;
    date: number;
  } | null;
  selectedEvents: any[] | null;
};
export const useCalendarStore = defineStore("calendar", {
  state: (): State => ({
    loading: false,
    events: {},
    selectedDate: null,
    selectedEvents: null,
  }),
  getters: {
    todayEvents: (state) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      try {
        return state.events[year][month][date];
      } catch {
        return null;
      }
    },
  },
  actions: {
    setSelectedDate(date: { year: number; month: number; date: number }) {
      this.selectedDate = date;
      try {
        this.selectedEvents = this.events[date.year][date.month][date.date];
      } catch {
        this.selectedEvents = null
      }
      console.log(this.selectedEvents)
    },
    async fetchEvents({ month, year }: { month: number; year: number }) {
      const componentStore = useComponentStore();
      this.loading = true;
      componentStore.startLoading();
      return strapi
        .get("google/calendar/events", {
          params: {
            month,
            year,
          },
        })
        .then(({ data }) => {
          for (let evt of data) {
            let dateTime = new Date(evt.start.dateTime);
            const year = dateTime.getFullYear();
            const month = dateTime.getMonth() + 1;
            const date = dateTime.getDate();
            if (!this.events[year]) this.events[year] = {};
            if (!this.events[year][month]) this.events[year][month] = {};
            if (!this.events[year][month][date])
              this.events[year][month][date] = [evt];
            else {
              const exist = this.events[year][month][date].find(
                (event: any) => event.id === evt.id
              );
              if (!exist) this.events[year][month][date].push(evt);
            }
          }
        })
        .finally(() => {
          this.loading = false;
          componentStore.finishLoading();
        });
    },
  },
});
