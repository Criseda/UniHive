const BASE_URL = '/auth';

const AUTHENTICATION_SERVICE_URL =
  "http://studentnet.cs.manchester.ac.uk/authenticate/";
const AUTHENTICATION_LOGOUT_URL =
  "http://studentnet.cs.manchester.ac.uk/systemlogout.php";
const ENCODED_DEVELOPER_URL = "http://localhost:5000/auth/";

export function authLogin(){
  window.location.href = `${BASE_URL}/login`;
  //return fetch(`${BASE_URL}/login`).then((res) => res.json())
}

export function authLogout(){
  window.location.href = `${BASE_URL}/logout`;
  //return fetch(`${BASE_URL}/logout`).then((res) => res.json());
}

export function checkAuth(){
  return fetch(`${BASE_URL}/session`).then((res) => res.json());
}

