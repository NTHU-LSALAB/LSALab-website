'use strict';

const createJournal = async () =>
    /** Creates a new journal and push to database */
    strapi.service('api::journal.journal').create({
        data: {
            type: 'Journal',
            title: 'Test',
            link: 'http://example.com',
            deadline: '2022-03-31',
            ranking: 'S',
        },
    });
module.exports = {
    createJournal,
};
