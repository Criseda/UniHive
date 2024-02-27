const BASE_URL = 'http://localhost:5000/auth/';

export function Login(){
  return fetch(`${BASE_URL}/login`).then((res) => res.json());
}

export function Logout(){
  return fetch(`${BASE_URL}/logout`).then((res) => res.json());
}

export function checkAuth(){
  return fetch(`${BASE_URL}/session`)
    .then((res) => res.json())
    .then((data) => {
      if (data.authenticated) {
        return true;
      } else {
        return false;
      }
    });
}

