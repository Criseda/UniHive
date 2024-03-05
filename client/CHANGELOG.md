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

# Laurentiu Cristian Preda @ 5th Mar 2024:
- please create a .env file inside the /server folder, with the following code:
```
JWT_SECRET=super_secret_JWT_key
SESSION_SECRET=super_secret_SESSION_key
```
- Refined user authentication. It is now connected to the frontend
- Backend signs a token after authentcation, and sends it to the frontend via a cookie to authHandler.jsx
- authHandler.jsx takes the cookie from the header and stores it in localStorage
- in App.jsx, there is a useState that sets a boolean authentication variable to true or false based on whether the token is in localstorage or not, after a checkAuth request from backend