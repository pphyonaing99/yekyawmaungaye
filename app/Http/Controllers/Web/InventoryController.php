<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\CuisineType;
use App\Ingredient;
use App\Meal;
use App\MenuItem;
use App\Option;

class InventoryController extends Controller
{
    protected function getInventoryDashboard()
	{
		return view('Inventory.inv_dashboard');
	}

	//Start Meal
	protected function getMealList()
	{
		$meal_lists =  Meal::all();

		return view('Inventory.meal_list', compact('meal_lists'));
	}

	protected function storeMeal(Request $request)
	{
		$validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {

            return redirect()->back()->withErrors($validator)->withInput();
        }


        $user_code = $request->session()->get('user')->id;

        try {

            $meal = Meal::create([
                'name' => $request->name,
                'created_by' => $user_code,
            ]);
            
        } catch (\Exception $e) {
            
            alert()->error('Something Wrong! When Creating Meal.');

            return redirect()->back();
        }
    
    	
    	alert()->success('Successfully Added');

        return redirect()->route('meal_list');
	}

	protected function updateMeal($id, Request $request)
	{
		try {
            
        	$meal = Meal::findOrFail($id);

   		} catch (\Exception $e) {
   		    
        	alert()->error("Meal Not Found!")->persistent("Close!");
            
            return redirect()->back();

    	}

        $meal->name = $request->name;
        
        $meal->save();
        
        alert()->success('Successfully Updated!');

        return redirect()->route('meal_list');
	}
	//End Meal

	//Start Cuisine Type
	protected function getCuisineTypeList()
	{
		$cuisine_type_lists =  CuisineType::all();

		$meal_lists =  Meal::all();

		return view('Inventory.cuisine_type_list', compact('cuisine_type_lists','meal_lists'));
	}

	protected function storeCuisineType(Request $request)
	{
		$validator = Validator::make($request->all(), [
            'name' => 'required',
            'meal_id' => 'required',
        ]);

        if ($validator->fails()) {

            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user_code = $request->session()->get('user')->id;

        try {

            $category = CuisineType::create([
                'name' => $request->name,
                'meal_id' => $request->meal_id,
                'created_by' => $user_code,
            ]);
            
        } catch (\Exception $e) {
            
            alert()->error('Something Wrong! When Creating Cuisine Type.');

            return redirect()->back();
        }
    
    	
    	alert()->success('Successfully Added');

        return redirect()->route('cuisine_type_list');
	}

	protected function updateCuisineType($id, Request $request)
	{
		try {
            
        	$cuisine = CuisineType::findOrFail($id);

   		} catch (\Exception $e) {
   		    
        	alert()->error("Cuisine Type Not Found!")->persistent("Close!");
            
            return redirect()->back();

    	}
    	
        $cuisine->name = $request->name;

        $cuisine->meal_id = $request->meal_id;
        
        $cuisine->save();
        
        alert()->success('Successfully Updated!');

        return redirect()->route('cuisine_type_list');
	}
	//End Cuisine Type

	//Start Menu Item
	protected function getMenuItemList()
	{
		$menu_item_lists =  MenuItem::whereNull("deleted_at")->orderBy('cuisine_type_id', 'ASC')->get();

		$cuisine_type_lists =  CuisineType::all();	

		return view('Inventory.item_list', compact('menu_item_lists','cuisine_type_lists'));
	}

	protected function storeMenuItem(Request $request)
	{

		$validator = Validator::make($request->all(), [
            'code' => 'required',
            'name' => 'required',
            'cuisine_type_id' => 'required',
        ]);

        if ($validator->fails()) {

        	alert()->error('Validation Error!');

            return redirect()->back();
        }

        $user_code = $request->session()->get('user')->id;

        if (isset($request->customer_console)) {
        	
        	$customer_console = 0;   //Customer ko pya mar

        }else{

        	$customer_console = 1;	//Customer ko ma pya
        }

        if ($request->hasfile('photo_path')) {

			$image = $request->file('photo_path');

			$name = $image->getClientOriginalName();

			$photo_path =  time()."-".$name;

			$image->move(public_path() . '/photo/', $photo_path);
		}
		else{

			$photo_path = "default.jpg";

		}

        try {

            $item = MenuItem::create([
                'item_code' => $request->code,
                'item_name' => $request->name,
                'created_by' => $user_code,
                'photo_path' => $photo_path,
                'customer_console' => $customer_console,
                'cuisine_type_id' => $request->cuisine_type_id,
            ]);
            
        } catch (\Exception $e) {
            
            alert()->error('Something Wrong! When Creating Menu Item.');

            return redirect()->back();
        }

        alert()->success('Successfully Added');

        return redirect()->route('menu_item_list');
	}

    protected function updateMenuItem($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error('Something Wrong!');

            return redirect()->back();
        }

        try {
            
            $item = MenuItem::findOrFail($id);

        } catch (\Exception $e) {
            
            alert()->error("Menu Item Not Found!")->persistent("Close!");
            
            return redirect()->back();

        }

        if (isset($request->customer_console)) {
        	
        	$customer_console = 0;   //Customer ko pya mar

        }else{

        	$customer_console = 1;	//Customer ko ma pya
        }

        if ($request->hasfile('photo_path')) {

			$image = $request->file('photo_path');

			$name = $image->getClientOriginalName();

			$photo_path =  time()."-".$name;

			$image->move(public_path() . '/photo/', $photo_path);
		}
		else{

			$photo_path = "default.jpg";

		}

        $item->item_code = $request->code;

        $item->item_name = $request->name;

        $item->customer_console = $customer_console;

        $item->photo_path = $photo_path;

        $item->cuisine_type_id = $request->cuisine_type_id;

        $item->save();

        alert()->success('Successfully Updated!');

        return redirect()->back();
    }

