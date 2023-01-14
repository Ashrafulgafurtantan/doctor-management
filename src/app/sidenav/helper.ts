export interface INavbarData {
    routeLink: string;
    icon?: string;
    label: string;
    expanded?: boolean;
    items?: INavbarData[];
}

export interface SideNavNode {
    name: string;
    children?: SideNavNode[];
    icon: string;
    routerLink: string;
}
export interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    icon: string;
    routerLink: string;
}
