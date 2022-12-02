<?php

namespace App\Http\Controllers\Web;

use App\Order;
use App\User;
use App\Voucher;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected function getOrderPanel(){

    	return view('Order.order_panel');
    }

    protected function getOrderPage($type){

    	$order_lists = Order::where('status',$type)->orderBy('id', 'desc')->get();

    	$employee_lists = User::where('role_flag' , 2)->get();

    	return view('Order.order_page', compact('order_lists','type','employee_lists'));
    }

    protected function getOrderDetailsPage($id){

        try {
            
            $order = Order::findOrFail($id);

        } catch (\Exception $e) {

            alert()->error("Order Not Found!")->persistent("Close!");
            
            return redirect()->back();
        }
        
        return view('Order.order_details', compact('order'));
    }

    protected function changeOrderStatus(Request $request){

        $validator = Validator::make($request->all(), [
            'order_id' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error('Something Wrong! Validation Error!');

            return redirect()->back();
        }

        $user = session()->get('user');

    	try {
            
        	$order = Order::findOrFail($request->order_id);

   		} catch (\Exception $e) {
   		    
        	alert()->error("Order Not Found!")->persistent("Close!");
            
            return redirect()->back();
    	}

        if ($order->status == 1 ) {

            $order->status = 2;

            $order->save();

            alert()->success('Successfully Changed');

            return redirect()->back();             

        }elseif ($order->status == 2 ) {
            
            if (is_null($request->delivered_date) && is_null($request->employee)) {
                
                alert()->error("Something Wrong! Delivered Date and Delivery Person Can't be Empty!")->persistent("Close!");

                return redirect()->back();
            }
            else{

                $total = 0;

                $order->status = 3;

                $order->employee_id = $request->employee;

                $order->delivered_date = $request->delivered_date;

                $order->save();

                foreach ($order->option as $option) {

                    $total += ($option->pivot->quantity * $option->sale_price);
                }

                $voucher = Voucher::create([
                    'sale_by' => $user->id,
                    'total_price' =>  $total,
                    'total_quantity' => $order->total_quantity,
                    'voucher_date' => $request->delivered_date,
                    'type' => 2,
                    'status' => 0,
                ]);

                $voucher->voucher_code = "VOU-".date('dmY')."-".sprintf("%04s", $voucher->id);

                $voucher->save();

                foreach ($order->option as $option) {
            
                    $voucher->option()->attach($option->id, ['quantity' => $option->pivot->quantity,'price' => $option->sale_price]);

                }                

                alert()->success('Successfully Changed');

                return view('Order.order_voucher', compact('voucher','order'));

            }  

        }else{

            alert()->error('Something Wrong! Order is Delivered!');

            return redirect()->back();

        } 	

    	
    }
}
