"use client"

import {Page} from "@/store";
import Link from "next/link";
import {PropsWithChildren, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


type Props = PropsWithChildren<{
    nav: Page[]
    currentPageId: string
    currentPageTitle: string
}>

const drawerWidth = 240;

export function Menu({nav, children, currentPageTitle, currentPageId}: Props) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Webpage Demo
            </Typography>
            <Divider />
            <List>
                {nav.map((page) => (
                    <ListItem key={page.id} disablePadding>
                        <Link passHref href={getPageHref(page)} >
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={page.text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <Link passHref href={"/editor"} >
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={"Edit Nav"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link passHref href={`/editor/${currentPageId}-${encodeURI(currentPageTitle)}`} >
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={"Edit this page"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {nav.map((item) => (
                            <Link key={item.id} passHref href={getPageHref(item)} >
                                <Button key={item.id} sx={{ color: '#fff' }}>
                                    {item.text}
                                </Button>
                            </Link>
                        ))}
                        <Link passHref href={"/editor"} >
                            <Button sx={{ color: '#fff' }}>
                                <ListItemText primary={"Edit Nav"} />
                            </Button>
                        </Link>
                        <Link passHref href={`/editor/${currentPageId}-${encodeURI(currentPageTitle)}`} >
                            <Button sx={{ color: '#fff' }}>
                                <ListItemText primary={"Edit this page"} />
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}


function getPageHref(page: Page) {
    return page.id === "0" ? "/" : `${page.id}-${encodeURI(page.text)}`;
}
