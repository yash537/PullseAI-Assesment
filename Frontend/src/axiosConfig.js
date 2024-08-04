import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Update this to match your backend URL
});

export default instance;
