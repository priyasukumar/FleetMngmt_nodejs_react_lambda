import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';

import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import './App.css';
import { ILink } from './models/app';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import LinksComponent from './components/LinkComponent';
import OverSpeed from './components/dashboard/OverSpeedComponent';
import HarshTurn from './components/dashboard/HarshTurnComponent';
import HarshBreak from './components/dashboard/HarshBreakComponent';
import Dashboard from './containers/DashboardContainer';
import { Container } from '@material-ui/core';
import DriverService from './components/dashboard/DriverServiceComponent';

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
    { name: 'Dashboard', to: '/' },
    { name: 'Driver Service', to: '/driverservice' },
    { name: 'Over Speed', to: '/overspeed' },
    { name: 'Harsh Break', to: '/harshBreak' },
    { name: 'Harsh Turn', to: '/harshTurn' },
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />

      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
        <Toolbar />
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
            <Route path="/driverservice" component={DriverService} />
            <Route path="/overspeed" component={OverSpeed} />
            <Route path="/harshTurn" component={HarshTurn} />
            <Route path="/harshBreak" component={HarshBreak} />
          </HashRouter>
        </main>
      </Container>

      <Footer />
    </div>
  );
};

export default App;
