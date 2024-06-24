import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { useRouter } from "next/router";
import { CustomProgressBarEntireScreen } from "@/pages/components/mui/CustomProgressBar";

interface SidebarItem {
    name    : string;
    route   : string;
}

interface SidebarProps {
    items           : SidebarItem[];
    onNavigate      : (route: string) => void;
}

const CustomSideBar: React.FC<SidebarProps> = ({ items = [], onNavigate }) => {
    const router = useRouter();

    return (
        <div style={{ width: '200px', borderRight: '1px solid #ccc', height: '100vh', overflowY: 'auto' }}>
            <List component="nav">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem button onClick={() => onNavigate(item.route)}>
                            <ListItemText primary={item.name} />
                        </ListItem>
                        {index < items.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default CustomSideBar;