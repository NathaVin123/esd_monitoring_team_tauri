import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomTypographyProps extends TypographyProps {
    size?: 'S' | 'M' | 'L' | 'XL';
    customSize?: string;
    bold?: boolean;
    italic?: boolean;
    hoverable?: boolean;
    onClick?: () => void;
}

const StyledTypography = styled(Typography)<CustomTypographyProps>(({ theme, size, customSize, bold, italic, hoverable }) => ({
    cursor: hoverable ? 'pointer': 'default',
    fontSize: customSize || (size === 'XL' ? theme.typography.h1.fontSize :
        size === 'L' ? theme.typography.h2.fontSize :
            size === 'M' ? theme.typography.h3.fontSize :
                theme.typography.body1.fontSize),
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: hoverable ? 'red' : 'inherit',
    },
}));

const CustomTypography: React.FC<CustomTypographyProps> = ({ onClick, ...props }) => {
    return <StyledTypography {...props} onClick={onClick}>{props.children}</StyledTypography>;
};

export default CustomTypography;
