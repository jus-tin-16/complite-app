<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    public function index(){
        return Account::all();
    }

    public function loginUser(Request $request){
        $data = json_decode(file_get_contents("php://input"));

        //$data = DB::table('accounts')->where('username', $username)->find();
        //$this->where('username', $request->username)->first();

        if (!empty($data->username) && !empty($data->password)){
            $username = htmlspecialchars(strip_tags($data->username));
            $password = htmlspecialchars(strip_tags($data->password));
            $sql = DB::table('accounts')->where('username', $username)->first();
            $password2 = $sql->password;
            $verify = (($password) == ($password2));
            if ($verify == 1) {
                http_response_code(200);
                $val = ['message' => 'Login successfully!'];
                return response()->json($val);
            }
            /*if (password_verify($data->password, $password)){
                return response();
            } else {
                
            }*/
        }
    }
}