    protected function deleteMenuItem(Request $request) //Not Finish
    {
        $id = $request->item_id;

        $item = Item::find($id);

        $counting_units = CountingUnit::where('item_id', $item->id)->get();

        foreach ($counting_units as $unit) {
                
            $unit->delete();
        }

        $item->delete();

        return response()->json($item);
    }

    protected function getOptionList($item_id)
    {

        $units = Option::where('menu_item_id', $item_id)->whereNull("deleted_at")->get();

        $ingredient_lists = Ingredient::all();
        
        try {
            
            $item = MenuItem::findOrFail($item_id);

        } catch (\Exception $e) {
            
            alert()->error("Menu Item Not Found!")->persistent("Close!");
            
            return redirect()->back();
        }

        return view('Inventory.unit_list', compact('units','item','ingredient_lists'));
    }

    protected function storeOption(Request $request)
    {   
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'sale_price' => 'required',
            'est_cost_price' => 'required',
            'size' => 'required',
        ]);

        if ($validator->fails()) {

            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user_code = $request->session()->get('user')->id;

        $amount = $request->amount;

        $ingredient = $request->ingredient;

        try {

            $option = Option::create([
                'name' => $request->name,
                'sale_price' => $request->sale_price,
                'est_cost_price' => $request->est_cost_price,
                'size' => $request->size,
                'created_by' => $user_code,
                'menu_item_id' => $request->item_id,
            ]);


            for($count = 0; $count < count($amount); $count++){

                $option->ingredient()->attach($ingredient[$count], ['amount' => $amount[$count]]);
                
            }

        } catch (\Exception $e) {
            
            alert()->error('Something Wrong! When Creating Option.');

            return redirect()->back();
        }

        alert()->success('Successfully Stored!');

        return redirect()->back();
    }

    protected function updateOption($id,Request $request)
    {
        try {
            
            $unit = Option::findOrFail($id);

        } catch (\Exception $e) {
            
            alert()->error("Option Not Found!")->persistent("Close!");
            
            return redirect()->back();

        }

        $unit->name = $request->name;

        $unit->sale_price = $request->sale_price;

        $unit->est_cost_price = $request->est_cost_price;

        $unit->size = $request->size;

        $unit->save();

        alert()->success('Successfully Stored!');

        return redirect()->back();
    }

    protected function deleteOption(Request $request) //Not Finish
    {
        $id = $request->unit_id;
        
        $unit = CountingUnit::find($id);

        $unit->delete();
        
        return response()->json($unit);
    }

    protected function getIngredientList()
    {
        $ingredient_lists = Ingredient::all();

        return view('Inventory.raw_material_list', compact('ingredient_lists'));
    }

    protected function storeIngredient(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'purchase_price' => 'required',
            'unit' => 'required',
            'reorder_qty' => 'required',
            'instock_qty' => 'required',
            'brand_name' => 'required',
            'supplier_name' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error('Validation Error!');

            return redirect()->back()->withErrors($validator);
        }

        try {

            $ingredient = Ingredient::create([
                'name' => $request->name,
                'purchase_price' => $request->purchase_price,
                'unit' => $request->unit,
                'reorder_quantity' => $request->reorder_qty,
                'instock_quantity' =>  $request->instock_qty,
                'brand_name' => $request->brand_name,
                'supplier_name' => $request->supplier_name,
            ]);
            
        } catch (\Exception $e) {
            
            alert()->error('Something Wrong! When Creating Ingredients.');

            return redirect()->back();
        }

        alert()->success('Successfully Added');

        return redirect()->route('ingredient_list');
    }

    protected function updateIngredient($id, Request $request) // Ma pee tay
    {

    }

    protected function editUnitIngredient($id){

        try {
            
            $option = Option::findOrFail($id);

        } catch (\Exception $e) {
            
            alert()->error("Option Type Not Found!")->persistent("Close!");
            
            return redirect()->back();

        }

        $ingredients = $option->ingredient;

        $ingredient_lists = Ingredient::all();

        return view ('Inventory.edit_unit_ingredient', compact('ingredients','ingredient_lists','id'));

    }

    protected function updateUnitIngredient($id, Request $request){

        try {
            
            $option = Option::findOrFail($id);

        } catch (\Exception $e) {
            
            alert()->error("Option Type Not Found!")->persistent("Close!");
            
            return redirect()->back();

        }

        $amount = $request->amount;

        $ingredient = $request->ingredient;

        $option->ingredient()->detach();

        for($count = 0; $count < count($amount); $count++){

            $option->ingredient()->attach($ingredient[$count], ['amount' => $amount[$count]]);
            
        }

        alert()->success('Successfully Updated');

        return redirect()->back();

    }

    protected function getReorderList(Request $Request){

        

        return view('Inventory.reorder_list');
    }

    protected function stockCountUpdate(Request $Request){

        return view('Inventory.stock_update');
    }
}
