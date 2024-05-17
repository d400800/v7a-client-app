import axios from 'axios';
import {useMutation} from 'react-query';

const mutateData = async ({data, url}: { data: any; url: string }) => {
    const response = await axios.post(url, data);

    return response.data;
};

export const useMutateData = () => useMutation(mutateData);