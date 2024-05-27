import {useState} from 'react';

import {useDeleteData, useFetchData} from '../../shared/hooks/useMutateData.ts';
import {ShoppingListItem} from '../../shared/types.ts';

interface ShoppingListState {
    shoppingListItems: ShoppingListItem[]
}
export default function useShoppingList() {
    const [state, setState] = useState<ShoppingListState>({
        shoppingListItems: []
    });

    const {error, isLoading} = useFetchData<ShoppingListItem[]>('shopping-list', {
        onSuccess(data) {
            setState((prevState) => ({
                ...prevState,
                shoppingListItems: data
            }));
        }
    });

    const {mutate: deleteData} = useDeleteData();

    function onDeleteShoppingListItem(id: string) {
        return deleteData(`api/shopping-list/${id}`, {
            onSuccess: () => {
                setState((prevState) => ({
                    ...prevState,
                    shoppingListItems: prevState.shoppingListItems.filter(item => item.productId !== id)
                }));
            }
        });
    }

    return {
        state,
        error,
        isLoading,
        onDeleteShoppingListItem
    };
}