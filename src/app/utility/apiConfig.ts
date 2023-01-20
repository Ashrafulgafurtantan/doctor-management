export enum ApiConfig {
    baseUrl = 'https://api.32vivadent.com/api/',
    downloadPdfUrl = 'https://api.32vivadent.com/download/report/',
    loginUrl = 'https://32vivadent.com/login',
    userLogin = 'users/login',
    getEmployeeList = 'employees/all',
    getClientList = 'clients/all',
    getAttendanceList = 'employees/attendance',
    postEmployeeAttendance = 'employees/attendance',
    postClientCreate = 'clients',
    postEmployeeCreate = 'employees',
    postOrderCreate = 'orders',
    putOrderUpdate = 'orders',
    deleteOrder = 'orders',
    putOrderStatusUpdate = 'orders/change/status',
    postItemCreate = 'items',
    getOrderList = 'orders/all',
    getItemList = 'items/all',
    putPasswordChange = 'users/password',
}
