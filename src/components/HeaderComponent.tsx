import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        appBar: {
            flexGrow: 1,
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            background: '#1976d2'
        }
    })
);

const HeaderComponent = () => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h2" noWrap={true}>
                    FMS
           </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;