import ClearIcon from '@mui/icons-material/Clear';import {IconButton, List, ListItem, ListItemText} from '@mui/material';

import useLocalStorageList from '../../shared/hooks/useLocalStorageList.ts';

export default function ShoppingList() {
    const {items, removeItem} = useLocalStorageList('supply-list');

    return (
        <List>
            {items.map(product => (
                <ListItem
                    key={product.id}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeItem(product.id)}>
                            <ClearIcon/>
                        </IconButton>
                    }
                >
                    <ListItemText
                        primary={product.name}
                    />
                </ListItem>
            ))}
        </List>
    );
}