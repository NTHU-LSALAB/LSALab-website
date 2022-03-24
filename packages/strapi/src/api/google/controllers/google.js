'use strict';

/**
 * A set of functions called "actions" for `google`
 */
const fs = require('fs');
const _ = require('lodash');
const purest = require('purest');

const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "key.json",
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.metadata",
    "https://www.googleapis.com/auth/drive.photos.readonly"
  ],
});

const folderMapping = {
  "group meeting": "1g_Tx9n7wGu_Z3BT1Fug7kmdnVptnVNwl",
  photo: "0B1ClbR-jUXR9ODZrQWR4Sm9JTVE",
};

const calendar = google.calendar({
  version: "v3",
  auth,
});

const calendarId = "lsalab@lsalab.cs.nthu.edu.tw";

module.exports = {
  getEvents: async (ctx) => {
    try {
      const { year, month } = ctx.query
      let startyear = month === 1 ? year - 1 : year;
      let startmonth = (((month - 1) % 12) + 12) % 12;
      if (startmonth === 0) startmonth = 12;
      let endyear = month === 12 ? year + 1 : year;
      let endmonth = (((month + 1) % 12) + 12) % 12;
      if (endmonth === 0) endmonth = 12;
      let pageToken = undefined;
      let returnItems = [];
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
        pageToken = nextPageToken;
        if (!pageToken) break;
      }
      ctx.body = returnItems;
    } catch (err) {
      ctx.body = err;
    }
  },
  getFolders: async (ctx) => {
    const folderName = ctx.query.folderName || 'group meeting'
    try {
      const drive = google.drive({
        version: "v3",
        auth,
      });
      var {
        data: { id },
      } = await drive.files.get({
        fileId: folderMapping[folderName],
      });
      const folderId = id;
      var {
        data: { files },
      } = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields:
          "files/id, files/mimeType, files/name, files/webViewLink, files/modifiedTime, files/owners, files/parents",
      });
      let directories = [];

      let promiseList = [];
      if (!files) return directories;
      for (let file of files) {
        if (file.mimeType === "application/vnd.google-apps.folder") {
          promiseList.push(
            new Promise(async (resolve) => {
              if (folderName === "photo") {
                let tryCount = 0;
                let hasFile = false;
                let preview = null;
                let pageToken = undefined;
                while (!hasFile && tryCount < 5) {
                  let {
                    data: { files, nextPageToken },
                  } = await drive.files.list({
                    q: `'${file.id}' in parents`,
                    pageSize: 2,
                    pageToken,
                    fields: "files/id, files/thumbnailLink",
                  });
                  pageToken = nextPageToken;
                  if (files && files[0]) {
                    preview = files[0];
                    break;
                  }
                  tryCount++;
                }
                directories.push({
                  id: file.id,
                  name: file.name,
                  preview,
                });
              } else {
                directories.push({
                  id: file.id,
                  name: file.name,
                });
              }
              resolve(0);
            })
          );
        }
      }
      await Promise.all(promiseList);
      ctx.body = directories;
    } catch (err) {
      ctx.body = err
    }
  },
  getFiles: async (ctx) => {
    try {
      const folderId = ctx.query.folderId
      const drive = google.drive({
        version: "v3",
        auth,
      });
      if (!folderId) {
        ctx.response.status = 400;
        ctx.body = 'No folderId';
        return;
      }

      const {
        data: { files },
      } = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields:
          "files/id, files/mimeType, files/name, files/webViewLink, files/webContentLink, files/modifiedTime, files/owners, files/parents",
      });
      let _files = [];

      if (!files) return;
      for (let file of files) {
        if (file.mimeType !== "application/vnd.google-apps.folder") {
          _files.push(file);
        }
      }
      ctx.body = _files;
    } catch (err) {
      ctx.body = err
    }
  },
  getFile: async (ctx) => {
    // const users = await strapi.plugin('users-permissions').service('user')
    //   .fetchAll(ctx.query.filters, populate);
    // console.log(users)
  },
  createFile: async (ctx) => {
    try {
      const { file } = ctx.request.files
      if (!file) throw new Error("no file found");
      const { title, mimeType, folderId } = ctx.request.body;
      const accessToken = await checkToken(ctx.state.user)
      const drive = google.drive({
        version: "v3",
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const { data } = await drive.files.create(
        {
          requestBody: {
            name: title,
            mimeType,
            parents: [folderId],
          },
          media: {
            body: fs.createReadStream(file.path),
          },
          fields: "id, webViewLink, parents",
        },
        {
          // Use the `onUploadProgress` event from Axios to track the
          // number of bytes uploaded to this point.
          onUploadProgress: (evt) => {
            // const progress = (evt.bytesRead / fileSize) * 100;
            // readline.clearLine(process.stdout, 0);
            // readline.cursorTo(process.stdout, 0);
            // process.stdout.write(`${Math.round(progress)}% complete`);
          },
        }
      );
      ctx.body = data;
    } catch (err) {
      ctx.response.status = 400
      ctx.body = err
    }
  },
  updateFile: async (ctx) => {
    const requestBody = ctx.request.body;
    const fileId = ctx.params.fileId;
    const accessToken = await checkToken(ctx.state.user)
    try {
      const drive = google.drive({
        version: "v3",
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const { data } = await drive.files.update({
        fileId,
        requestBody,
      });
      ctx.body = data;
    } catch (err) {
      // console.log(err)
      ctx.response.status = 400
      ctx.body = err
    }
  },
  deleteFile: async (ctx) => {
    const fileId = ctx.params.fileId;
    const accessToken = await checkToken(ctx.state.user)
    try {
      const drive = google.drive({
        version: "v3",
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const { data } = await drive.files.delete({
        fileId,
      });
      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.response.status = 400
      ctx.body = err
    }
  },
  // sendMail: async (ctx) => {
  //   console.log(strapi.config.get('plugin.email'))
  //   const sendTo = 'bruce1198@gmail.com'
  //   try {
  //     const emailOptions = {
  //       to: sendTo,
  //       subject: 'My Strapi Test Email',
  //       // text: ```Hello,
        
  //       // This is an email sent by using the Strapi.
        
  //       // Your friend,
  //       // Me
  //       // ```,
  //       html: `Hello,<br><br>This is an email sent by using the Strapi.<br><br>Your friend,<br>Me`,
  //     }
  //     await strapi.plugins['email'].services.email.send(emailOptions)
  //     strapi.log.debug(`Email sent to ${sendTo}`)
  //     ctx.send({ message: 'Email sent' })
  //   } catch (err) {
  //     strapi.log.error(`Error sending email to ${sendTo}`, err)
  //     ctx.send({ error: 'Error sending email' })
  //   }
  // }
};

const checkToken = async (user) => {
  const { accessToken: access_token, refreshToken: refresh_token } = user.google
  try {
    // const { data } = google.oauth2().tokeninfo({ access_token })
    const google = purest({
      provider: 'google'
    })
    await google
      .get('oauth2/v3/tokeninfo')
      .qs({ access_token })
      .request()

    // token is ok
    return access_token
  } catch (e) {

    // accessToken is not valid, need refresh

    // setup purest
    const auth = await strapi
      .store({ type: 'plugin', name: 'users-permissions', key: 'grant' })
      .get();
    const config = {
      "google": {
        "refresh": {
          "origin": "https://oauth2.googleapis.com",
          "path": "token",
          "method": "POST",
          "form": {
            "grant_type": "refresh_token",
            "refresh_token": "{auth}"
          }
        }
      }
    }
    const google = purest({
      provider: 'google', config, defaults: {
        form: {
          client_id: auth.google.key,
          client_secret: auth.google.secret
        }
      }
    })
    try {
      const { body: { access_token } } = await google('refresh')
        .auth(refresh_token)
        .request()

      // store new token
      await strapi
        .query('plugin::users-permissions.user')
        .update({
          where: { id: user.id },
          data: {
            google: {
              accessToken: access_token,
              refreshToken: refresh_token
            }
          }
        });

      return access_token
    } catch (err) {
      // console.log(err)
      throw new Error('Cannot refresh token')
    }
  }
}
