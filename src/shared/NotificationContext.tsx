import {createContext, useContext, useState} from 'react';
import React from 'react';

import {AlertColor} from '@mui/material/Alert/Alert';

import Notification from './components/Notification.tsx';

interface MyComponentProps {
    children: React.ReactNode;
}

interface NotificationContextType {
    setContextValue: (newValue: Partial<NotificationContextState>) => void;
    state: NotificationContextState
}

interface NotificationContextState {
    open: boolean;
    severity: AlertColor;
    message: string;
    error?: unknown;
}

const initialContextState = {
    open: false,
    severity: 'success' as AlertColor,
    message: ''
};

const notificationContext = createContext<NotificationContextType>({
    setContextValue: () => {},
    state: initialContextState
});

export const NotificationContextProvider: React.FC<MyComponentProps> = ({children}) => {
    const [state, setState] = useState<NotificationContextState>(initialContextState);

    function setContextValue(newValue: Partial<NotificationContextState>) {
        if (newValue.error) {
            console.error(newValue.error);
        }

        setState(prevState => ({
            ...prevState,
            ...newValue
        }));
    }

    return (
        <notificationContext.Provider value={{state, setContextValue}}>
            {children}

            <Notification
                open={state.open}
                onClose={() => setState(prevState => ({...prevState, open: false}))}
                message={state.message}
                severity={state.severity}
            />
        </notificationContext.Provider>
    );
};

export function useNotificationContext() {
    return useContext(notificationContext);
}