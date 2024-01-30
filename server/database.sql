CREATE DATABASE unihive; -- to create the database if you have not already

-- Path: server/database.sql

-- users BUY items
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(6) NOT NULL UNIQUE, --unique username given by API, 6 characters(i think)
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- profiles SELL items
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE, --profile tied to user (1-1 relationship)
    rating INT, --rating of the user (calculated by averaging all reviews, init null)
    bio VARCHAR(255),
    avatar_path VARCHAR(255) NOT NULL, --url of the image for the avatar
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE auction (
    id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL, --profile of the seller
    winning_bid_id INT, --highest bid on the auction
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    opening_bid INT NOT NULL,
    closing_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES profile (id) ON DELETE CASCADE ON UPDATE CASCADE, --auctions tied to profile not the user
    FOREIGN KEY (winning_bid_id) REFERENCES bid (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bid (
    id SERIAL PRIMARY KEY,
    bidder_id INT NOT NULL,
    auction_id INT NOT NULL,
    amount INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bidder_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (auction_id) REFERENCES auction (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE listing (
    id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES profile (id) ON DELETE CASCADE ON UPDATE CASCADE--buynow tied to profile not the user
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL, --this may have to change depending on how long messages are
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);


--review table in the future?
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    reviewer_id INT NOT NULL,
    reviewee_id INT NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (reviewee_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- reports table
CREATE TABLE report (
    id SERIAL PRIMARY KEY,
    reporter_id INT NOT NULL,
    reported_id INT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reporter_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (reported_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- images table
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL, --url to image
    listing_id INT REFERENCES listing (id) ON DELETE CASCADE ON UPDATE CASCADE,
    auction_id INT REFERENCES auction (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


