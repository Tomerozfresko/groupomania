import axios from "axios";

const devURL = "http://localhost:4200/api";

// const prodURL = "https://api-kappa-snowy.vercel.app/api"

export const makeRequest = axios.create({
  baseURL: devURL,
  withCredentials: true,
});
