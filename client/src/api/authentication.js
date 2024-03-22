
const BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST || "localhost"}:5000/auth`;

export const logoutRoute = `${BASE_URL}/logout`;

export const loginRoute = `${BASE_URL}/login`;