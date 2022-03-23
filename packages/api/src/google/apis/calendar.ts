import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "key.json",
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({
  version: "v3",
  auth,
});

if (module === require.main) listEvent();

const calendarId = "lsalab@lsalab.cs.nthu.edu.tw";

// calendar.calendarList.insert({
//     requestBody: {
//         id: calendarId
//     }
// })
// calendar.calendarList.delete({
//   calendarId: 'kswang@lsalab.cs.nthu.edu.tw'
// })

export async function listEvent(year: number = 2022, month: number = 2) {
  // var { data } = await calendar.calendarList.list();
  let startyear = month === 1 ? year - 1 : year;
  let startmonth = (((month - 1) % 12) + 12) % 12;
  if (startmonth === 0) startmonth = 12;
  let endyear = month === 12 ? year + 1 : year;
  let endmonth = (((month + 1) % 12) + 12) % 12;
  if (endmonth === 0) endmonth = 12;
  let pageToken = undefined;
  let returnItems: any = [];
  while (true) {
    const {
      data: { items, nextPageToken },
    } = await calendar.events.list({
      calendarId,
      pageToken,
      singleEvents: true,
      timeMin: `${startyear}-${startmonth}-01T00:00:00-08:00`,
      timeMax: `${endyear}-${endmonth}-28T00:00:00-08:00`,
      orderBy: "startTime",
    });
    returnItems = returnItems.concat(items);
    pageToken = nextPageToken as string;
    if (!pageToken) break;
  }
  return returnItems;
}
