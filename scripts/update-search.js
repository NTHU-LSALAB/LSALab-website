'use strict';

require('dotenv').config();

const algoliasearch = require('algoliasearch');
const { Client } = require('pg');

const client = algoliasearch(
    process.env.SEARCH_APP_ID,
    process.env.SEARCH_API_KEY,
);
const index = client.initIndex(process.env.SEARCH_INDEX);
index
    .clearObjects()
    .then(async () => {
        const client = new Client();
        await client.connect();
        const { rows: pubs } = await client.query(
            'SELECT *, publications.id as id, venues.name as venue from publications_venue_links inner join publications on publications.id = publications_venue_links.publication_id inner join venues on venues.id = publications_venue_links.venue_id',
        );
        const filteredPubs = pubs.map((pub) => ({
            title: pub.title,
            id: pub.id,
            venue_name: pub.venue_name,
            venue: pub.venue,
        }));
        index
            .saveObjects(filteredPubs, {
                autoGenerateObjectIDIfNotExist: true,
            })
            .then(console.log);
        const { rows: students } = await client.query(
            'SELECT *, students.name as name, students.id as id, grades.name as grade from students_grade_links inner join students on students.id = students_grade_links.student_id inner join grades on grades.id = students_grade_links.grade_id',
        );
        const filteredStudents = students.map((student) => ({
            name: student.name,
            en_name: student.en_name,
            id: student.id,
            grade: student.grade,
            interest: student.interest,
            thesis: student.thesis ? student.thesis.title : undefined,
        }));
        index
            .saveObjects(filteredStudents, {
                autoGenerateObjectIDIfNotExist: true,
            })
            .then(console.log);
    })
    .catch(console.error);
