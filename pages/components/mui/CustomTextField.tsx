import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useCallback, useState } from 'react';

interface CustomTextFieldProps {
    type?           : string;
    required?       : boolean;
    options?        : { key: string; value: string }[];
    onChange?       : (event: React.ChangeEvent<HTMLInputElement>) => void;
    sx?             : object;
    value?          : string; // Add value prop
    [key: string]: any;
}

export default function CustomTextField(props: CustomTextFieldProps) {
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const validateInput = useCallback((value: string) => {
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
    }, [props.required, props.type]);

    useEffect(() => {

    }, [props.value, validateInput]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(event);
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
            variant="filled"
            label="Custom TextField"
            fullWidth
            {...props}
            value={props.value}
            onChange={handleChange}
            error={error}
            helperText={helperText}
            select={props.type === 'select'}
            InputLabelProps={props.type === 'date' || props.type === 'datetime-local' || props.type === 'time' ? { shrink: true } : {}}
            inputProps={props.type === 'number' ? { inputMode: 'numeric', pattern: '\\d*' } : {}}
            sx={{
                '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '8px',
                    '&:before': {
                        borderBottom: 'none',
                    },
                    '&:after': {
                        borderBottom: 'none',
                    },
                    '&:hover:before': {
                        borderBottom: 'none !important',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'black',
                },
                '& .MuiFormHelperText-root': {
                    color: error ? 'red' : 'black',
                },

                '& .MuiInputBase-root': {
                    backgroundColor: 'white',
                    color: 'black',
                },
                '& .MuiInputBase-input': {
                    color: 'black',
                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0,
                    },
                    '&[type=number]': {
                        '-moz-appearance': 'textfield',
                    },
                },
                '& .MuiSvgIcon-root': {
                    color: 'black',
                },
                ...props.sx
            }}
        >
            {props.type === 'select' && props.options && props.options.map(option => (
                <MenuItem key={option.key} value={option.key}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>
    );
}