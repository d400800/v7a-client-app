import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {IconButton, List, ListItem, ListItemText} from '@mui/material';

import products from './mock.ts';
import useLocalStorageList from '../../shared/hooks/useLocalStorageList.ts';
export default function Products() {
    const {isInList, removeItem, addItem} = useLocalStorageList('supply-list');

    return (
        <>
            <List>
                {products.map(product => (
                    <ListItem
                        key={product.id}
                        secondaryAction={
                            isInList(product.id)
                                ? (
                                    <IconButton onClick={() => removeItem(product.id)} edge="end" aria-label="check">
                                        <CheckCircleIcon color="success"/>
                                    </IconButton>
                                )
                                : (
                                    <IconButton onClick={() => addItem(product)} edge="end" aria-label="delete">
                                        <AddIcon/>
                                    </IconButton>
                                )
                        }
                    >
                        <ListItemText
                            primary={product.name}
                        />
                    </ListItem>
                ))}
            </List>
        </>

    );
}