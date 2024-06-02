import {FormEvent, useState} from 'react';

import {ItemCreatorData} from './types.ts';
import {OptionType} from '../../shared/components/CreatableAutocomplete.tsx';
import {usePostData, usePatchData, useFetchData} from '../../shared/hooks/useMutateData.ts';
import {useNotificationContext} from '../../shared/NotificationContext.tsx';
import {Product} from '../products/Products.tsx';

export function useItemCreator(product: Product) {
    const [category, setCategory] = useState<OptionType | null>(null);
    const [categories, setCategories] = useState<OptionType[]>([]);

    const notificationContext = useNotificationContext();
    const {mutate: create} = usePostData();
    const {mutate: patch} = usePatchData();

    const {error, isFetching} = useFetchData<Product[]>('products', {
        onSuccess(products: Product[]) {
            const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

            const categories = uniqueCategories.map(category => ({
                id: category,
                label: category,
                isSelected: category === product?.category
            }));

            setCategories(categories);
        }
    });

    function onCreate(data: ItemCreatorData) {
        create(
            {data, url: 'products'},
            {
                onSuccess: () => {
                    notificationContext.setContextValue({
                        message: 'Item created successfully.',
                        severity: 'success',
                        open: true
                    });
                },
                onError: (error) => {
                    notificationContext.setContextValue({
                        open: true,
                        message: 'Failed to create item.',
                        severity: 'error',
                        error
                    });
                }
            }
        );
    }

    function onEdit(data: ItemCreatorData, id: string) {
        patch(
            {data, url: `products/${id}`},
            {
                onSuccess: () => {
                    notificationContext.setContextValue({
                        message: 'Item created successfully.',
                        open: true,
                        severity: 'success'
                    });
                },
                onError: (error) => {
                    notificationContext.setContextValue({
                        open: true,
                        message: 'Failed to update item.',
                        severity: 'error',
                        error
                    });
                }
            }
        );
    }

    function onSubmit(event: FormEvent<HTMLFormElement>, data: ItemCreatorData, mode: string, id: string) {
        event.preventDefault();

        if (mode === 'create') {
            onCreate(data);
        }

        if (mode === 'edit') {
            onEdit(data, id);
        }
    }

    return {
        isFetching,
        onSubmit,
        categories,
        setCategory,
        category,
        error
    };
}