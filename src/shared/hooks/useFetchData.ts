import axios from 'axios';
import {useQuery, UseQueryOptions, UseQueryResult} from 'react-query';

const FetchDataWrapper = <T>(url: string, options?: UseQueryOptions<T>): UseQueryResult<T> => {
    const fetchData = async (): Promise<T> => {
        try {
            const response = await axios.get(`api/${url}`); // Replace with your endpoint

            console.log(response);

            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
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
    };

    return useQuery<T>(['data', url], fetchData, options);
};

export const useFetchData = <T>(url: string, options?: UseQueryOptions<T>) => FetchDataWrapper<T>(url, options);