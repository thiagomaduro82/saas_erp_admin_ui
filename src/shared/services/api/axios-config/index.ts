import axios from "axios";
import { errorInterceptors, responseInterceptors } from "./interceptors";
import { Environment } from "../../../environment";

const Api = axios.create({
    baseURL: Environment.BASE_URL
});

Api.interceptors.response.use(
    (response) => responseInterceptors(response),
    (error) => errorInterceptors(error),
);

export { Api }
