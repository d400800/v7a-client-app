import {useState} from 'react';

import {Product} from './Products.tsx';
import {useFetchData} from '../../shared/hooks/useFetchData.ts';
import {useDeleteData} from '../../shared/hooks/useMutateData.ts';

interface ProductsPageState {
    products: Product[],
    message: string
}

const ProductsPageInitialState = {
    products: [],
    message: ''
};

export function useProducts() {
    const [state, setState] = useState<ProductsPageState>(ProductsPageInitialState);

    const {error, isLoading} = useFetchData<Product[]>('products', {
        onSuccess(data) {
            setState((prevState) => ({
                ...prevState,
                products: data
            }));
        }
    });

    const {mutate: deleteData} = useDeleteData();

    function onDelete(id: string) {
        return deleteData(`api/products/${id}`, {
            onSuccess: (data) => {
                console.log('Item deleted successfully:', data);

                setState((prevState) => ({
                    ...prevState,
                    products: state.products.filter(p => p.id !== id),
                    message: 'Item deleted successfully.'
                }));
            },
            onError: (error) => {
                console.error('Failed to delete item:', error);
            }
        });
    }

    return {
        products: state.products,
        error,
        isLoading,
        onDelete
    };
}