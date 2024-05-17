import {FormEvent, useRef} from 'react';

import {Box, Button, MenuItem, Select, TextField, Typography} from '@mui/material';

import {UnitsOfMeasurement} from '../../shared/config.ts';
import {useMutateData} from '../../shared/hooks/useLogin.ts';

export default function ItemCreator() {
    const {mutate} = useMutateData();
    const unitSelectRef = useRef<HTMLSelectElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (unitSelectRef.current && titleInputRef.current) {
            const unit = unitSelectRef.current.value;
            const title = titleInputRef.current.value;

            mutate(
                {data: {unit, title}, url: 'api/item'},
                {
                    onSuccess: (data) => {
                        console.log('Item created successfully:', data);
                    },
                    onError: (error) => {
                        console.error('Failed to create item:', error);
                    }
                }
            );
        }
    }

    return (
        <Box>
            <Box py={2}>
                <Typography variant="h6">
                    Create new item
                </Typography>
            </Box>

            <Box component="form" noValidate autoComplete="off" onSubmit={(event) => onSubmit(event)}>
                <Box>
                    <TextField
                        fullWidth
                        inputRef={titleInputRef}
                        size="small"
                        required
                        label="Title"
                    />
                </Box>

                <Box mt={2}>
                    <Select
                        size="small"
                        inputRef={unitSelectRef}
                        fullWidth
                        defaultValue="none"
                    >
                        <MenuItem value="none">none</MenuItem>
                        {Object.values(UnitsOfMeasurement).map(unit => (
                            <MenuItem key={unit.id} value={unit.id}>{unit.id}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box mt={2}>
                    <Button variant="contained" type="submit">Create</Button>
                </Box>
            </Box>
        </Box>
    );
}