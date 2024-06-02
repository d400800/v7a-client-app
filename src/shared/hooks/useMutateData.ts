import {AxiosResponse, isAxiosError} from 'axios';
import {useMutation, UseMutationResult, useQuery, UseQueryOptions, UseQueryResult} from 'react-query';

import {axiosInstance as axios} from '../axios-instance.ts';

let apiBaseUrl = import.meta.env.VITE_API_URL;

console.log(apiBaseUrl);

if (import.meta.env.MODE === 'development') {
    apiBaseUrl = '/api';
}

interface MutateDataProps<T> {
    data: T;
    url: string;
    onSuccess?: (data: T) => void;
}

interface PostDataProps<T, R> {
    data: T;
    url: string;
    onSuccess?: (data: R) => void;
    onError?: (error: unknown) => void;
}

const mutateData = async <T, R>({data, url, onSuccess, onError}: PostDataProps<T, R>): Promise<R> => {
    try {
        const response: AxiosResponse<R> = await axios.post<R>(`${apiBaseUrl}/${url}`, data);

        if (onSuccess) {
            onSuccess(response.data);
        }

        return response.data;
    } catch (err) {
        if (onError) {
            onError(err);
        }
        handleError(err);
        throw err; // Rethrow the error to ensure the function always returns a value of type R
    }
};

const patchData = async <T, R>({data, url}: MutateDataProps<T>): Promise<R> => {
    try {
        const response = await axios.patch<R>(`${apiBaseUrl}/${url}`, data);

        return response.data;
    } catch (err) {
        handleError(err);

        throw err; // Rethrow the error to ensure the function always returns a value of type R
    }
};

const deleteData = async (url: string): Promise<string> => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${url}`);

        return response.data;
    } catch (err) {
        handleError(err);

        throw err; // Rethrow the error to ensure the function always returns a value of type R
    }
};

const FetchDataWrapper = <T>(url: string, options?: UseQueryOptions<T>): UseQueryResult<T> => {
    const fetchData = async (): Promise<T> => {
        try {
            const response = await axios.get(`${apiBaseUrl}/${url}`); // Replace with your endpoint

            return response.data;
        } catch (err) {
            handleError(err);

            throw err; // Rethrow the error to ensure the function always returns a value of type R
        }
    };

    return useQuery<T>(['data', url], fetchData, options);
};

function handleError(err: unknown) {
    if (isAxiosError(err)) {
        if (err.response) {
            // Server responded with a status other than in the 2
            const status = err.response.status;

            if (status === 401) {
                // Handle 401 Unauthorized
                throw new Error('Unauthorized access - please log in.');
            } else if (status === 404) {
                // Handle 404 Not Found
                throw new Error('Data not found.');
            } else {
                // General error message for other status codes
                throw new Error(`An error occurred: ${err.response.statusText}.`);
            }
        } else {
            // Handle case where the server didn't respond
            throw new Error('Server did not respond. Please try again later.');
        }
    } else {
        // If the error is not from Axios
        throw new Error('An unknown error occurred.');
    }
}

export const usePostData = <T, R>(): UseMutationResult<R, unknown, PostDataProps<T, R>, unknown> =>
    useMutation<R, unknown, PostDataProps<T, R>, unknown>(mutateData);
//export const usePostData = <T, R>(): UseMutationResult<R, unknown, MutateDataProps<T>, unknown> => useMutation<R, unknown, MutateDataProps<T>, unknown>(mutateData);
export const usePatchData = <T, R>(): UseMutationResult<R, unknown, MutateDataProps<T>, unknown> => useMutation<R, unknown, MutateDataProps<T>, unknown>(patchData);
export const useDeleteData = (): UseMutationResult<string, unknown, string, unknown> => useMutation(deleteData);

export const useFetchData = <T>(url: string, options?: UseQueryOptions<T>) => FetchDataWrapper<T>(url, options);