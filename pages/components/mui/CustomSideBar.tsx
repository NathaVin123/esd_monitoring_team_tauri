import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTheme } from '@mui/material/styles';

const CustomSideBar = ({ open, handleDrawerClose, darkMode }) => {
    const theme = useTheme();
    const menuItems = [
        { text: 'Inbox', icon: <InboxIcon /> },
        { text: 'Starred', icon: <MailIcon /> },
        { text: 'Send email', icon: <MailIcon /> },
        { text: 'Drafts', icon: <InboxIcon /> },
    ];

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    bgcolor: darkMode ? 'grey.900' : 'background.paper',
                    color: darkMode ? 'grey.300' : 'text.primary',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton onClick={handleDrawerClose} sx={{ color: darkMode ? 'grey.300' : 'text.primary' }}>
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon sx={{ color: darkMode ? 'grey.300' : 'text.primary' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default CustomSideBar;
