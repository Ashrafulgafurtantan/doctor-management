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
            {name: 'Attendance', icon: 'checklist', routerLink: '/attendance-list'},
            {name: 'Employee Create', icon: 'person_add', routerLink: '/employee-create'},
            {name: 'Employee List', icon: 'groups', routerLink: '/employee-list'}
        ],
    },
    {
        name: 'Client',
        icon: 'person_add',
        routerLink: '/',
        children: [
            {name: 'Client Create', icon: 'group_add', routerLink: '/client-create'},
            {name: 'Client List', icon: 'diversity_3', routerLink: '/client-list'}
        ],
    },
    {
        name: 'Item',
        icon: 'article',
        routerLink: '/',
        children: [
            {name: 'Item Create', icon: 'post_add', routerLink: '/item-create'},
            {name: 'Item List', icon: 'auto_stories', routerLink: '/item-list'}
        ],
    },
    {
        name: 'Order',
        icon: 'shopping_cart',
        routerLink: '/',
        children: [{name: 'Order List', icon: 'receipt_long', routerLink: '/orders',}, {
            name: 'Order Create',
            icon: 'add_shopping_cart',
            routerLink: '/orders/create',
        }],
    },
    {
        name: 'Summary',
        icon: 'assignment',
        routerLink: '/',
        children: [
            {name: 'Work Status Summary', icon: 'equalizer', routerLink: '/summary/work-status',},
            {name: 'Work Summary', routerLink: '/summary/work', icon: 'pie_chart'},
            {name: 'All Work Status Summary', routerLink: '/summary/all-work-status', icon: 'table_chart'},
        ],
    },
];
