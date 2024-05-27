import {useRef} from 'react';

import {useLocation} from 'react-router-dom';

import {Box, Button, MenuItem, Select, TextField, Typography} from '@mui/material';

import {ItemCreatorProps} from './types.ts';
import {useItemCreator} from './useItemCreator.ts';
import {UnitsOfMeasurement} from '../../shared/config.ts';

export default function ItemCreator({mode} : ItemCreatorProps) {
    const {onSubmit} = useItemCreator();

    const unitSelectRef = useRef<HTMLSelectElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const categoryInputRef = useRef<HTMLInputElement>(null);

    const location = useLocation();
    const product = location.state?.product;

    return (
        <Box>
            <Box py={2}>
                <Typography variant="h6">
                    {mode === 'create' ? 'Create new item' : 'Edit item'}
                </Typography>
            </Box>

            <Box
                component="form"
                noValidate autoComplete="off"
                onSubmit={(event) => onSubmit(event, {
                    unit: unitSelectRef.current && unitSelectRef.current.value,
                    title: titleInputRef.current && titleInputRef.current.value,
                    category: categoryInputRef.current && categoryInputRef.current.value
                }, mode, product?.id)}
            >
                <Box>
                    <TextField
                        fullWidth
                        defaultValue={product?.title}
                        inputRef={titleInputRef}
                        size="small"
                        required
                        label="Title"
                    />
                </Box>

                <Box mt={2}>
                    <TextField
                        fullWidth
                        defaultValue={product?.category}
                        inputRef={categoryInputRef}
                        size="small"
                        required
                        label="Category"
                    />
                </Box>

                <Box mt={2}>
                    <Select
                        size="small"
                        inputRef={unitSelectRef}
                        fullWidth
                        defaultValue={product?.unit || 'none'}
                    >
                        <MenuItem value="none">none</MenuItem>
                        {Object.values(UnitsOfMeasurement).map(unit => (
                            <MenuItem key={unit.id} value={unit.id}>{unit.id}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box mt={2}>
                    <Button fullWidth variant="contained" type="submit">Save</Button>
                </Box>
            </Box>
        </Box>
    );
}