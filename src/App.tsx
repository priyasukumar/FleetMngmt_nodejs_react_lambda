import React, { lazy, Suspense } from 'react';
import { Route, HashRouter } from 'react-router-dom';

import './App.css';
import { ILink } from './models/app';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Links from './components/LinkComponent';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SpeedIcon from '@material-ui/icons/Speed';
import CallSplit from '@material-ui/icons/CallSplit';
import EmojiTransportation from '@material-ui/icons/EmojiTransportation';
import AirlineSeatLegroomExtra from '@material-ui/icons/AirlineSeatLegroomExtra';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Container, IconButton, Divider } from '@material-ui/core';
import clsx from 'clsx';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';

const Dashboard = lazy(() => import('./containers/DashboardContainer'));
const DriverServiceTime = lazy(() => import('./containers/DriverServiceTimeContainer'));
const HarshTurn = lazy(() => import('./containers/HarshTurnContainer'));
const OverSpeed = lazy(() => import('./containers/OverSpeedContainer'));
const HarshBrake = lazy(() => import('./containers/HarshBrakeContainer'));
const FuelUsage = lazy(() => import('./containers/FuelUsageContainer'));

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const App = () => {
  const theme = useTheme();
  const classes = useStyles();

  const menuLinks: ILink[] = [
    { name: 'Dashboard', to: '/', icon: DashboardIcon },
    { name: 'Over Speed', to: '/overspeed', icon: SpeedIcon },
    { name: 'Harsh Brake', to: '/harshbrake', icon: AirlineSeatLegroomExtra },
    { name: 'Harsh Turn', to: '/harshturn', icon: CallSplit },
    { name: 'Driver Service', to: '/driverservice', icon: EmojiTransportation },
    { name: 'Fuel Usage', to: '/fuelusage', icon: LocalGasStationIcon }
  ];

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src="../../ZF_Wabco.png" alt="ZF WABCO" height="71" width="170" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <HashRouter>
          <List>
            <Links links={menuLinks} />
          </List>
        </HashRouter>
      </Drawer>

      <Container maxWidth="xl">
        <main className={classes.content}>
          <Toolbar />
          <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/" component={Dashboard} exact={true} />
              <Route path="/overspeed" component={OverSpeed} />
              <Route path="/harshturn" component={HarshTurn} />
              <Route path="/harshbrake" component={HarshBrake} />
              <Route path="/driverservice" component={DriverServiceTime} />
              <Route path="/fuelUsage" component={FuelUsage} />
            </Suspense>
          </HashRouter>
        </main>
      </Container>

      <Footer />
    </div >
  );
};

export default App;
