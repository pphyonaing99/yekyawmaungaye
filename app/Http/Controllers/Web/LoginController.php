<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Session;
use Auth;

class LoginController extends Controller
{
    protected function index(Request $request) {

        if (Session::has('user')) {

            if($request->session()->get('user')->role_flag == 1){

                return view('dashboard');

            }elseif ($request->session()->get('user')->role_flag == 4) {
                
                return redirect()->route('inven_dashboard');

            }
            elseif ($request->session()->get('user')->role_flag == 2) {
                
                dd("Hello");

            }                          
        } 
        else{

            return view('login');
            
        }       
		
	}

    protected function loginProcess(Request $request){

        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {

            alert()->error('Something Wrong! Validation Error!');

            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::where('email', $request->email)->first();
        
        if (!isset($user)) {

            alert()->error('Wrong Email!');
            
            return redirect()->back();
        }
        elseif (!\Hash::check($request->password, $user->password)) {
            
            alert()->error('Wrong Password!');
            
            return redirect()->back();
        }
        
        session()->put('user', $user);

        if ($user->role_flag == 1) {
            
            alert()->success("Successfully Login");
            
            return view('dashboard');   
        }
        elseif ($user->role_flag == 2) {
            
            alert()->success("Successfully Login");
            
            return redirect()->route('sale_page');

        }
        elseif ($user->role_flag == 4) {
            
            alert()->success("Successfully Login");
            
            return redirect()->route('inven_dashboard');

        }
        else{
            
            Session::flush();

            return redirect()->route('index');

        }

    }

    protected function logoutProcess(Request $request){

        Session::flush();
        
        alert()->success("Successfully Logout");

        return redirect()->route('index');

    }

    protected function getChangePasswordPage(){

        return view('change_pw');
    }

    protected function updatePassword(Request $request){

        $validator = Validator::make($request->all(), [
            'current_pw' => 'required',
            'new_pw' => 'required|confirmed|min:6|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\X])(?=.*[!$#%]).*$/'
        ]);

        if ($validator->fails()) {

            alert()->error('Something Wrong!');
            return redirect()->back()->withErrors($validator);

        }

        $user = $request->session()->get('user');
            
        $current_pw = $request->current_pw;

        if(!\Hash::check($current_pw, $user->password)){

            alert()->info("Wrong Current Password!");

            return redirect()->back();
        }

        $has_new_pw = \Hash::make($request->new_pw);

        $user->password = $has_new_pw;

        $user->save();

        alert()->success('Successfully Changed!');

        return redirect()->route('admin_dashboard');
    }
}
