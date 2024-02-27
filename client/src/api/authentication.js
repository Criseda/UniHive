const BASE_URL = 'http://localhost:5000/auth/';

export function Login(){
  return fetch(`${BASE_URL}/login`).then((res) => res.json());
}

export function Validate(){
  return fetch(`${BASE_URL}/`).then((res) => res.json());
}

export function Dashboard(){
  return fetch(`${BASE_URL}/dashboard`).then((res) => res.json());
}

export function Logout(){
  return fetch(`${BASE_URL}/logout`).then((res) => res.json());
}

