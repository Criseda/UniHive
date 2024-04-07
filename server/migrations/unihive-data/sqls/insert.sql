/* Replace with your SQL commands */

-- INSERTING USERS INTO THE DATABASE
INSERT INTO app_user (id, first_name, last_name, rating, bio, avatar_path, banned)
VALUES 
('user01', 'John', 'Doe', NULL, 'I love hiking and reading.', '/images/default_pfp.jpg', FALSE),
('user02', 'Alice', 'Smith', NULL, 'Passionate about cooking and traveling.', '/images/default_pfp.jpg', FALSE),
('user03', 'Michael', 'Johnson', NULL, 'Tech enthusiast and avid gamer.', '/images/default_pfp.jpg', FALSE),
('user04', 'Emily', 'Brown', NULL, 'Artist and nature lover.', '/images/default_pfp.jpg', FALSE),
('user05', 'David', 'Wilson', NULL, 'Musician and sports fan.', '/images/default_pfp.jpg', FALSE),
-- insert evil Joe
('user06', 'Joe', 'Mama', NULL, 'I am evil', '/images/default_pfp.jpg', TRUE),
-- insert cris
('5c64d3', 'Laurentiu-Cristian', 'Preda', NULL, 'Lol kent minion lol', '/images/default_pfp.jpg', FALSE);



-- INSERTING AUCTIONS INTO THE DATABASE
INSERT INTO auction (seller_id, name, description, closing_date, image_path)
VALUES 
('user01', 'Mountain Bike', 'Brand new mountain bike for sale.', CURRENT_TIMESTAMP + INTERVAL '7 days', '/images/mountain_bike.jpg'),
('user02', 'Vintage Camera', 'Rare vintage camera in excellent condition.', CURRENT_TIMESTAMP + INTERVAL '7 days', '/images/vintage_camera.jpg'),
('user03', 'Gaming Laptop', 'Powerful gaming laptop with high-end specs.', CURRENT_TIMESTAMP + INTERVAL '7 days', '/images/gaming_laptop.jpg'),
('user04', 'Oil Painting', 'Beautiful oil painting of a serene landscape.', CURRENT_TIMESTAMP + INTERVAL '7 days', '/images/oil_painting.jpg'),
('user05', 'Electric Guitar', 'Professional electric guitar for music enthusiasts.', CURRENT_TIMESTAMP + INTERVAL '7 days', '/images/electric_guitar.jpg');

-- ADD THE IMAGES OF EACH OF THESE AUCTIONS TO AUCTION_IMAGE TABLE
INSERT INTO auction_image (auction_id, image_path)
VALUES 
(1, '/images/mountain_bike.jpg'),
(2, '/images/vintage_camera.jpg'),
(3, '/images/gaming_laptop.jpg'),
(4, '/images/oil_painting.jpg'),
(5, '/images/electric_guitar.jpg');

-- NOW INSERT THE OPENING BIDS OF THOSE AUCTIONS IN THE BID TABLE
INSERT INTO bid (bidder_id, auction_id, amount)
VALUES 
('user02', 1, 500.00),
('user03', 2, 300.00),
('user04', 3, 1200.00),
('user05', 4, 800.00),
('user01', 5, 600.00);

-- INSERTING SOME LISTINGS INTO THE DATABASE IN THE LISTING TABLE
INSERT INTO listing (seller_id, name, description, price, image_path)
VALUES 
('user01', 'Hiking Backpack', 'Durable hiking backpack with multiple compartments.', 50.00, '/images/hiking_backpack.jpg'),
('user02', 'Cookbook Collection', 'Collection of popular cookbooks for food lovers.', 30.00, '/images/cookbook_collection.jpg'),
('user03', 'Tech Gadgets Bundle', 'Assorted tech gadgets for tech enthusiasts.', 500.00, '/images/tech_gadgets.jpg'),
('user04', 'Art Supplies Set', 'Complete set of art supplies for aspiring artists.', 100.00, '/images/art_supplies.jpg'),
('user05', 'Sports Equipment Bundle', 'Bundle of sports equipment for sports enthusiasts.', 200.00, '/images/sports_equipment.jpg');

-- INSERT THE LISTING IMAGES INTO THE LISTING_IMAGE TABLE
INSERT INTO listing_image (listing_id, image_path)
VALUES 
(1, '/images/hiking_backpack.jpg'),
(2, '/images/cookbook_collection.jpg'),
(3, '/images/tech_gadgets.jpg'),
(4, '/images/art_supplies.jpg'),
(5, '/images/sports_equipment.jpg');