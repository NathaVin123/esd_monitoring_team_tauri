import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface ToastProps {
    open: boolean;
    onClose: () => void;
    message: string;
    severity?: AlertColor;  // Make severity optional
    autoHideDuration?: number;
}

const CustomToast: React.FC<ToastProps> = ({ open, onClose, message, severity = 'info', autoHideDuration = 6000 }) => {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomToast;
