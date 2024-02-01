## Cristian Preda @ 1st Feb 2024
Database commit:
- created first iteration of database schema
- set up database migration for the database
- added 2 more node packages for server side: db-migrate, db-migrate-pg
- be sure to run `npm install` after pulling this commit on the server side
- be sure to have the unihive database and user in postgres
- run the following command to install the tables in the database: `db-migrate up`
- run the following command to delete the tables from the database: `db-migrate down`
- alternate command to delete the tables from the database: `db-migrate reset`