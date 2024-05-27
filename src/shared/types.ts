import {AlertColor} from '@mui/material/Alert/Alert';

export interface NotificationState {
    open: boolean;
    message: string;
    severity: AlertColor;
}

export interface ShoppingListItem {
    productId: string;
    productTitle?: string;
    amount: number;
}