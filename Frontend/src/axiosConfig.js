import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000", //use this for local host
  baseURL: "https://todo-backend-beryl-psi.vercel.app",
});

export default instance;
