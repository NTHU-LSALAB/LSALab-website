'use strict';

module.exports = {
    routes: [
        // calendar
        {
            method: 'GET',
            path: '/google/calendar/events',
            handler: 'google.getEvents',
            config: {
                policies: [],
                middlewares: [],
                auth: false,
            },
        },
        // folder
        {
            method: 'GET',
            path: '/google/drive/folders',
            handler: 'google.getFolders',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        // file
        {
            method: 'GET',
            path: '/google/drive/files',
            handler: 'google.getFiles',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/google/drive/files/:fileId',
            handler: 'google.getFile',
            config: {
                policies: [],
                middlewares: [],
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/google/drive/files',
            handler: 'google.createFile',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'PUT',
            path: '/google/drive/files/:fileId',
            handler: 'google.updateFile',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'DELETE',
            path: '/google/drive/files/:fileId',
            handler: 'google.deleteFile',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        // {
        //   method: 'GET',
        //   path: '/google/email',
        //   handler: 'google.sendMail',
        //   config: {
        //     auth: false
        //   }
        // }
    ],
};
