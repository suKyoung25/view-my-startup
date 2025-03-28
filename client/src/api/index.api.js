import axios from "axios";

const baseURL = "http://localhost:7777";

export const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
