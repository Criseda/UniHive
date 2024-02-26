const BASE_URL = 'http://localhost:5000/api/';

export function getItems() {
  return fetch(`${BASE_URL}/listings/`).then((res) => res.json());
  //TODO: CREATE A BACKEND ROUTE /ITEMS THAT COMBINES LISTINGS AND AUCTIONS
}

export function getItem(id) {
  return fetch(`${BASE_URL}/listings/${id}`).then((res) => res.json());
}

// add the rest of the functions here