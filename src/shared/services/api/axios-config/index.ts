import axios from "axios";
import { errorInterceptors, responseInterceptors } from "./interceptors";

const Api = axios.create({
    baseURL: ''
});

Api.interceptors.response.use(
    (response) => responseInterceptors(response),
    (error) => errorInterceptors(error),
);

export { Api }
