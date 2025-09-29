'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/material';

export default function PageHeader() {

    const [open, setOpen] = React.useState(false);
    const { mode, setMode } = useColorScheme();
    const router = useRouter();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const navigateTo = (path: string) => {
        router.push(path);
        setOpen(false);
    };

    const drawerItems = [
    { text: 'Job Search', icon: <SearchIcon />, path: '/' },
    { text: 'Insight Search', icon: <TravelExploreIcon />, path: '/job-insights' },
    { text: 'Saved Jobs', icon: <BookmarkIcon />, path: '/saved-jobs' },
    { text: 'Saved Insights', icon: <FolderSpecialIcon />, path: '/saved-insights' },
];

const DrawerList = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
        <List>
            {drawerItems.map((item, index) => (
                <React.Fragment key={item.text}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigateTo(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                    {index < drawerItems.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </List>
    </Box>
);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Job Searcher
                    </Typography>
                    <IconButton
                        sx={{ ml: 1 }}
                        color='inherit'
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                    >
                        {mode === 'light' ? <Brightness3Icon /> : <LightModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}
