import {useState} from 'react';

import {Product} from './Products.tsx';
import {useDeleteData, useFetchData, usePostData} from '../../shared/hooks/useMutateData.ts';
import {useNotificationContext} from '../../shared/NotificationContext.tsx';
import {ShoppingListItem} from '../../shared/types.ts';

interface ProductsPageState {
    products: Product[],
    shoppingList: ShoppingListItem[],
    collapseSet: Set<string>
}

export function useProducts() {
    const notificationContext = useNotificationContext();

    const [state, setState] = useState<ProductsPageState>({
        products: [],
        shoppingList: [],
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

    const {error: errorShoppingList, isLoading: isLoadingShoppingList} = useFetchData<ShoppingListItem[]>('shopping-list', {
        onSuccess(data) {
            setState((prevState) => ({
                ...prevState,
                shoppingList: data
            }));
        }
    });

    const {mutate: deleteData} = useDeleteData();
    const {mutate: postData} = usePostData<ShoppingListItem, ShoppingListItem>();

    function onDeleteProduct(id: string) {
        return deleteData(`products/${id}`, {
            onSuccess: () => {
                setState((prevState) => ({
                    ...prevState,
                    products: state.products.filter(p => p.id !== id)
                }));

                notificationContext.setContextValue({
                    message: 'Item deleted successfully.',
                    severity: 'success',
                    open: true
                });
            },
            onError: (error) => {
                notificationContext.setContextValue({
                    message: 'Failed to delete item.',
                    severity: 'error',
                    open: true,
                    error
                });
            }
        });
    }

    function onDeleteShoppingListItem(productId: string) {
        return deleteData(`shopping-list/${productId}`, {
            onSuccess: () => {
                setState((prevState) => ({
                    ...prevState,
                    shoppingList: state.shoppingList.filter(item => item.productId !== productId)
                }));

                notificationContext.setContextValue({
                    message: 'Item deleted successfully.',
                    severity: 'success',
                    open: true
                });
            },
            onError: (error) => {
                notificationContext.setContextValue({
                    message: 'Failed to delete item.',
                    severity: 'error',
                    open: true,
                    error
                });
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

    function addItem(productId: string, amount: number) {
        postData({
            data: {productId, amount},
            url: 'shopping-list',
            onSuccess: (data: ShoppingListItem) => {
                setState((prevState) => ({
                    ...prevState,
                    shoppingList: [
                        ...prevState.shoppingList,
                        {
                            productId: data.productId,
                            amount: data.amount
                        }
                    ]
                }));
            }
        });
    }

    function isDataLoading() {
        return isLoading && isLoadingShoppingList;
    }

    function isDataError() {
        return error && errorShoppingList;
    }

    function isInList(productId: string, shoppingList: ShoppingListItem[]): boolean {
        const item = shoppingList.find(item => item.productId === productId);

        return !!item;
    }

    return {
        state,
        setState,
        isDataError,
        isDataLoading,
        onDeleteProduct,
        addItem,
        isInList,
        handleCollapseClick,
        onDeleteShoppingListItem
    };
}