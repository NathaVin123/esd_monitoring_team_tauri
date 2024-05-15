import { Text } from '@chakra-ui/react'
import {FC} from "react";
import {isEmpty} from "@chakra-ui/utils";

interface TextProps {
    label: string | '';
    size: string;
    type?: string;
}

export const TextComponent: FC<TextProps> = ({size, label, type}) => {
    if(!isEmpty(type)) {
        return (
            <Text as={type} fontSize={size}>{label}</Text>
        );
    }
    else
    {
        return (
            <Text fontSize={size}>{label}</Text>
        );
    }


}

export default TextComponent;
