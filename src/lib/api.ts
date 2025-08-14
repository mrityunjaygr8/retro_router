import axios from "axios";
// const BASE_URL = "https://dev.parham.in";
const BASE_URL = "http://localhost:8000";

let api = axios.create({ baseURL: BASE_URL });
const setHeader = (key: string, value: string) => {
  api.defaults.headers.common[key] = value;
};

const unsetHeader = (key: string) => {
  delete api.defaults.headers.common[key];
};
export { setHeader, unsetHeader };
export default api;
