import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AppBar, Box, Collapse, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDrawerContext } from "../contexts";
import MenuIcon from '@mui/icons-material/Menu';
import { green } from "@mui/material/colors";

interface ISideBar {
    children: React.ReactNode;
}

interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
}

interface IListNavButtons {
    icon: string;
    label: string;
    data: Array<IListItemLinkProps>;
}

const ListItemLink: React.FC<IListNavButtons> = ({ icon, label, data }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List component={'nav'} dense={true}>
            <ListItemButton onClick={handleClick} key={label}>
                <ListItemIcon sx={{ minWidth: 35 }}>
                    <Icon sx={{color: green[700]}}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense={true}>
                    {open && data.map((item) => (
                        <ListItemButton href={item.to} sx={{ pl: 4 }} key={item.to}>
                            <ListItemIcon sx={{ minWidth: 35 }}>
                                <Icon sx={{color: green[700]}}>{item.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    ))
                    }
                </List>
            </Collapse>
        </List>
    );

}

export const SideBar: React.FC<ISideBar> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    {smDown &&
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawerOpen} >
                            <MenuIcon />
                        </IconButton>
                    }

                    <Typography variant="h6" noWrap component="div">
                        SaaS ERP Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}
                sx={{ width: theme.spacing(28), flexShrink: 0, [`& .MuiDrawer-paper`]: { width: theme.spacing(28), boxSizing: 'border-box' } }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto', p: 1 }} height={'100%'} display={'flex'} flexDirection={'column'}>
                    {
                        drawerOptions.map(drawerOption => (
                            <ListItemLink icon={drawerOption.icon} label={drawerOption.label} data={drawerOption.data} key={1}/>
                        ))
                    }
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }} >
                <Toolbar />
                {children}
            </Box>
        </Box >
    );
}