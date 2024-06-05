// components/Sidebar.tsx
import React from 'react';
import {Box, Drawer, List, ListItem, ListItemText} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomImage from "@/pages/components/mui/CustomImage";
import PolytronLogo from "@/public/assets/polytron-icon.png";

const drawerWidth = 250;

interface Route {
    path: string;
    text: string;
}

const Sidebar: React.FC<{ mobileOpen: boolean; handleDrawerToggle: () => void }> = ({mobileOpen, handleDrawerToggle}) => {
    const getRoute = localStorage.getItem('routeSidebar');
    const routes: Route[] = getRoute ? JSON.parse(getRoute) : [];

    const drawer = (
        <>
            <Box sx={{ padding: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CustomImage size={'XS'} path={PolytronLogo} />
                    <CustomTypography size={'S'} bold sx={{ ml: 1 }}>
                        ESD Monitoring Team
                    </CustomTypography>
                </Box>
            </Box>
            <List>
                {routes.map((route: Route, index: number) => (
                    <Link href={route.path} key={route.text} passHref>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ListItem button component="a" onClick={handleDrawerToggle}>
                                <ListItemText primary={route.text} />
                            </ListItem>
                        </motion.div>
                    </Link>
                ))}
            </List>
        </>
    );

    return (
        <nav>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </nav>
    );
};

export default Sidebar;
