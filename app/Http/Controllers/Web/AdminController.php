<?php

namespace App\Http\Controllers\Web;

use App\Table;
use App\TableType;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    protected function getAdminDashboard() 
	{
		return view('Admin.admin_panel');
	}

	protected function getEmployeeList() 
	{
        $employee = User::where('role_flag', 2)->get();

		return view('Admin.employee_list', compact('employee'));
	}

    protected function storeEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:App\User,email',
            'password' => 'required',
            'phone' => 'required',
            'address' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error("Something Wrong! Validation Error");

            return redirect()->back();
        }

        $image_name = "user.jpg";


            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => \Hash::make($request->password),
                'photo_path' => $image_name,
                'phone' => $request->phone,
                'address' => $request->address,
                'role_flag' => 2,
                'prohibition_flag' => 1,
            ]);
            
        

        alert()->success('Successfully Added');

        return redirect()->route('employee_list');

    }

    protected function getEmployeeDetails($id){

        try {
            
            $employee = Employee::findOrFail($id);

        } catch (\Exception $e) {
            
            alert()->error("Employee Not Found!")->persistent("Close!");
            
            return redirect()->back();

        }

        return view('Admin.employee_details', compact('employee'));
    }

    protected function getTableList(){

        $table_lists = Table::orderBy('table_type_id', 'ASC')->get();

        $table_type_lists = TableType::all();

        return view ('Admin.table_list', compact('table_lists','table_type_lists'));
    }

    protected function storeTableType(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'prefix' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error("Something Wrong! Validation Error");

            return redirect()->back();
        }

        $user_code = $request->session()->get('user')->id;

        try {

            TableType::create([
                'name' => $request->name,
                'prefix' => $request->prefix,
                'created_by' => $user_code,
            ]);
            
        } catch (\Exception $e) {
            
            alert()->error('Something Wrong! When Creating Table Type.');

            return redirect()->back();
        }

        alert()->success('Successfully Added');

        return redirect()->route('table_list');

    }

    protected function updateTableType(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error("Something Wrong! Validation Error");

            return redirect()->back();
        }

        try {
            
            $type = TableType::findOrFail($id);

        } catch (\Exception $e) {
            
            alert()->error("Table Type Not Found!")->persistent("Close!");
            
            return redirect()->back();

        }

        $type->name = $request->name;

        $type->save();

        alert()->success('Successfully Updated!');

        return redirect()->route('table_list');
    }

    protected function storeTable(Request $request){

        $validator = Validator::make($request->all(), [
            'table_type' => 'required',
            'quantity' => 'required',
            'table_prefix' => 'required',
            'floor' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error("Something Wrong! Validation Error");

            return redirect()->back();
        }

        try {
            
            $type = TableType::findOrFail($request->table_type);

        } catch (\Exception $e) {
            
            alert()->error("Table Type Not Found!")->persistent("Close!");
            
            return redirect()->back();

        }

        $prefix = $type->prefix;

        $table_prefix = $request->table_prefix;

        $floor = $request->floor;

        $number_of_table = $request->quantity;

        for ($i = 1; $i <= $number_of_table; $i++) {

            $table = substr($table_prefix, 0, -1);

            $room_num = "$prefix". "-" ."$floor" . "$table" . $i;

            //$room_num = "$build_name". "-" . "$i" . "$prefix" . $j;

            Table::create([
                'table_number' => $room_num,
                'floor' => $floor,
                'table_type_id' => $type->id,
            ]);
            
        }

        alert()->success('Successfully Added!');

        return redirect()->route('table_list'); 
    }
}
