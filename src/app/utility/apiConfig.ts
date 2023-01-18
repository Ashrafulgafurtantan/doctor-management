export enum ApiConfig {
    baseUrl = 'http://127.0.0.1:8000/api/',
    downloadPdfUrl = 'http://127.0.0.1:8000/download/report/',
    userLogin = 'users/login',
    getEmployeeList = 'employees/all',
    getClientList = 'clients/all',
    getAttendanceList = 'employees/attendance',
    postEmployeeAttendance = 'employees/attendance',
    postClientCreate = 'clients',
    postEmployeeCreate = 'employees',
    postOrderCreate = 'orders',
    putOrderUpdate = 'orders',
    putOrderStatusUpdate = 'orders/change/status',
    postItemCreate = 'items',
    getOrderList = 'orders/all',
    getItemList = 'items/all',
    putPasswordChange = 'users/password',
}
