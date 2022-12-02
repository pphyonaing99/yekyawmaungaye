<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::get('/', 'Web\LoginController@index')->name('index');

Route::post('Authenticate', 'Web\LoginController@loginProcess')->name('loginProcess');

Route::get('LogoutProcess', 'Web\LoginController@logoutProcess')->name('logoutprocess');

Route::group(['middleware' => ['UserAuth']], function () { 
    
    Route::get('ChangePassword-UI', 'Web\LoginController@getChangePasswordPage')->name('change_password_ui');
    Route::put('UpdatePassword', 'Web\LoginController@updatePassword')->name('update_pw');
    
    //Dashboard List
    Route::get('Inventory-Dashboard', 'Web\InventoryController@getInventoryDashboard')->name('inven_dashboard');
    Route::get('Order-Dashboard', 'Web\OrderController@getOrderPanel')->name('order_panel');
    Route::get('Admin-Dashboard','Web\AdminController@getAdminDashboard')->name('admin_dashboard');  
    Route::get('Shop-Order-Dashboard','Web\SaleController@getShopOrderPanel')->name('shop_order_panel');  
    
    /*  
    Route::get('Stock-Dashboard', 'Web\StockController@getStockPanel')->name('stock_dashboard');
    Route::get('Sale-Dashboard', 'Web\SaleController@getSalePanel')->name('sale_panel');
    */
    
    /* //Ajax List
    Route::post('AjaxGetItem', 'Web\InventoryController@AjaxGetItem')->name('AjaxGetItem');
    Route::post('AjaxGetCountingUnit', 'Web\InventoryController@AjaxGetCountingUnit')->name('AjaxGetCountingUnit');
    Route::post('getCountingUnitsByItemCode', 'Web\SaleController@getCountingUnitsByItemCode');
    Route::post('ajaxConvertResult', 'Web\InventoryController@ajaxConvertResult');*/
    
    Route::post('getCountingUnitsByItemId', 'Web\SaleController@getCountingUnitsByItemId');
    Route::post('searchByCuisine', 'Web\SaleController@searchByCuisine');
    Route::post('getTableByFloor', 'Web\SaleController@getTableByFloor');
    Route::post('getTableByTableType', 'Web\SaleController@getTableByTableType');
    
    //Meal (Finish)
    Route::get('meal', 'Web\InventoryController@getMealList')->name('meal_list');
    Route::post('meal/store', 'Web\InventoryController@storeMeal')->name('meal_store');
    Route::post('meal/update/{id}', 'Web\InventoryController@updateMeal')->name('meal_update');
    
    //CuisineType (Finish)
    Route::get('cuisine-type', 'Web\InventoryController@getCuisineTypeList')->name('cuisine_type_list');
    Route::post('cuisine-type/store', 'Web\InventoryController@storeCuisineType')->name('cuisine_type_store');
    Route::post('cuisine-type/update/{id}', 'Web\InventoryController@updateCuisineType')->name('cuisine_type_update');
    
    //Menu Item
    Route::get('menu-item', 'Web\InventoryController@getMenuItemList')->name('menu_item_list');
    Route::post('menu-item/store', 'Web\InventoryController@storeMenuItem')->name('menu_item_store');
    Route::post('menu-item/update/{id}', 'Web\InventoryController@updateMenuItem')->name('menu_item_update');
    Route::post('menu-item/delete', 'Web\InventoryController@deleteMenuItem');
    
    //Ingredient List
    Route::get('ingredient-list', 'Web\InventoryController@getIngredientList')->name('ingredient_list');
    Route::post('ingredient-list/store', 'Web\InventoryController@storeIngredient')->name('store_ingredient');
    
    Route::get('unit-ingredient/edit/{id}', 'Web\InventoryController@editUnitIngredient')->name('edit_unit_ingredient');
    Route::post('unit-ingredient/update/{id}', 'Web\InventoryController@updateUnitIngredient')->name('update_unit_ingredient');

    //Reorder List
    Route::get('reorder-list', 'Web\InventoryController@getReorderList')->name('reorder_list');
    Route::get('stock-update', 'Web\InventoryController@stockCountUpdate')->name('stock_update');
    
    //Counting Unit
    Route::get('Option/{item_id}', 'Web\InventoryController@getOptionList')->name('option_list');    
    Route::post('Option/store', 'Web\InventoryController@storeOption')->name('option_store');    
    Route::post('Option/update/{id}', 'Web\InventoryController@updateOption')->name('option_update');
    Route::post('Option/delete', 'Web\InventoryController@deleteOption');
    
    //Order
    Route::get('Order/{type}', 'Web\OrderController@getOrderPage')->name('order_page');
    Route::get('Order-Details/{id}', 'Web\OrderController@getOrderDetailsPage')->name('order_details');
    Route::post('Order/Change', 'Web\OrderController@changeOrderStatus')->name('update_order_status');
    Route::get('Order/Voucher/History', 'Web\OrderController@getOrderHistoryPage')->name('order_history');
    Route::post('Order/Voucher/Search-History', 'Web\OrderController@searchOrderVoucherHistory')->name('search_order_history');
    
    Route::get('Employee', 'Web\AdminController@getEmployeeList')->name('employee_list');
    Route::post('Employee/store', 'Web\AdminController@storeEmployee')->name('employee_store');
    Route::get('Employee/details/{id}', 'Web\AdminController@getEmployeeDetails')->name('employee_details');
    
    Route::get('Table', 'Web\AdminController@getTableList')->name('table_list');
    Route::post('Table/store', 'Web\AdminController@storeTable')->name('store_table_list');
    Route::post('Table-Type/store', 'Web\AdminController@storeTableType')->name('store_table_type');
    Route::post('Table-Type/update/{id}', 'Web\AdminController@updateTableType')->name('update_table_type');
    
    Route::get('Pending-Order', 'Web\SaleController@getPendingShopOrderList')->name('pending_lists');
    Route::get('Pending-Order-Details/{id}', 'Web\SaleController@getPendingShopOrderDetails')->name('pending_order_details');
    Route::get('Finished-Order', 'Web\SaleController@getFinishedOrderList')->name('finished_lists');
    Route::get('Shop-Order-Voucher/{order_id}', 'Web\SaleController@getShopOrderVoucher')->name('shop_order_voucher');
    
    Route::get('Sale', 'Web\SaleController@getSalePage')->name('sale_page');
    Route::post('Sale/Store', 'Web\SaleController@storeShopOrder')->name('store_shop_order');
    Route::get('Sale/Shop-Order/{table_id}', 'Web\SaleController@getShopOrderSalePage')->name('shop_order_sale');
    
    Route::get('Add-More/{order_id}', 'Web\SaleController@addMoreItemUI')->name('add_more_item');
    Route::post('Add-More-Item', 'Web\SaleController@addMoreItem')->name('add_item');
    
    Route::post('ShopVoucherStore', 'Web\SaleController@storeShopOrderVoucher');
    
    Route::get('Purchase', 'Web\PurchaseController@getPurchaseHistory')->name('purchase_list');
    Route::get('Purchase/Details/{id}', 'Web\PurchaseController@getPurchaseHistoryDetails')->name('purchase_details');
    Route::get('Purchase/Create', 'Web\PurchaseController@createPurchaseHistory')->name('create_purchase');
    Route::post('Purchase/Store', 'Web\PurchaseController@storePurchaseHistory')->name('store_purchase');
    
    //Customer
    /* Route::get('Customer', 'Web\AdminController@getCustomerList')->name('customer_list');
    Route::post('Customer/store', 'Web\AdminController@storeCustomer')->name('store_customer');
    Route::get('Customer/details/{id}', 'Web\AdminController@getCustomerDetails')->name('customer_details');
    Route::post('Customer/Change-Level', 'Web\AdminController@changeCustomerLevel')->name('change_customer_level');*/
});
