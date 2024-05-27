import {useToast} from "@chakra-ui/react";

export function ToastComponent(title?: string, description?: string, ) {
    const toast = useToast();

    return toast({
        title: title ?? "",
        description: description ?? "",
        status: "success",
        duration: 5000,
        isClosable: true,
    })
}

export default ToastComponent;
