import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface CustomImageProps {
    path: any; // Changed to string type for next/image compatibility
    alt?: string;
    size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
    borderRadius?: number | string;
}

const sizeMap = {
    XS: 50,
    S: 100,
    M: 150,
    L: 200,
    XL: 250,
};

const CustomImage: React.FC<CustomImageProps> = ({ path, alt = 'image', size = 'M', borderRadius }) => {
    const dimension = sizeMap[size];

    return (
        <Box sx={{ borderRadius: borderRadius, overflow: 'hidden', display: 'inline-block', width: dimension, height: dimension }}>
            <Image src={path} alt={alt} width={dimension} height={dimension} fetchPriority="auto" />
        </Box>
    );
}

export default CustomImage;
