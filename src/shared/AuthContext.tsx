import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import React from 'react';

import {useFetchData} from './hooks/useMutateData.ts';

interface MyComponentProps {
    children: React.ReactNode;
}

export enum Status {
    Idle = 'IDLE',
    Loading = 'LOADING',
    Success = 'SUCCESS',
    Error = 'ERROR'
}

interface AuthContextType {
    data: any; // Adjust the type as needed
    error: unknown | null; // Error handling
    isLoading: boolean;
    status: Status,
    setContextValue: Dispatch<SetStateAction<AuthContextType>>;
}

const initialContext = {
    data: {},
    error: null,
    isLoading: true,
    status: Status.Idle,
    setContextValue: () => {}
};

const authContext = createContext<AuthContextType>(initialContext);

export const AuthContextProvider: React.FC<MyComponentProps> = ({children}) => {
    const {data, error, isLoading} = useFetchData('auth/profile');
    const [contextValue, setContextValue] = useState<AuthContextType>(initialContext);

    useEffect(() => {
        const status = isLoading ? Status.Loading : error ? Status.Error : Status.Success;

        setContextValue({data, error, isLoading, status, setContextValue});
    }, [data, error, isLoading]);

    return (
        <authContext.Provider value={contextValue}>
            {children}
        </authContext.Provider>
    );
};

export function useAuthContext() {
    return useContext(authContext);
}