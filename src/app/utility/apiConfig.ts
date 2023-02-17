export enum ApiConfig {
    /*  baseUrl = 'https://api.32vivadent.com/api/',
      downloadPdfUrl = 'https://api.32vivadent.com/download/report/',
      loginUrl = 'https://32vivadent.com/login',*/
    baseUrl = 'http://127.0.0.1:8000/api/',
    downloadPdfUrl = 'http://127.0.0.1:8000/download/report/',
    loginUrl = 'http://localhost:4200/login',
    userLogin = 'users/login',
    getEmployeeList = 'employees/all',
    getClientList = 'clients/all',
    getAttendanceList = 'employees/attendance',
    getEmployeeById = 'employees/',
    putEmployeeUpdateRequest = 'employees',
    getClientById = 'clients/',
    putClientDataUpdateRequest = 'clients',
    postEmployeeAttendance = 'employees/attendance',
    postClientCreate = 'clients',
    postEmployeeCreate = 'employees',
    postAssetCreate = 'assets',
    putAssetUpdate = 'assets',
    getAssetList = 'assets/all',
    getAssetByAssetId = 'assets/',
    postOrderCreate = 'orders',
    getOrderTodayDelivered = 'orders/today/delivered',
    getOrderTodayReceived = 'orders/today/received',
    putOrderUpdate = 'orders',
    deleteOrder = 'orders',
    putOrderStatusUpdate = 'orders/change/status',
    postItemCreate = 'items',
    putItemUpdate = 'items',
    getItemByItemId = 'items/',
    getOrderList = 'orders/all',
    getItemList = 'items/all',
    putPasswordChange = 'users/password',
}
