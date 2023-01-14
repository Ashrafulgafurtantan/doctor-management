import { SideNavNode} from './helper';
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
        children: [{name: 'Order', icon: 'adjust',routerLink: '/orders',}, {name: 'Order Create', icon: 'adjust',routerLink: '/orders/create',}],
    },
    {
        name: 'Summary',
        icon: 'assignment',
        routerLink: '/',
        children: [{name: 'Work Status Summary', icon: 'adjust',routerLink: '/search',}, {name: 'Work Summary',routerLink: '/snackbar', icon: 'adjust'}],
    },
];
