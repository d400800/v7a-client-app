import {FormEvent, useState} from 'react';

import {ItemCreatorData, ItemCreatorState} from './types.ts';
import {useMutateData, usePatchData} from '../../shared/hooks/useMutateData.ts';

export function useItemCreator() {
    const [state, setState] = useState<ItemCreatorState>({
        open: false,
        message: '',
        severity: 'success'
    });

    const {mutate: create} = useMutateData();
    const {mutate: patch} = usePatchData();

    function onCreate(data: ItemCreatorData) {
        create(
            {data, url: 'api/products'},
            {
                onSuccess: (data) => {
                    console.log('Item created successfully:', data);

                    setState(prevState => ({
                        ...prevState,
                        open: true,
                        message: 'Item created successfully.',
                        severity: 'success'
                    }));
                },
                onError: (error) => {
                    console.error('Failed to create item:', error);

                    setState(prevState => ({
                        ...prevState,
                        open: true,
                        message: 'Failed to create item.',
                        severity: 'error'
                    }));
                }
            }
        );
    }

    function onEdit(data: ItemCreatorData, id: string) {
        patch(
            {data, url: `api/products/${id}`},
            {
                onSuccess: (data) => {
                    console.log('Item updated successfully:', data);

                    setState(prevState => ({
                        ...prevState,
                        open: true,
                        message: 'Item updated successfully.',
                        severity: 'success'
                    }));
                },
                onError: (error) => {
                    console.error('Failed to update item:', error);

                    setState(prevState => ({
                        ...prevState,
                        open: true,
                        message: 'Failed to update item.',
                        severity: 'error'
                    }));
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
        state,
        setState,
        onSubmit
    };
}