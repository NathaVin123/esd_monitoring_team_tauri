import React, {FC, ReactNode} from "react";

import { Button, ButtonGroup } from '@chakra-ui/react'

interface ButtonProps {
    onClick?: () => void;
    title? : string,
    className?: string;
    children?: ReactNode;
}

export const ButtonComponent: FC<ButtonProps> = ({ onClick, title, className, children  }) => {
    return (
        // <button>{title}</button>
        <Button onClick={onClick} colorScheme='red' size={'lg'}>{title}</Button>
    );
}

export default ButtonComponent;
