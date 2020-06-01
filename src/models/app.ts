export interface ILink {
    name: string;
    to: string;
    submenu?: ILink[];
}