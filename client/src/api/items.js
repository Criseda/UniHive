const BASE_URL = 'http://localhost:5000/api/';

export function getItems() {
  return fetch(`${BASE_URL}/listings/`).then((res) => res.json());
  //TODO: CREATE A BACKEND ROUTE /ITEMS THAT COMBINES LISTINGS AND AUCTIONS
}

// add the rest of the functions here