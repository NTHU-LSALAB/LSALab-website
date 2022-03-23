import moment from "moment";
export const format = (date: string | Date, type?: string) => {
  if (typeof date === "string") date = new Date(date);
  if (date.getMinutes()) return moment(date).format("h:m a");
  else return moment(date).format("h a");
};
