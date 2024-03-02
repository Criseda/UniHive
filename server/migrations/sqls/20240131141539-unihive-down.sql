--this is the down migration for the unihive database
--this will drop(delete) all the tables in the database
--use the following command to delete the tables from your local machine
--command: db-migrate down
--alternative command if that doesn't work: db-migrate reset

DROP TABLE IF EXISTS saved_items;

DROP TABLE IF EXISTS auction_image;

DROP TABLE IF EXISTS listing_image;

DROP TABLE IF EXISTS report;

DROP TABLE IF EXISTS review;

DROP TABLE IF EXISTS message;

DROP TABLE IF EXISTS listing;

DROP TABLE IF EXISTS bid;

DROP TABLE IF EXISTS auction;

DROP TABLE IF EXISTS profile;

DROP TABLE IF EXISTS app_user;



