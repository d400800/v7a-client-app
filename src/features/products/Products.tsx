import {groupBy} from 'lodash';
import {useNavigate} from 'react-router-dom';

import {ExpandLess, ExpandMore} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    CircularProgress, Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';

import {useProducts} from './useProducts.ts';
import {Unit} from '../../shared/config.ts';

export type Product = {
    id: string;
    title: string;
    unit: Unit;
}

export default function Products() {
    const navigate = useNavigate();

    const {
        onDeleteProduct,
        state,
        handleCollapseClick,
        addItem,
        isInList,
        isDataError,
        isDataLoading,
        onDeleteShoppingListItem
    } = useProducts();

    if (isDataLoading()) {
        return (
            <Box mx="auto" textAlign="center" py={10}>
                <CircularProgress/>
            </Box>
        );
    }

    if (isDataError()) {
        return (
            <Box mx="auto" textAlign="center" py={10}>
                <Typography>Something went wrong. Please, try again later.</Typography>
            </Box>
        );
    }

    const productsByCategory = groupBy(state.products, 'category');

    return (
        <>
            <List>
                {Object.entries(productsByCategory).map(([category, products]) => (
                    <Box key={category}>
                        <ListItemButton onClick={() => handleCollapseClick(category)}>
                            <ListItemText
                                primary={category}
                            />
                            {state.collapseSet.has(category) ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={state.collapseSet.has(category)}>
                            <List component="div" disablePadding>
                                {products.map((product) => (
                                    <ListItem
                                        key={product.id}
                                        secondaryAction={
                                            isInList(product.id, state.shoppingList)
                                                ? (
                                                    <IconButton onClick={() => onDeleteShoppingListItem(product.id)} edge="end" aria-label="check">
                                                        <CheckCircleIcon color="success"/>
                                                    </IconButton>
                                                )
                                                : (
                                                    <>
                                                        <IconButton size="small" onClick={() => onDeleteProduct(product.id)} edge="end" aria-label="delete">
                                                            <DeleteIcon/>
                                                        </IconButton>

                                                        <IconButton size="small" onClick={() => addItem(product.id, 1)} edge="end" aria-label="delete">
                                                            <AddIcon/>
                                                        </IconButton>
                                                    </>
                                                )
                                        }
                                    >
                                        <ListItemButton onClick={() => navigate('/item-editor', {state: {product}})}>
                                            <ListItemText
                                                secondary={product.title}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </List>
        </>
    );
}