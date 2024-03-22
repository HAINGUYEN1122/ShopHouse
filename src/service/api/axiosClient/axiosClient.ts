import axios from "axios";
import queryString from "query-string";
import { BASE_URL } from "../env/env";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        //   history.push(`${ApplicationPaths.Login}`)
      }
  
      throw error;
    }
  );
  
  export default axiosClient;
  