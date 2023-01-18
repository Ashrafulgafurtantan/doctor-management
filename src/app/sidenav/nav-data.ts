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
            {name: 'Employee Create', icon: 'adjust', routerLink: '/employee-create'},
            {name: 'Employee List', icon: 'adjust', routerLink: '/employee-list'}
        ],
    },
    {
        name: 'Client',
        icon: 'person_add',
        routerLink: '/',
        children: [
            {name: 'Client Create', icon: 'adjust', routerLink: '/client-create'},
            {name: 'Client List', icon: 'adjust', routerLink: '/client-list'}
        ],
    },
    {
        name: 'Item',
        icon: 'post_add',
        routerLink: '/',
        children: [
            {name: 'Item Create', icon: 'adjust', routerLink: '/item-create'},
            {name: 'Item List', icon: 'adjust', routerLink: '/item-list'}
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
        children: [
            {name: 'Work Status Summary', icon: 'adjust', routerLink: '/summary/work-status',},
            {name: 'Work Summary', routerLink: '/summary/work', icon: 'adjust'},
            {name: 'All Work Status Summary', routerLink: '/summary/all-work-status', icon: 'adjust'},
        ],
    },
];
