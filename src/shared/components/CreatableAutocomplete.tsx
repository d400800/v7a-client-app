import React, {useState} from 'react';

import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface OptionType {
    id: string;
    isSelected?: boolean;
    label?: string;
    inputValue?: string;
}

interface CreatableAutocompleteProps {
    autocompleteOptions: OptionType[];
    onSelectValue: (value: OptionType | null) => void;
}

const filter = createFilterOptions<OptionType>();

const CreatableAutocomplete: React.FC<CreatableAutocompleteProps> = ({autocompleteOptions, onSelectValue}) => {
    const [value, setValue] = useState<OptionType | null>(() => autocompleteOptions.find(option => option.isSelected) || null);

    function onChange(value: OptionType | null) {
        setValue(value);
        onSelectValue(value);
    }

    return (
        <Autocomplete
            size="small"
            value={value?.id}
            onChange={(_, newValue) => {
                if (typeof newValue === 'string') {
                    onChange({
                        id: newValue
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    onChange({
                        id: newValue.inputValue
                    });
                } else {
                    onChange(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const {inputValue} = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.id);

                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        id: `Add "${inputValue}"`
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={autocompleteOptions}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }

                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }

                // Regular option
                return option.label || option.id;
            }}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.label || option.id}</li>}
            sx={{width: '100%'}}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Free solo with text demo" />
            )}
        />
    );
};

export default CreatableAutocomplete;