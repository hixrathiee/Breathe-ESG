import axios from "axios";

const API = axios.create({
  baseURL: "https://breathe-esg-9vua.onrender.com",
});

export default API;
