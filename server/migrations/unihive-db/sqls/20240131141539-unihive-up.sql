--this file will be used to create the tables in the database
--use the following command to put the database on your local machine
--command: db-migrate up

CREATE TABLE app_user (
    id CHAR(6) NOT NULL PRIMARY KEY, --unique username given by API, fixed 6 characters
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    rating INT, --rating of the user (calculated by averaging all reviews, init null)
    bio VARCHAR(255),
    avatar_path VARCHAR(255) NOT NULL, --url of the image for the avatar
    banned BOOLEAN DEFAULT FALSE, --if the user is banned
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auction (
    id SERIAL PRIMARY KEY,
    seller_id CHAR(6) NOT NULL, --profile of the seller
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    -- opening_bid will be replaced by a post request to create a bid
    -- opening_bid NUMERIC(12,2) NOT NULL,
    closing_date TIMESTAMP NOT NULL,
    image_path VARCHAR(255) NOT NULL, --url to image
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bid (
    id SERIAL PRIMARY KEY,
    bidder_id CHAR(6) NOT NULL,
    auction_id INT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bidder_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (auction_id) REFERENCES auction (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE listing (
    id SERIAL PRIMARY KEY,
    seller_id CHAR(6) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    image_path VARCHAR(255) NOT NULL, --url to image
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    sender_id CHAR(6) NOT NULL,
    receiver_id CHAR(6) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE messageRoom (
    id SERIAL PRIMARY KEY,
    user1 CHAR(6) NOT NULL,
    user2 CHAR(6) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user2) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- reviews table
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    reviewer_id CHAR(6) NOT NULL,
    reviewed_id CHAR(6) NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (reviewed_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- reports table
CREATE TABLE report (
    id SERIAL PRIMARY KEY,
    reporter_id CHAR(6) NOT NULL,
    reported_id CHAR(6) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reporter_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (reported_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- images tables (split because an image cannot be associated with both an auction and a listing at the same time)
CREATE TABLE listing_image (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL, --url to image
    listing_id INT REFERENCES listing (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auction_image (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL, --url to image
    auction_id INT REFERENCES auction (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE saved_auctions (
	id SERIAL PRIMARY KEY,
	user_id CHAR(6) NOT NULL,
	auction_id INT NOT NULL , --can take auction id
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (auction_id) REFERENCES auction (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE saved_listings (
	id SERIAL PRIMARY KEY,
	user_id CHAR(6) NOT NULL,
	listing_id INT NOT NULL , --can take listing id
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (listing_id) REFERENCES listing (id) ON DELETE CASCADE ON UPDATE CASCADE
);	
  

