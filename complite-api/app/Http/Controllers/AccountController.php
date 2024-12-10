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

        if (!empty($data->username) && !empty($data->password)){
            $sql = DB::table('accounts')->where('username', $data->username)->first();
            $id = $sql->accountID;
            $username = $sql->username;
            $password = $sql->password;
            $account = $sql->accountType;
            if (password_verify($data->password, $password)) {
                if ($account == 'Student'){
                    $code = http_response_code(200);
                    $val = [
                        'success' => $code, 
                        'message' => 'Login successfully!', 
                        'user' => array(
                            'id' => $id,
                            'username' => $username,
                            'password' => $password,
                            'account-type' => $account,
                        ),
                    ];
                    return response()->json($val);
                }
            } else {
                $code = http_response_code(400);
                $val = [
                    'error' => $code,
                    'message' => 'Invalid credentials'
                ];
                return response()->json($val);
            }
            /*if (password_verify($data->password, $password)){
                return response();
            } else {
                
            }*/
        }
    }

    public function getProfile(){
        $data = json_decode(file_get_contents("php://input"));
        $sql = DB::table('student_profile')->where('account_ID', $data)->first();
        if ($sql) {
            $code = http_response_code(200);
            $studId = $sql->studentID;
            $fname = $sql->firstName;
            $lname = $sql->lastName;
            $mname = $sql->middleName[0];
            $bdate = $sql->birthDate;
            $mail = $sql->email;
            $pfp = $sql->profilePhoto;
            $s = $sql->sex;
            $p = $sql->points;
            $g = $sql->grades;
            $val = [
                'success' => $code, 
                'data' => array(
                    'studentID'=> $studId,
                    'firstname' => $fname,
                    'lastname' => $lname,
                    'middlename' => $mname,
                    'email' => $mail,
                    'birthdate' => $bdate,
                    'sex' => $s,
                    'profilePhoto' => $pfp,
                    'totalpoints' => $p,
                    'totalgrades' => $g,
                ),
            ];
            return response()->json($val);
        }
    }
}
