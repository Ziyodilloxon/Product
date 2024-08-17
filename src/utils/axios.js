import axios from "axios";

let mainURL = "https://dummyjson.com";
export const axionsClient = axios.create({
  baseURL: mainURL,
});

export default axionsClient;
