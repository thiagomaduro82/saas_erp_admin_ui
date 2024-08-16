import { AppBar, Box, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from "@mui/material";


interface ISideBar {
    children: React.ReactNode;
}

export const SideBar: React.FC<ISideBar> = ({ children }) => {

    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        SaaS ERP Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                sx={{ width: theme.spacing(28), flexShrink: 0, [`& .MuiDrawer-paper`]: { width: theme.spacing(28), boxSizing: 'border-box' } }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto', p: 1 }} height={'100%'} display={'flex'} flexDirection={'column'}>
                    <List component={'nav'}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>home</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Toolbar />
                Test
            </Box>

        </Box>
    );
}