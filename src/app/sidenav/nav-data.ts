import {SideNavNode} from './helper';

export const TREE_DATA: SideNavNode[] = [
    {
        name: 'Dashboard',
        icon: 'home',
        routerLink: '/home'
    },
    {
        name: 'Employee',
        icon: 'manage_accounts',
        routerLink: '/',
        children: [
            {name: 'Attendance', icon: 'adjust', routerLink: '/attendance-list'},
            {name: 'Employee Create', icon: 'adjust', routerLink: '/employee-create'}
        ],
    },
    {
        name: 'Client',
        icon: 'person_add',
        routerLink: '/',
        children: [
            {name: 'Client Create', icon: 'adjust', routerLink: '/client-create'}
        ],
    },
    {
        name: 'Order',
        icon: 'shopping_cart',
        routerLink: '/',
        children: [{name: 'Order', icon: 'adjust', routerLink: '/orders',}, {
            name: 'Order Create',
            icon: 'adjust',
            routerLink: '/orders/create',
        }],
    },
    {
        name: 'Summary',
        icon: 'assignment',
        routerLink: '/',
        children: [{name: 'Work Status Summary', icon: 'adjust', routerLink: '/search',}, {
            name: 'Work Summary',
            routerLink: '/snackbar',
            icon: 'adjust'
        }],
    },
];
