import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';

import {useProducts} from './useProducts.ts';
import {Unit} from '../../shared/config.ts';
import useLocalStorageList from '../../shared/hooks/useLocalStorageList.ts';

export type Product = {
    id: string;
    title: string;
    unit: Unit;
}

export default function Products() {
    const navigate = useNavigate();
    const {isInList, removeItem, addItem} = useLocalStorageList('supply-list');

    const {onDelete, products, error, isLoading} = useProducts();

    if (isLoading) {
        return (
            <Box mx="auto" textAlign="center" py={10}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box mx="auto" textAlign="center" py={10}>
                <Typography>Something went wrong. Please, try again later.</Typography>
            </Box>
        );
    }

    return (
        <>
            <List>
                {products && products.map(product => (
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
                                    <>
                                        <IconButton onClick={() => onDelete(product.id)} edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>

                                        <IconButton onClick={() => addItem(product)} edge="end" aria-label="delete">
                                            <AddIcon/>
                                        </IconButton>
                                    </>
                                )
                        }
                    >
                        <ListItemButton onClick={() => navigate('/item-editor', {state: {product}})}>
                            <ListItemText
                                primary={product.title}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>

    );
}