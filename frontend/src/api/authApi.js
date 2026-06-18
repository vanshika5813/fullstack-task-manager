import axios from "axios";

const API = axios.create({
  baseURL: "https://fullstack-task-manager-obpn.onrender.com/api"
});

export default API;