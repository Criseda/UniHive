# Alex Mote @ 12th Feb 2024:
- Added bootstrap to public HTML
- Added frontend Routes to App.jsx
- Added new Itemlist, Navbar and Search components
- Configured Home.jsx route to use the new components.

# Laurentiu Cristian Preda @ 19th Feb 2024:
- Added placeholder images in /public/images folder
- Integrated CORS support to backend server (was already installed, no need to run npm i)
- Revised database, combined app_user and profile tables. Other small tweaks, see history
- Added API integration to pull images from the backend and show them to Itemlist.jsx component, which in turn shows them in the Home.jsx route

# Laurentiu Cristian Preda @ 5th Mar 2024 (auth_conn):
- please run `npm install` on /client and /server
- please create a .env file inside the /server folder, with the following code:
```
JWT_SECRET=super_secret_JWT_key
SESSION_SECRET=super_secret_SESSION_key
```
- Refined user authentication. It is now connected to the frontend
- Backend signs a token after authentcation, and sends it to the frontend via a cookie to authHandler.jsx
- authHandler.jsx takes the cookie from the header and stores it in localStorage
- in App.jsx, there is a useState that sets a boolean authentication variable to true or false based on whether the token is in localstorage or not, after a checkAuth request from backend

# Laurentiu Cristian Preda @ 5th Mar 2024 (itemjsx_middleware):
- please run `npm install` on /client
- Made the component use react-bootstrap with the Carousel component

# Laurentiu Cristian Preda @ 6th Mar 2024 (itemjsx_middleware):
- refactored Itemlist. The item list only used to pull listings, now it pulls all items (listings and auctions), sorted by newest created
- due to this change, the params given to /item needed to be changed. they are now represented by itemType + itemID. e.g auctionid1, listingid3, auctionid4, etc...
- Added conditional rendering to Item.jsx to render auctions and listings differently.
- Moved a lot of HTML out of Item.jsx, and spread it out into components (ItemDetails, AuctionCountdown, AuctionBidCount)
- These components can be used into other routes which have to render items, e.g SavedItems.
- Some bugfixes, fixing a double slash error within url redirects, fixing grammar on some routes, along with other stuff
- Added option to use a .env file if you want to run the application on your local network
- Just make a .env file inside /client, with `REACT_APP_IP_ADDRESS:xxx.xxx.xxx.xxx` within it.
- This is if you want to check how the application works on other devices that are connected to the network e.g phones.

# Cristian Preda @ 22nd Mar 2024
## Develop quality of life commit 2:
- Added `.env.example` file for `/client` and `/server`. Paste the contents into a `.env` file in the same directory as the example and that will initialise the environment variables for the application

# Cristian Preda @ 23 Mar 2024
## auction-modal:
- Added AuctionModal.jsx This modal will pop up when the Make Bid message is shown on an item button.
- The modal will allow the user to submit their own bid on the auction.
- Leverages AuctionBidIncrement.js which calculates the step which you can bid on auctions (logic is the same as eBay's)

## notes for me later:
- send post req to backend. Also add the auction to the saved item list if havent done already.
- implement a little notification thing? to signal when the auction ended, if you have won it or not. (would probably need a new page altogether, or maybe another modal, a notification box or something like that.)

## Other changes:
- Greatly simplified ItemDetails.jsx code. It became very cluttered with the image carousel and all the button implementations.
- I have abstracted a lot of components that used to be in ItemDetails into their own separate components for ease of readability and debugging
- New components: SaveItemButton, ItemInfo, AuctionBidIncrement