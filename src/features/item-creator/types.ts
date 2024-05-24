import {NotificationState} from '../../shared/types.ts';

export interface ItemCreatorState extends NotificationState {}

export interface ItemCreatorData {
    unit: string | null;
    title: string | null;
    category: string | null;
    id?: string;
}

export interface ItemCreatorProps {
    mode: 'create' | 'edit';
}