import { INavbarData } from "./helper";
import { SideNavNode} from './helper';
export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'products',
        icon: 'fal fa-box-open',
        label: 'Products',
        items: [
            {
                routeLink: 'products/level1.1',
                label: 'Level 1.1',
                items: [
                    {
                        routeLink: 'products/level2.1',
                        label: 'Level 2.1',
                    },
                    {
                        routeLink: 'products/level2.2',
                        label: 'Level 2.2',
                        items: [
                            {
                                routeLink: 'products/level3.1',
                                label: 'Level 3.1'
                            },
                            {
                                routeLink: 'products/level3.2',
                                label: 'Level 3.2'
                            }
                        ]
                    }
                ]
            },
            {
                routeLink: 'products/level1.2',
                label: 'Level 1.2',
            }
        ]
    },
    {
        routeLink: 'statistics',
        icon: 'fal fa-chart-bar',
        label: 'Statistics'
    },
    {
        routeLink: 'coupens',
        icon: 'fal fa-tags',
        label: 'Coupens',
        items: [
            {
                routeLink: 'coupens/list',
                label: 'List Coupens'
            },
            {
                routeLink: 'coupens/create',
                label: 'Create Coupens'
            }
        ]
    },
    {
        routeLink: 'pages',
        icon: 'fal fa-file',
        label: 'Pages'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Media'
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-cog',
        label: 'Settings',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },
];
export const TREE_DATA: SideNavNode[] = [
    {
        name:'Dashboard',
        icon: 'home',
        routerLink: '/home'
    },
    {
        name: 'Employee',
        icon: 'person',
        routerLink: '/',
        children: [{name: 'Attendance', icon: 'adjust', routerLink: '/table'}],
    },
    {
        name: 'Order',
        icon: 'shopping_cart',
        routerLink: '/',
        children: [{name: 'Order', icon: 'adjust',routerLink: '/tabs',}, {name: 'Order Create', icon: 'adjust',routerLink: '/slider',}],
    },
    {
        name: 'Summary',
        icon: 'assignment',
        routerLink: '/',
        children: [{name: 'Work Status Summary', icon: 'adjust',routerLink: '/slide-toggle',}, {name: 'Work Summary',routerLink: '/snackbar', icon: 'adjust'}],
    },
];
