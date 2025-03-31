import axios from "axios";

// const baseURL = "http://localhost:7777";
const baseURL = "https://fs-d0af.onrender.com";

export const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
