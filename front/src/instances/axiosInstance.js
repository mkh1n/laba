import axios from "axios";

const CSRF_TOKEN = new RegExp(`XSRF-TOKEN=([^;]+)`)[1];
const instance = axios.create({
  headers: { "X-XSRF-TOKEN": CSRF_TOKEN }
});
export const AXIOS = instance;