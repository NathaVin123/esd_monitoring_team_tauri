import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';

interface CustomTextFieldProps {
    type?: string;
    required?: boolean;
    options?: { key: string; value: string }[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sx?: object;
    [key: string]: any;
}

export default function CustomTextField(props: CustomTextFieldProps) {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    useEffect(() => {
        validateInput(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const validateInput = (value: string) => {
        if (props.required && value.trim() === '') {
            setError(true);
            setHelperText('This field is required');
        } else if (props.type === 'password' && value.length < 8) {
            setError(true);
            setHelperText('Password must be at least 8 characters long');
        } else if (props.type === 'datetime-local' && !isValidDateTime(value)) {
            setError(true);
            setHelperText('Invalid date and time format');
        } else if (props.type === 'date' && !isValidDate(value)) {
            setError(true);
            setHelperText('Invalid date format');
        } else if (props.type === 'time' && !isValidTime(value)) {
            setError(true);
            setHelperText('Invalid time format');
        } else {
            setError(false);
            setHelperText('');
        }
    };

    const isValidDateTime = (value: string) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    };

    const isValidDate = (value: string) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
    };

    const isValidTime = (value: string) => {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
    };

    return (
        <TextField
            variant="filled" // Default variant
            label="Custom TextField" // Default label
            fullWidth // Default full width
            {...props} // Spread the rest of the props
            value={value}
            onChange={handleChange}
            error={error}
            helperText={helperText}
            select={props.type === 'select'}
            InputLabelProps={props.type === 'date' || props.type === 'datetime-local' || props.type === 'time' ? { shrink: true } : {}}
            sx={{
                '& .MuiFilledInput-root': {
                    backgroundColor: 'white', // Keep input field background in light mode
                    color: 'black', // Keep input field text in light mode
                    borderRadius: '8px', // Adjust the border radius as needed
                    '&:before': {
                        borderBottom: 'none', // Remove the default underline
                    },
                    '&:after': {
                        borderBottom: 'none', // Remove the active underline
                    },
                    '&:hover:before': {
                        borderBottom: 'none !important', // Remove the hover underline
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'black', // Keep input label text in light mode
                },
                '& .MuiFormHelperText-root': {
                    color: error ? 'red' : 'black', // Keep helper text in light mode
                },
                // Ensure that the TextField stays in light mode even if the theme is dark
                '& .MuiInputBase-root': {
                    backgroundColor: 'white', // Keep input background color white
                    color: 'black', // Keep input text color black
                },
                '& .MuiInputBase-input': {
                    color: 'black', // Keep input text color black
                },
                '& .MuiSvgIcon-root': {
                    color: 'black', // Keep icons in the input (like clear button) black
                },
                ...props.sx // Spread custom styles
            }}
        >
            {props.type === 'select' && props.options && props.options.map(option => (
                <MenuItem key={option.key} value={option.value}>
                    {option.key}
                </MenuItem>
            ))}
        </TextField>
    );
}
