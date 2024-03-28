--this is the down migration for the unihive database
--this will drop(delete) all the tables in the database
--use the following command to delete the tables from your local machine
--command: db-migrate down
--alternative command if that doesn't work: db-migrate reset

DROP TABLE IF EXISTS saved_auctions CASCADE;

DROP TABLE IF EXISTS saved_listings CASCADE;

DROP TABLE IF EXISTS bid CASCADE;

DROP TABLE IF EXISTS auction_image CASCADE;

DROP TABLE IF EXISTS listing_image CASCADE;

DROP TABLE IF EXISTS report CASCADE;

DROP TABLE IF EXISTS review CASCADE;

DROP TABLE IF EXISTS message CASCADE;

DROP TABLE IF EXISTS listing CASCADE;

DROP TABLE IF EXISTS profile CASCADE;

DROP TABLE IF EXISTS auction CASCADE;

DROP TABLE IF EXISTS app_user CASCADE;





