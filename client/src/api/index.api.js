// import axios from "axios";

// const baseURL = "http://localhost:7777";
// export const client = axios.create({ baseURL });

// const api = {
//   company,
//   investment,
// };

// src/api/index.api.js

import axios from "axios";

const baseURL = "http://localhost:7777";

export const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
