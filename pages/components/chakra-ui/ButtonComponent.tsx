import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface CustomButtonProps extends ButtonProps {
    customProps?: string;
    leftIcon?: React.ReactElement<SvgIconProps>; // Prop for the optional left icon
    rightIcon?: React.ReactElement<SvgIconProps>; // Prop for the optional right icon
}

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '50px', // Adjust the border radius as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    textTransform: 'none', // Ensure text is not transformed to uppercase
    gap: '0.5rem', // Add some space between the icon and the text
    '&:disabled': {
        backgroundColor: theme.palette.grey[400], // Change background color to grey when disabled
        color: theme.palette.grey[700], // Change text color to a darker grey when disabled
    },
}));

export const CustomButton: React.FC<CustomButtonProps> = ({ customProps, leftIcon, rightIcon, ...props }) => {
    return (
        <StyledButton {...props}>
            {leftIcon && React.cloneElement(leftIcon, { style: { marginRight: '0.5rem' } })} {/* Optional left icon with margin */}
            {props.children}
            {rightIcon && React.cloneElement(rightIcon, { style: { marginLeft: '0.5rem' } })} {/* Optional right icon with margin */}
        </StyledButton>
    );
}

export default CustomButton;
