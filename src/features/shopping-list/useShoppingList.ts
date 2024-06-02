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
        return deleteData(`shopping-list/${id}`, {
            onSuccess: () => {
                setState((prevState) => ({
                    ...prevState,
                    shoppingListItems: prevState.shoppingListItems.filter(item => item.productId !== id)
                }));
            }
        });
    }

    const shareTodoList = () => {
        const todoText = state.shoppingListItems.map((item, index) => `${index + 1}. ${item.productTitle}`).join('\n');
        const message = `Shopping list:\n\n${todoText}`;

        // Encode the message to be URI-safe
        const encodedMessage = encodeURIComponent(message);

        // Construct the WhatsApp sharing URL
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

        // Open the WhatsApp sharing URL in a new window/tab
        window.open(whatsappUrl, '_blank');
    };

    return {
        state,
        error,
        isLoading,
        shareTodoList,
        onDeleteShoppingListItem
    };
}