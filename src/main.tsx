import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import './index.css';

import ItemCreator from './features/item-creator/ItemCreator.tsx';
import Layout from './features/layout/Layout.tsx';
import LoginPage from './features/layout/LoginPage.tsx';
import Products from './features/products/Products.tsx';
import ShoppingList from './features/shopping-list/ShoppingList.tsx';
import {AuthContextProvider} from './shared/AuthContext.tsx';
import {NotificationContextProvider} from './shared/NotificationContext.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Products/>
            },
            {
                path: '/supply-list',
                element: <ShoppingList/>
            },
            {
                path: '/item-creator',
                element: <ItemCreator mode="create"/>
            },
            {
                path: '/item-editor',
                element: <ItemCreator mode="edit"/>
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
                <AuthContextProvider>
                    <RouterProvider router={router} />
                </AuthContextProvider>
            </NotificationContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);