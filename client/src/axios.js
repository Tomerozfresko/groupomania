import axios from "axios";

const devURL = "http://localhost:4200/api";

// const prodURL = "https://api-kappa-snowy.vercel.app/api"

/**
 * @description Helper function to create an axios instance request
 * @param {string} url
 * @returns {Promise}
 * @example makeRequest.get("/posts")
 */
export const makeRequest = axios.create({
  baseURL: devURL,
  withCredentials: true,
});
