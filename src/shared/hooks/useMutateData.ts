import axios from 'axios';
import {useMutation, UseMutationResult} from 'react-query';

interface MutateDataProps<T> {
    data: T;
    url: string;
}

const mutateData = async <T, R>({data, url}: MutateDataProps<T>): Promise<R> => {
    const response = await axios.post<R>(url, data);

    return response.data;
};

const patchData = async <T, R>({data, url}: MutateDataProps<T>): Promise<R> => {
    const response = await axios.patch<R>(url, data);

    return response.data;
};

const deleteData = async (url: string): Promise<string> => {
    const response = await axios.delete(url);

    console.log(response.data);

    return response.data;
};

export const useMutateData = <T, R>(): UseMutationResult<R, unknown, MutateDataProps<T>, unknown> => useMutation<R, unknown, MutateDataProps<T>, unknown>(mutateData);
export const usePatchData = <T, R>(): UseMutationResult<R, unknown, MutateDataProps<T>, unknown> => useMutation<R, unknown, MutateDataProps<T>, unknown>(patchData);
export const useDeleteData = (): UseMutationResult<string, unknown, string, unknown> => useMutation(deleteData);