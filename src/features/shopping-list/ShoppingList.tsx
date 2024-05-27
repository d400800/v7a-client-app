
import ClearIcon from '@mui/icons-material/Clear';
import {Box, CircularProgress, IconButton, List, ListItem, ListItemText, Typography} from '@mui/material';

import useShoppingList from './useShoppingList.ts';

export default function ShoppingList() {
    const {state, error, isLoading, onDeleteShoppingListItem} = useShoppingList();

    if (error) {
        return (
            <Box mx="auto" textAlign="center" py={10}>
                <Typography>Something went wrong. Please, try again later.</Typography>
            </Box>
        );
    }

    if (isLoading) {
        return (
            <Box mx="auto" textAlign="center" py={10}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <List>
            {state.shoppingListItems.length
                ?
                state.shoppingListItems.map(item => (
                    <ListItem
                        key={item.productId}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteShoppingListItem(item.productId)}>
                                <ClearIcon/>
                            </IconButton>
                        }
                    >
                        <ListItemText primary={item.productTitle}/>
                    </ListItem>
                ))
                : (
                    <Typography>No items yet</Typography>
                )
            }
        </List>
    );
}