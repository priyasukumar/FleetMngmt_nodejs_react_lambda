import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SpeedIcon from '@material-ui/icons/Speed';
import CallSplit from '@material-ui/icons/CallSplit';
import EmojiTransportation from '@material-ui/icons/EmojiTransportation';
import AirlineSeatLegroomExtra from '@material-ui/icons/AirlineSeatLegroomExtra';
import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import './App.css';
import { ILink } from './models/app';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import LinksComponent from './components/LinkComponent';
import HarshTurn from './containers/HarshTurnContainer';
import Dashboard from './containers/DashboardContainer';
import { Container } from '@material-ui/core';
import DriverServiceTime from './containers/DriverServiceTimeContainer';
import OverSpeed from './containers/OverSpeedContainer';
import HarshBrake from './containers/HarshBrakeContainer';

const drawerWidth = 240;

const App = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerContainer: {
        overflow: 'auto',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      }
    })
  );

  const menuLinks: ILink[] = [
    { name: 'Dashboard', to: '/', icon: DashboardIcon },
    { name: 'Driver Service', to: '/driverservice', icon: EmojiTransportation },
    { name: 'Over Speed', to: '/overspeed', icon: SpeedIcon },
    { name: 'Harsh Brake', to: '/harshbrake', icon: AirlineSeatLegroomExtra },
    { name: 'Harsh Turn', to: '/harshturn', icon: CallSplit },
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />

      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
        <Toolbar>
          <img src="../../ZF_Wabco.png" alt="ZF WABCO" height="50" width="180" />
        </Toolbar>
        <div className={classes.drawerContainer}>
          <HashRouter>
            <List>
              <LinksComponent links={menuLinks} />
            </List>
          </HashRouter>
        </div>
      </Drawer>

      <Container maxWidth="xl">
        <main className={classes.content}>
          <Toolbar />
          <HashRouter>
            <Route path="/" component={Dashboard} exact={true} />
            <Route path="/driverservice" component={DriverServiceTime} />
            <Route path="/overspeed" component={OverSpeed} />
            <Route path="/harshturn" component={HarshTurn} />
            <Route path="/harshbrake" component={HarshBrake} />
          </HashRouter>
        </main>
      </Container>

      <Footer />
    </div>
  );
};

export default App;
