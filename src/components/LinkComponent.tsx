import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ILink } from '../models/app';

const LinksComponent = ({ links }: { links: ILink[] }) => {
    const [path, setPath] = useState('');
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location, setPath]);

    const activeRoute = (route: string): boolean => {
        return route === path;
    };

    const buildMenu = (menu: ILink[]) => {
        return menu
            .map((link: ILink) => {
                return (
                    <ListItem selected={activeRoute(link.to)} button={true} key={link.name} component={NavLink} to={link.to} exact={true}>
                        <ListItemIcon><link.icon /> </ListItemIcon>
                        <ListItemText primary={link.name} />
                    </ListItem>
                );
            });
    };

    return (
        <>
            {buildMenu(links)}
        </>
    );
};

export default LinksComponent;
