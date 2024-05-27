import {FormEvent} from 'react';

import {ItemCreatorData} from './types.ts';
import {usePostData, usePatchData} from '../../shared/hooks/useMutateData.ts';
import {useNotificationContext} from '../../shared/NotificationContext.tsx';

export function useItemCreator() {
    const notificationContext = useNotificationContext();
    const {mutate: create} = usePostData();
    const {mutate: patch} = usePatchData();

    function onCreate(data: ItemCreatorData) {
        create(
            {data, url: 'api/products'},
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
            {data, url: `api/products/${id}`},
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
        onSubmit
    };
}