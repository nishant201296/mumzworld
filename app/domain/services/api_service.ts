import axios from "axios";

const productApi = axios.create({
  baseURL: "https://storage.googleapis.com/mumzrn",
  headers: {
    "Content-Type": "application/json",
  },
});

export { productApi };
