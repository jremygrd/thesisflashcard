import React,{ useState, useEffect } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Drawer } from '@material-ui/core';
import Link from 'next/link';
import { Button } from '@material-ui/core';

import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'flex',
      marginRight:'5rem',
      background: 'linear-gradient(45deg,#4cb7ff 30%, #4C5BFF 90%)',
      padding:"1rem",
      borderRadius:"20px"
      
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'flex',
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    drawerContainer: {
      padding: "20px 30px",
    },
    button: {
      margin: theme.spacing(1),
    },

    leftbutton: {
      fontFamily: "Work Sans, sans-serif",
      color: "#FFFEFE",
      textAlign:"left"
    },
  }),
);

export default function NavBar() {

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  const handleDrawerOpen = () =>
  setState((prevState) => ({ ...prevState, drawerOpen: true }));
const handleDrawerClose = () =>
  setState((prevState) => ({ ...prevState, drawerOpen: false }));

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const getDrawerChoices = () => {

      return (
        <div >
        <Link href="/"
          {...{
            color: "inherit",
            style: { textDecoration: "none" },
          }}
        >
          <MenuItem>Accueil</MenuItem>
        </Link>

          <Link href="/"
          {...{
            color: "inherit",
            style: { textDecoration: "none" },
          }}
          >
          <MenuItem>Librarie</MenuItem>
          </Link>

          <Link href="/myprofile"
              {...{
                color: "inherit",
                style: { textDecoration: "none" },
              }}
            >
              <MenuItem>Mon profil</MenuItem>
          </Link>
        </div>
      );
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );


  return (
    <div className={classes.grow} style={{flex:'1'}}>
      <AppBar position="static" style={{ background: ' linear-gradient(45deg,#4cb7ff 30%, #4C5BFF 90%) ' }}>
        <Toolbar>
        

          {
          mobileView?
          <>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Thesis Flashcards
          </Typography>
            <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
            >
            <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>
          </>

          
          :

          <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            >
            <ForwardIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Visit Thesis
          </Typography>

          <div className={classes.leftbutton}>
          <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<HomeIcon />}
          >
          Accueil
          </Button>

          <Button
          href='/testCards'
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<StorefrontIcon />}
          >
          Librairie
          </Button>
          </div>

          {/* Separate left right */}
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>


          </div>
          </>
          }




        </Toolbar>

      </AppBar>
      {renderMenu}
    </div>
  );

}
