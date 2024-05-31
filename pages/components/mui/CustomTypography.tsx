import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomTypographyProps extends TypographyProps {
    size?: 'S' | 'M' | 'L' | 'XL';
    customSize?: string; // for px or any other unit
    bold?: boolean; // for bold text
    italic?: boolean; // for italic text
}

const CustomTypography: React.FC<CustomTypographyProps> = ({ size, customSize, bold, italic, style, ...props }) => {
    const theme = useTheme();
    let fontSize: any;

    if (customSize) {
        fontSize = customSize;
    } else {
        switch (size) {
            case 'XL':
                fontSize = theme.typography.h1.fontSize;
                break;
            case 'L':
                fontSize = theme.typography.h2.fontSize;
                break;
            case 'M':
                fontSize = theme.typography.h3.fontSize;
                break;
            case 'S':
                fontSize = theme.typography.body1.fontSize;
                break;
            default:
                fontSize = theme.typography.body1.fontSize;
        }
    }

    return (
        <Typography
            style={{
                fontSize,
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
                ...style
            }}
            {...props}
        >
            {props.children}
        </Typography>
    );
};

export default CustomTypography;
