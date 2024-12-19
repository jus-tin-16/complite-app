<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Account;
use Session;

class AccountAuthController extends Controller
{
    public function loginUser(Request $request){
          
        
        $sql = DB::table('accounts')->where('username', $request->username)->first();

        if($sql){
            if(Hash::check($request->password, $sql->password)){
                switch ($sql->accountType) {
                    case 'Student':
                        $request->session()->put('accountId', $sql->accountID);
                        return redirect('student-dashboard');
                    case 'Instructor':
                        $request->session()->put('accountId', $sql->accountID);
                        return redirect('instructor-dashboard');
                    case 'Admin':
                        $request->session()->put('accountId', $sql->accountID);
                        return redirect('admin-dashboard');
                    default:
                        return back()->with('error', 'Invalid password.');
                        break;
                }
            } else {
                return back()->with('error', 'Invalid password.');
            }
        } else {
            return back()->with('error', 'Invalid credentials.');
        }
    }

    public function logout() {
        if(Session::has('accountId')){
            Session::pull('accountId');
            return redirect('/');
        }
    }
}
