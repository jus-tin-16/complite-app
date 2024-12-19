<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Session;
use Illuminate\Support\Facades\DB;

class InstructorController extends Controller
{
    public function instructorDashboard() {

        $sections = array();
        if(Session::has('instructorId')){
            $sections = DB::table('section')->where('instructor_ID', Session::get('instructorId'))
                ->get();
        }

        return view('instruct.dashboard', compact('sections'));
    }

    public function instructorSection(){
        return view('instruct.section');
    }

    public function instructorProfile(){
        $user = array();

        if(Session::has('accountId')){
            $user = DB::table('instructor_profile')->where('account_ID', Session::get('accountId'))->first();
            Session::put('instructorId', $user->instructorID);
        }

        $data = array();
        if(Session::has('accountId')){
            $data = DB::table('accounts')->where('accountID', Session::get('accountId'))->first();
        }

        return view('instruct.profile', compact('user', 'data'));
    }

    public function addSection(Request $request) {

        if(Session::has('instructorId')){
            $sql = DB::table('section')->insertGetId(
                array('instructor_ID' => Session::get('instructorId'), 'courseName' => $request->courseName, 'courseDescription' => $request->courseDescription, 'activityName'=>$request->activityName, 'sectionName'=>$request->sectionName, 'sectionCode'=>$request->sectionCode, 'actDueDate'=>$request->actDueDate));
            
            if ($sql) {
                $code = http_response_code(200);
                $val = [
                        'success' => $code, 
                        'message' => $sql, 
                    ];
                return response()->json($val);
            } else {
                $val = [
                        'message' => 'Failed to sent create section.', 
                    ];
                return response()->json($val);
            }
        }

        return response()->json();
    }

    public function getSection() {
        if(Session::has('instructorId')){
            $sql = DB::table('section')->where('instructor_ID', Session::get('instructorId'))
                ->get();

            if ($sql){
                $code = http_response_code(200);
                $val = [
                        'success' => $code, 
                        'data' => $sql, 
                    ];
                return response()->json($val);
            } else {
                $val = [
                    'message' => 'No section listed.', 
                ];
                return response()->json($val);
            }
        }
    }

    public function delSection(Request $request){


        $sql = DB::table('section')->where('sectionID', $request->sectionId)->delete();

        if ($sql){
            $code = http_response_code(200);
            $val = [
                    'success' => $code, 
                    'message' => 'Section removed.', 
                ];
            return response()->json($val);
        } else {
            $val = [
                'message' => "Failed to remove section", 
            ];
            return response()->json($val);
        }
    }

    public function getEnrolledStudents(Request $request){
        $sql = DB::table('enroll_section')
            ->select('student_profile.firstName', 'student_profile.lastName', 'student_profile.points', 'student_profile.grades')
            ->join('student_profile', 'enroll_section.student_ID', '=', 'student_profile.studentID')
            ->where('section_ID', $request->sectionId)->get();
        
            if ($sql){
                $code = http_response_code(200);
                $val = [
                        'success' => $code, 
                        'data' => $sql, 
                    ];
                return response()->json($val);
            } else {
                $val = [
                    'message' => 'No section listed.', 
                ];
                return response()->json($val);
            }
    }
}
