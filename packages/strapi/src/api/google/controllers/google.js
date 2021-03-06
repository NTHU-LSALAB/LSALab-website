'use strict';

/**
 * A set of functions called "actions" for `google`
 */
const fs = require('fs');
const purest = require('purest');

const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: 'key.json',
    scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.photos.readonly',
    ],
});

const folderMapping = {
    'group meeting': '1g_Tx9n7wGu_Z3BT1Fug7kmdnVptnVNwl',
    photo: '0B1ClbR-jUXR9ODZrQWR4Sm9JTVE',
};

const calendar = google.calendar({
    version: 'v3',
    auth,
});

const calendarId = 'lsalab@lsalab.cs.nthu.edu.tw';

module.exports = {
    async getEvents(ctx) {
        try {
            let { year, month } = ctx.query;
            year = parseInt(year);
            month = parseInt(month);
            const startYear = month === 1 ? year - 1 : year;
            let startMonth = (((month - 1) % 12) + 12) % 12;
            if (startMonth === 0) startMonth = 12;
            const endYear = month === 12 ? year + 1 : year;
            let endMonth = (((month + 1) % 12) + 12) % 12;
            if (endMonth === 0) endMonth = 12;
            let pageToken;
            let returnItems = [];
            do {
                const {
                    data: { items, nextPageToken },
                } = await calendar.events.list({
                    calendarId,
                    pageToken,
                    singleEvents: true,
                    timeMin: `${startYear}-${startMonth}-01T00:00:00-08:00`,
                    timeMax: `${endYear}-${endMonth}-28T00:00:00-08:00`,
                    orderBy: 'startTime',
                });
                returnItems = returnItems.concat(items);
                pageToken = nextPageToken;
            } while (pageToken);
            ctx.body = returnItems;
        } catch (err) {
            ctx.body = err;
        }
    },
    async getFolders(ctx) {
        const folderName = ctx.query.folderName || 'group meeting';
        try {
            const drive = google.drive({
                version: 'v3',
                auth,
            });
            const {
                data: { id },
            } = await drive.files.get({
                fileId: folderMapping[folderName],
            });
            const folderId = id;
            const {
                data: { files },
            } = await drive.files.list({
                q: `'${folderId}' in parents`,
                fields: 'files/id, files/mimeType, files/name, files/webViewLink, files/modifiedTime, files/owners, files/parents',
            });
            const directories = [];

            const promiseList = [];
            if (!files) return directories;
            for (const file of files) {
                if (file.mimeType === 'application/vnd.google-apps.folder') {
                    promiseList.push(
                        new Promise((resolve) => {
                            if (folderName === 'photo') {
                                let preview = null;
                                let pageToken;
                                const getPreview = async (tryCount = 0) => {
                                    const {
                                        data: { files, nextPageToken },
                                    } = await drive.files.list({
                                        q: `'${file.id}' in parents`,
                                        pageSize: 2,
                                        pageToken,
                                        fields: 'files/id, files/thumbnailLink',
                                    });
                                    pageToken = nextPageToken;
                                    if (files && files[0]) {
                                        preview = files[0];
                                        return preview;
                                    }
                                    if (tryCount === 4) {
                                        return;
                                    } else {
                                        getPreview(tryCount + 1);
                                    }
                                };
                                getPreview().then(() => {
                                    directories.push({
                                        id: file.id,
                                        name: file.name,
                                        preview,
                                    });
                                    resolve();
                                });
                            } else {
                                directories.push({
                                    id: file.id,
                                    name: file.name,
                                });
                                resolve();
                            }
                        }),
                    );
                }
            }
            await Promise.all(promiseList);
            ctx.body = directories;
        } catch (err) {
            ctx.body = err;
        }
    },
    async getFiles(ctx) {
        try {
            const { folderId } = ctx.query;
            const drive = google.drive({
                version: 'v3',
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
                fields: 'files/id, files/mimeType, files/name, files/webViewLink, files/webContentLink, files/modifiedTime, files/owners, files/parents',
            });
            const _files = [];

            if (!files) return;
            for (const file of files) {
                if (file.mimeType !== 'application/vnd.google-apps.folder') {
                    _files.push(file);
                }
            }
            ctx.body = _files;
        } catch (err) {
            ctx.body = err;
        }
    },
    async getFile(ctx) {
        console.log(ctx);
        // const users = await strapi.plugin('users-permissions').service('user')
        //   .fetchAll(ctx.query.filters, populate);
        // console.log(users)
    },
    async createFile(ctx) {
        try {
            const { file } = ctx.request.files;
            if (!file) throw new Error('no file found');
            const { title, mimeType, folderId } = ctx.request.body;
            const accessToken = await checkToken(ctx.state.user);
            const drive = google.drive({
                version: 'v3',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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
                    fields: 'id, webViewLink, parents',
                },
                {
                    // Use the `onUploadProgress` event from Axios to track the
                    // number of bytes uploaded to this point.
                    // onUploadProgress(evt) {
                    // const progress = (evt.bytesRead / fileSize) * 100;
                    // readline.clearLine(process.stdout, 0);
                    // readline.cursorTo(process.stdout, 0);
                    // process.stdout.write(`${Math.round(progress)}% complete`);
                    // },
                },
            );
            ctx.body = data;
        } catch (err) {
            // console.log(err)
            ctx.response.status = 400;
            ctx.body = err;
        }
    },
    async updateFile(ctx) {
        const requestBody = ctx.request.body;
        const { fileId } = ctx.params;
        const accessToken = await checkToken(ctx.state.user);
        try {
            const drive = google.drive({
                version: 'v3',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { data } = await drive.files.update({
                fileId,
                requestBody,
            });
            ctx.body = data;
        } catch (err) {
            // console.log(err)
            ctx.response.status = 400;
            ctx.body = err;
        }
    },
    async deleteFile(ctx) {
        const { fileId } = ctx.params;
        const accessToken = await checkToken(ctx.state.user);
        try {
            const drive = google.drive({
                version: 'v3',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { data } = await drive.files.delete({
                fileId,
            });
            ctx.body = data;
        } catch (err) {
            console.log(err);
            ctx.response.status = 400;
            ctx.body = err;
        }
    },
};

const checkToken = async (user) => {
    const { accessToken: access_token, refreshToken: refresh_token } =
        user.google;
    try {
        // const { data } = google.oauth2().tokeninfo({ access_token })
        const google = purest({
            provider: 'google',
        });
        await google.get('oauth2/v3/tokeninfo').qs({ access_token }).request();

        // token is ok
        return access_token;
    } catch (e) {
        // accessToken is not valid, need refresh

        // setup purest
        const auth = await strapi
            .store({ type: 'plugin', name: 'users-permissions', key: 'grant' })
            .get();
        const config = {
            google: {
                refresh: {
                    origin: 'https://oauth2.googleapis.com',
                    path: 'token',
                    method: 'POST',
                    form: {
                        grant_type: 'refresh_token',
                        refresh_token: '{auth}',
                    },
                },
            },
        };
        const google = purest({
            provider: 'google',
            config,
            defaults: {
                form: {
                    client_id: auth.google.key,
                    client_secret: auth.google.secret,
                },
            },
        });
        try {
            const {
                body: { access_token },
            } = await google('refresh').auth(refresh_token).request();

            // store new token
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    google: {
                        accessToken: access_token,
                        refreshToken: refresh_token,
                    },
                },
            });

            return access_token;
        } catch (err) {
            // console.log(err)
            throw new Error('Cannot refresh token');
        }
    }
};
