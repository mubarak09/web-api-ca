import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import TheatersIcon from '@mui/icons-material/Theaters';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SideDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Upcoming', icon: <UpcomingIcon />, path: '/movies/upcoming' },
    { text: 'Now Playing', icon: <TheatersIcon />, path: '/movies/now-playing' },
    { text: 'Top Rated', icon: <StarIcon />, path: '/movies/top-rated' },
    { text: 'Trending', icon: <WhatshotIcon />, path: '/movies/trending' },
    { text: 'Favorites', icon: <StarIcon />, path: '/movies/favorites' },
    { text: 'Watch Later', icon: <WatchLaterIcon />, path: '/movies/watch-later' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
