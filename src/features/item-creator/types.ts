import {AlertColor} from '@mui/material/Alert/Alert';

export interface ItemCreatorState {
    open: boolean,
    message: string;
    severity: AlertColor;
}

export interface ItemCreatorData {
    unit: string | null;
    title: string | null;
    category: string | null;
    id?: string;
}

export interface ItemCreatorProps {
    mode: 'create' | 'edit';
}