# first_group_project

PLEASE FOLLOW THIS GIT BRANCHING STRATEGY BEFORE ANY COMMIT!!!!!!!:
<https://www.abtasty.com/blog/git-branching-strategies/>

## Team Project dependencies

- Install node (this includes NPM)
  <https://nodejs.org/en/download>
- Install PostgreSQL (UNTICK PGADMIN FROM INSTALLATION!!)
  <https://www.postgresql.org/download/>
- Install latest pgAdmin
  <https://www.pgadmin.org/download/>
- Install Postman (app for simulating HTTP methods and database interaction)
  <https://www.postman.com/downloads/>

### NPM GLOBAL INSTALLS

Run terminal as administrator (if on Windows)
Otherwise, add 'sudo' before each install (Mac, Linux)

```bash
npm install -g nodemon
npm install -g db-migrate
npm install -g db-migrate-pg
npm update -g npm
```

## COMMANDS TO RUN AFTER GLOBAL INSTALLS

```bash
cd server
npm install
cd ..
cd client
npm install

```

START the servers:

```bash
cd server
npm start
cd ..
cd client
npm start
```

If there are any errors whatsapp me, there shouldn't be.

## POSTGRES DATABASE SETUP

run the psql script, login with your postgres account(copy what parameters it tells u to write)
once logged in, enter the following commands:

```bash
CREATE USER unihive WITH PASSWORD 'unihiveftw';
\du
```

The user unihive should pop up next to postgres, however, it has no permissions.
Let's give it superuser permissions.

```bash
ALTER USER unihive SUPERUSER;
\du
```

unihive user should now have superuser permissions.
We will now switch to the unihive user and create the database

```bash
SET ROLE unihive;
CREATE DATABASE unihive;
\l
```

You should now see a new database 'unihive', with the owner being 'unihive', as opposed to postgres

## COMMANDS TO RUN AFTER SETTING UP THE DATABASE

Now it's time to create the tables in the database. open a terminal and run the following command:

```bash
cd server
npm run create-db
```

To insert dummy data into the database, run the following command:

```bash
cd server
npm run insert-data
```

To delete the tables (if need be at any point), run the following command:

```bash
cd server
npm run drop-db
```

## SET UP ENVIRONMENT VARIABLES

Now that the database is set up and created on the local machine, let's set up the environment variables.
Check `.env.example` file in both client and server. Copy what is in `.env.example`, then in the same directory create a `.env` file. Paste the example variables into the `.env`. You can leave the SESSION and the JWT variables the example variables while testing. But in production build we will need to provide the app cryptographically random keys for those variables.

## Name

First Year Team Project

## Description

Our first year team project for the University of Manchester.

## Support

Contact @criseda

## Project status

Completed
