<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Profile;
use Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function adminDashboard() {
        $data = array();
        if(Session::has('accountId')){
            $data = DB::table('accounts')->where('accountID', Session::get('accountId'))->first();
        }

        $reports = DB::table('reports')
            ->select('accounts.username', 'reports.reportID', 'reports.reportMessage', 'reports.dateTime')
            ->join('accounts', 'reports.account_ID', '=', 'accounts.accountID')->get();

        $students = DB::table('accounts')->where('accountType', 'Student')->get()->count();
        $instructors = DB::table('accounts')->where('accountType', 'Instructor')->get()->count();
        $admins = DB::table('accounts')->where('accountType', 'Admin')->get()->count();

        return view('admin.dashboard', compact('data', 'reports', 'students', 'instructors', 'admins'));
    }

    public function createUser(Request $request){
        $request->validate([
            'firstName' => 'required',
            'middleName' => 'required',
            'lastName' => 'required',
            'birthDate' => 'required',
            'sex' => 'required',
            'email' => 'required',
            'username' => 'required',
            'password' => 'required',
            'accountType' => 'required',
        ]);

        $acc = new Account();
        $acc->username = $request->username;
        $acc->password = Hash::make($request->password);
        $acc->accountType = $request->accountType;

        $sql = DB::table('accounts')->insertGetId(
            array('username' => $acc->username, 'password' => $acc->password, 'accountType' => $acc->accountType)
        );
        
        $prof = new Profile();
        $prof->account_ID = $sql;
        $prof->firstName = $request->firstName;
        $prof->lastName = $request->lastName;
        $prof->middleName = $request->middleName;
        $prof->email = $request->email;
        $prof->sex = $request->sex;
        $prof->birthDate = $request->birthDate;

        switch ($acc->accountType) {
            case 'Student':
                $sql1 = DB::insert('INSERT INTO student_profile (account_ID, firstName, lastName, middleName, email, sex, birthDate) VALUES (?,?,?,?,?,?,?)', 
                    [$prof->account_ID, $prof->firstName, $prof->lastName, $prof->middleName, $prof->email, $prof->sex, $prof->birthDate]);

                if($sql1) {
                    return back()->with('success', 'New Account Created');
                } else {
                    return back()->with('error', 'An error occured');
                }
                break;
            case 'Instructor':
                $sql2 = DB::insert('INSERT INTO instructor_profile (account_ID, firstName, lastName, middleName, email, sex, birthDate) VALUES (?,?,?,?,?,?,?)', 
                [$prof->account_ID, $prof->firstName, $prof->lastName, $prof->middleName, $prof->email, $prof->sex, $prof->birthDate]);

                if($sql2) {
                    return back()->with('success', 'New Account Created');
                } else {
                    return back()->with('error', 'An error occured');
                }
                break;
            case 'Admin':
                $sql3 = DB::insert('INSERT INTO admin (account_ID, firstName, lastName, middleName, email, sex, birthDate) VALUES (?,?,?,?,?,?,?)', 
                [$prof->account_ID, $prof->firstName, $prof->lastName, $prof->middleName, $prof->email, $prof->sex, $prof->birthDate]);

                if($sql3) {
                    return back()->with('success', 'New Account Created');
                } else {
                    return back()->with('error', 'An error occured');
                }
                break;
            default:
                # code...
                break;
        }
    }

    public function sendAction(Request $request) {
        $sql = DB::insert('INSERT INTO actions (account_ID, actionMessage) VALUES (?, ?)', 
                [Session::get('accountId'), $request->replyMessage]);

        if ($sql){
            return response()->json(['success' => 200, 'message' => 'Form submitted successfully!']);
        } else {
            return back()->with('error', 'An error occured');
        }

        return response()->json(['error' => 'An error occured']);
    }

    public function sendReport(Request $request){
        $sql = DB::insert('INSERT INTO reports (account_ID, reportMessage) VALUES (?,?)',
            [Session::get('accountId'), $request->reportMessage]);
        
            if ($sql){
                return response()->json(['success' => 200, 'message' => 'Form submitted successfully!']);
            } else {
                return back()->with('error', 'An error occured');
            }
    
            return response()->json(['error' => 'An error occured']);
    }
}
