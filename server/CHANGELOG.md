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

## Cristian Preda @ 2nd Feb 2024
RESTFUL API commit:
- make sure to run these commands after pulling this commit on the server side: `npm install`, `db-migrate down`, `db-migrate up`.
- renamed index.js to app.js. To run the server, use the following command: `nodemon app.js`
- added the first iteration of the RESTFUL API
- to send a request to the server, use the following URL: `http://localhost:5000/api/route/`, where route is the name of the route e.g `http://localhost:5000/api/users/`
- use Postman to send requests to the server and test the API. The server is not yet connected to the frontend
- added skeleton for the following route: messages
- some minimal database changes. Includes: changing some foreign key references between report and review tables. Changing the type of money attributes from integer to decimal(2.dp).

## Cristian Preda @ 22nd Feb 2024
auth_api commit:
- Make sure to run this commands after pulling this commit on the server side: `npm i`.
- Added two new node packages: express-session and axios
- Added auth route to app.js
- Added ticketGenerator.js - this will generate a random string of characters that get checked upon login
- Added auth.js - This creates routes which allow login functionality

## Cristian Preda @ 6th Mar 2024
Item_refine commit:
- Make sure to run these commands after pulling this commit on the server side: `db-migrate down` & `db-migrate up`
- Unfortunately, this commit changes the database again (sigh)
- Removed the opening_bid field from the auctions table, it is not needed anymore. I changed the philosophy of how the bids interact with auctions in the backend
- Don't worry, when you do Postman POST request for /auctions, you still use opening_bid in the body
- Everytime a new auction is made, a bid is created where bidder_id = seller_id and amount = opening_bid
- I changed the GET routes to cleverly respond with the highest bidder, referenced by highest_bid
- Last but not least, I made an option to use environment variables if you want to specify your PC's local network address when starting the server
- This is if u want to test the app on a phone, for example
- just be sure to add it in the /server/.env file: `IP_ADDRESS:xxx.xxx.xxx.xxx`