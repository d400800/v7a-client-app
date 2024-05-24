import {useState} from 'react';

import {Product} from './Products.tsx';
import {useDeleteData, useFetchData} from '../../shared/hooks/useMutateData.ts';
import {NotificationState} from '../../shared/types.ts';

interface ProductsPageState extends NotificationState {
    products: Product[],
    collapseSet: Set<string>
}

export function useProducts() {
    const [state, setState] = useState<ProductsPageState>({
        products: [],
        open: false,
        message: '',
        severity: 'success',
        collapseSet: new Set()
    });

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
                    message: 'Item deleted successfully.',
                    open: true
                }));
            },
            onError: (error) => {
                console.error('Failed to delete item:', error);

                setState((prevState) => ({
                    ...prevState,
                    message: 'Failed to delete item.',
                    severity: 'error',
                    open: true
                }));
            }
        });
    }

    function handleCollapseClick(category: string) {
        const newCollapseSet = new Set(state.collapseSet);

        newCollapseSet.has(category) ? newCollapseSet.delete(category) : newCollapseSet.add(category);

        setState((prevState) => ({
            ...prevState,
            collapseSet: newCollapseSet
        }));
    }

    return {
        state,
        setState,
        error,
        isLoading,
        onDelete,
        handleCollapseClick
    };
}