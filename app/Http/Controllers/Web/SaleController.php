<?php

namespace App\Http\Controllers\Web;

use App\CuisineType;
use App\Meal;
use App\MenuItem;
use App\Table;
use App\TableType;
use App\ShopOrder;
use App\Option;
use App\Voucher;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Datetime;

class SaleController extends Controller
{
	protected function getShopOrderPanel(){

		return view('Sale.shop_order_panel');
	}

	protected function getSalePage(){

		$table_lists = Table::orderBy('table_type_id', 'ASC')->get();

		$table_types = TableType::all();

		return view('Sale.sale_page', compact('table_lists','table_types'));
	}

	protected function getPendingShopOrderList(){

		$pending_lists = ShopOrder::where('status', 1)->get();

		return view('Sale.pending_lists', compact('pending_lists'));
	}

	protected function getPendingShopOrderDetails($order_id){

		try {

		$pending_order_details = ShopOrder::findOrFail($order_id);

		} catch (\Exception $e) {
   		    
        	alert()->error("Pending Order Not Found!")->persistent("Close!");
            
            return redirect()->back();
    	}

    	$total_qty = 0 ;

    	$total_price = 0 ;

    	foreach ($pending_order_details->option as $option) {
    			
			$total_qty += $option->pivot->quantity;

			$total_price += $option->sale_price * $option->pivot->quantity;
		}

    	return view('Sale.pending_order_details', compact('pending_order_details','total_qty','total_price'));
	}

	protected function getShopOrderSalePage($table_id){

		$items = MenuItem::all();

		$meal_types = Meal::all();

		$cuisine_types = CuisineType::all();

		if ($table_id == 0) {

			$table_number = 0;

		} else {
			
			$order = ShopOrder::where('table_id', $table_id)->where('status', 1)->first();

			if(!empty($order)){

				return redirect()->route('pending_order_details',$order->id);

			}else{

				$table = Table::where('id', $table_id)->first();

				$table_number = $table->id;

			}
		}

		return view('Sale.order_sale_page', compact('items','meal_types','cuisine_types','table_number'));
	}

	protected function getCountingUnitsByItemId(Request $request){

		$item_id = $request->item_id;
        
        $item = MenuItem::where('id', $item_id)->first();
        
        $units = Option::where('menu_item_id', $item->id)->with('menu_item')->get();
        
        return response()->json($units);
	}

	protected function storeShopOrder(Request $request){ 

		$validator = Validator::make($request->all(), [
			'table_id' => 'required',
			'option_lists' => 'required',
		]);

		if ($validator->fails()) {			

			alert()->error('Something Wrong! Validation Error.');

            return redirect()->back();
		}

		$option_lists = json_decode($request->option_lists);
		
		try {

			$table = Table::where('id', $request->table_id)->first();

				if (empty($table)) {

					$order = ShopOrder::create([
		                'table_id' => $request->table_id,
		                'status' => 1, 										// Order Status = 1
		            ]);

		            $order->order_number = "ORD-".sprintf("%04s", $order->id);

		            $order->save();

		            foreach ($option_lists as $option) {
					
						$order->option()->attach($option->id, ['quantity' => $option->order_qty,'note' => $option->note,'status' => 0]);
					}
					
				} else {
					
					if ($table->status == 2) {

						alert()->error('Something Wrong! Table is not available.');

	            		return redirect()->back();

					} else {
					
						$table->status = 2;

						$table->save();

						$order = ShopOrder::create([
			                'table_id' => $request->table_id,
			                'status' => 1, 										// Order Status = 1
			            ]);

			            $order->order_number = "ORD-".sprintf("%04s", $order->id);

			            $order->save();

			            foreach ($option_lists as $option) {
						
							$order->option()->attach($option->id, ['quantity' => $option->order_qty,'note' => $option->note,'status' => 0]);
						}
					}
				}
			
		} catch (Exception $e) {
			
			alert()->error("Something Wrong! When Store Shop Order");

			return redirect()->back();
		}

      	alert()->success('Successfully Store Shop Order');

      	return redirect()->route('sale_page');
	}

