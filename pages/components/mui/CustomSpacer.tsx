import React from 'react';
import Box from '@mui/material/Box';

interface SpacerProps {
    height?: number | string;
    width?: number | string;
}

const CustomSpacer: React.FC<SpacerProps> = ({ height, width }) => {
    return (
        <Box
            sx={{
                height: height || 'auto',
                width: width || 'auto',
            }}
        />
    );
};

export default CustomSpacer;
