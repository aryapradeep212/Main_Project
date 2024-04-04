import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar as MuiAppBar, Box, CssBaseline, Drawer as MuiDrawer, IconButton, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import BusinessIcon from '@mui/icons-material/Business';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const NavBar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    alert("Logout success..");
    navigate('/', { replace: true });
  };

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: "rgb(17,176,202)" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div" sx={{ fontFamily: 'cursive', fontWeight: 'bold', fontSize: '4 rem', margin: '20px 0', textAlign: 'center', transition: 'none', }}>
            ApeXHire
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" color="inherit">
                <Link to={"/home"} style={{ color: "white" }}><HomeIcon /></Link>
              </IconButton>
              <IconButton size="large" aria-label="account of current user" aria-haspopup="true" color="inherit">
                <Link to={"/pro"} style={{ color: "white" }}> <AccountCircle /> </Link>
              </IconButton>
              <Link to="/" style={{ color: 'white' }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="logout of user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                </IconButton>
              </Link>
            </Box>
          )}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="show more" aria-haspopup="true" color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{text: 'Company Details', path: '/company'}, {text: 'Alumni Details', path: '/alumini'}, {text: 'Faculty Details', path: '/faculty'}].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 ? <BusinessIcon /> : index === 1 ? <SupervisorAccountIcon /> : <PersonIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default NavBar;
