import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9090/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: `bearer ${localStorage.getItem("authToken")}`,
    "Access-Control-Allow-Origin": "*",
  },
});
