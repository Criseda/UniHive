--this file will be used to create the tables in the database
--use the following command to put the database on your local machine
--command: db-migrate up

CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    username CHAR(6) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    rating INT,
    bio VARCHAR(255),
    avatar_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE auction (
    id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    opening_bid INT NOT NULL,
    closing_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES profile (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bid (
    id SERIAL PRIMARY KEY,
    bidder_id INT NOT NULL,
    auction_id INT NOT NULL,
    amount INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bidder_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (auction_id) REFERENCES auction (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE listing (
    id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES profile (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    reviewer_id INT NOT NULL,
    reviewee_id INT NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (reviewee_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE report (
    id SERIAL PRIMARY KEY,
    reporter_id INT NOT NULL,
    reported_id INT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reporter_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (reported_id) REFERENCES app_user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE listing_image (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL,
    listing_id INT REFERENCES listing (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auction_image (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL,
    auction_id INT REFERENCES auction (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);