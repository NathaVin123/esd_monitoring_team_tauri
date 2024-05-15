import { Box, Flex } from '@chakra-ui/react';
import SideMenuComponent from './SideMenuComponent';
import NavbarComponent from "@/pages/components/NavbarComponent";

const LayoutComponent = ({ children }) => {
    return (
        <Flex>
            <SideMenuComponent />
            <Box flex="1">
                <NavbarComponent isDashboard={true}></NavbarComponent>
                <Box p="4">
                    {children}
                </Box>
            </Box>
        </Flex>
    );
};

export default LayoutComponent;