	protected function addMoreItemUI($order_id){  //Finished UI

		try {
            
        	$order = ShopOrder::findOrFail($order_id);

   		} catch (\Exception $e) {
   		    
        	alert()->error("Shop Order Not Found!")->persistent("Close!");
            
            return redirect()->back();

    	}

    	$items = MenuItem::all();

		$meal_types = Meal::all();

		$cuisine_types = CuisineType::all();

		$table_number = $order->table->table_number??0;

		return view('Sale.order_sale_page', compact('items','meal_types','cuisine_types','table_number','order'));
	}

	protected function addMoreItem(Request $request){ //Unfinished

		$validator = Validator::make($request->all(), [
			'order_id' => 'required',
			'option_lists' => 'required',
		]);

		if ($validator->fails()) {			

			alert()->error('Something Wrong! Validation Error.');

            return redirect()->back();
		}

		$option_lists = json_decode($request->option_lists);


		try {

			$shop_order = ShopOrder::findOrFail($request->order_id);

		} catch (\Exception $e) {
			
			alert()->error('Something Wrong! Shop Order Cannot be Found.');

            return redirect()->back();
		}	

		if ($shop_order->status == 1) {

			foreach ($option_lists as $option) {

				$test = $shop_order->option()->where('option_id', $option->id)->first();

				if (empty($test)) {

					$shop_order->option()->attach($option->id, ['quantity' => $option->order_qty,'note' => $option->note, 'status' => 0]);

				} else {

					$update_qty = $option->order_qty + $test->pivot->quantity;

					$shop_order->option()->updateExistingPivot($option->id, ['quantity' => $update_qty] );
				}
			}

			alert()->success('Successfully Addred');

      		return redirect()->route('sale_page');

		} else {
			
			alert()->error('Something Wrong! Shop Order is colsed.');

            return redirect()->back();
		}
	}

	protected function storeShopOrderVoucher(Request $request){

		try {

			$shop_order = ShopOrder::findOrFail($request->order_id);
			
		} catch (\Exception $e) {
			
			return response()->json(['error' => 'Something Wrong! Shop Order Cannot Be Found'], 404);

		}

		$table = Table::where('id', $shop_order->table_id)->first();

		if (!empty($table)) {

			$table->status = 1;

    		$table->save();
		
		}		

		$user_code = $request->session()->get('user')->id;

		$total = 0 ;

		$total_qty = 0 ;

		$now = new DateTime;

		$today = $now->format('Y-m-d');

		foreach ($shop_order->option as $option) {

            $total += ($option->pivot->quantity * $option->sale_price);

            $total_qty += $option->pivot->quantity;
        }

        $voucher = Voucher::create([
            'sale_by' => $user_code,
            'total_price' =>  $total,
            'total_quantity' => $total_qty,
            'voucher_date' => $today,
            'type' => 1,
            'status' => 0,
        ]);

    	$voucher->voucher_code = "VOU-".date('dmY')."-".sprintf("%04s", $voucher->id);

        $voucher->save();

     	foreach ($shop_order->option as $option) {

        	$voucher->option()->attach($option->id, ['quantity' => $option->pivot->quantity,'price' => $option->sale_price]);
    	} 

    	$shop_order->voucher_id = $voucher->id;

    	$shop_order->status = 2;

    	$shop_order->save();

    	return response()->json($shop_order);
	}

	protected function getFinishedOrderList(){

		$order_lists = ShopOrder::where('status', 2)->get();

		return view('Sale.finished_lists', compact('order_lists'));
	}

	protected function getShopOrderVoucher($order_id){

		try {
            
        	$order = ShopOrder::findOrFail($order_id);

   		} catch (\Exception $e) {
   		    
        	alert()->error("Shop Order Not Found!")->persistent("Close!");
            
            return redirect()->back();

    	}

    	$voucher = Voucher::where('id', $order->voucher_id)->first();

    	return view('Sale.voucher', compact('voucher'));
	}

	protected function searchByCuisine(Request $request){

		$cuisine_id = $request->cuisine_id;
        
        $item = MenuItem::where('cuisine_type_id', $cuisine_id)->get();
        
        return response()->json($item);
	}

	protected function getTableByFloor(Request $request){

		$floor = $request->floor_id;

		$table_lists = Table::where('floor', $floor)->get();

		return response()->json($table_lists);
	}

	protected function getTableByTableType(Request $request){

		$floor = $request->floor_id;

		$table_type = $request->table_type;

		$table_lists = Table::where('floor', $floor)->where('table_type_id', $table_type)->get();

		return response()->json($table_lists);
	}
}
