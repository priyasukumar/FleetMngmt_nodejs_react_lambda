import * as React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { IHeaderProps } from '../models/app';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            background: '#1976d2'
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            background: '#1976d2'
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        }
    })
);

const HeaderComponent = (props: IHeaderProps) => {
    const classes = useStyles();
    const { handleDrawerOpen, open } = props;
    
    return (
        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open
                    })}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h2" noWrap={true}>FMS</Typography>
            </Toolbar>
        </AppBar >
    );
};

export default HeaderComponent;