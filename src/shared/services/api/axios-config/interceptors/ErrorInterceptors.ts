import { AxiosError } from "axios";

export const errorInterceptors = (error: AxiosError) => {

    if (error.message === 'Network Error') {
        return Promise.reject(new Error('Network error'));
    }

    // Standard return
    return Promise.reject(error);
}