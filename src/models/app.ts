import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export interface ILink {
    name: string;
    to: string;
    submenu?: ILink[];
    icon: OverridableComponent<SvgIconTypeMap>;
}

export interface IHeaderProps {
    handleDrawerOpen(): void;
    open: boolean;
}