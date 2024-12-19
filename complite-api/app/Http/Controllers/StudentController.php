<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Session;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function studentDashboard() {
        $data = array();
        if(Session::has('accountId')){
            $data = DB::table('accounts')->where('accountID', Session::get('accountId'))->first();
        }

        return view('stud.dashboard', compact('data'));
    }

    public function studentSection() {
        $sections = array();
        if(Session::has('studentId')){
            $sections = DB::table('enroll_section')
                ->select('enroll_section.enrollID','section.sectionID', 'section.sectionName', 'section.courseName', 'instructor_profile.firstName', 'instructor_profile.lastName', 'instructor_profile.sex')
                ->join('section', 'enroll_section.section_ID', '=', 'section.sectionID')
                ->join('instructor_profile', 'section.instructor_ID', '=', 'instructor_profile.instructorID')
                ->where('student_ID', Session::get('studentId'))->get();
        }

        return view('stud.section', compact('sections'));
    }  

    public function studentActivity() {
        $num = 1;
        $students = array();

        $students = DB::table('student_profile')
            ->select('firstName', 'lastName', 'points')
            ->get()
            ->sortByDesc('points');

        $activities = array();

        if(Session::has('studentId')){
            $activities = DB::table('enroll_section')
            ->select('section.sectionID', 'enroll_section.activityStatus', 'section.activityName', 'section.actDueDate', 'instructor_profile.firstName', 'instructor_profile.lastName', 'instructor_profile.sex')
            ->join('section', 'enroll_section.section_ID', '=', 'section.sectionID')
            ->join('instructor_profile', 'section.instructor_ID', '=', 'instructor_profile.instructorID')
            ->where('student_ID', Session::get('studentId'))->get();
    
        }

        return view('stud.activity', compact('activities', 'students', 'num'));
    }

    public function studentInLesson($id) {

        $lessid = json_decode($id);

        $sectionId = $lessid;

        $lesson = array();

        $lesson = DB::table('content')
            ->select('lesson.lessonPicture', 'lesson.lessonContent')
            ->join('lesson', 'content.lesson_ID', '=', 'lesson.lessonID')
            ->where('section_ID', $lessid)->first();

        $data = json_decode($lesson->lessonContent);
        $picture = json_decode($lesson->lessonPicture);

        return view('stud.inlesson', ['picture'=>$picture], ['data'=>$data])->with(['sectionId'=>$sectionId]);
    }

    public function studentInActivity($id) {

        $sec = json_decode($id);

        $secId = $sec;

        $sql = DB::table('content')
            ->select('activity.activityQuestions','activity.activityChoices', 'activity.activityKey', 'activity.activityPicture')
            ->join('activity', 'content.activity_ID', '=', 'activity.activityID')
            ->where('section_ID', $secId)
            ->first();

        
        $val = [
            'activityQuestions' => $sql->activityQuestions,
            'activityChoices' => json_decode($sql->activityChoices),
            'activityKey' => $sql->activityKey,
            'activityPicture' => $sql->activityPicture
        ];

        return view('stud.inactivity', compact('val'))->with(['secId'=>$secId]);
    }

    public function resultInActivity() {
        $val = array();

        $val = DB::table('student_profile')
            ->select('points')
            ->where('studentID', Session::get('studentId'))
            ->first();
        
        $sql = DB::table('enroll_section')->where('student_ID', Session::get('studentId'))
            ->update(['activityStatus' => 'Completed']);

        return view('stud.result', compact('val'));
    }

    public function studentProfile() {
        $user = array();

        if(Session::has('accountId')){
            $user = DB::table('student_profile')->where('account_ID', Session::get('accountId'))->first();
            Session::put('studentId', $user->studentID);
        }

        $data = array();
        if(Session::has('accountId')){
            $data = DB::table('accounts')->where('accountID', Session::get('accountId'))->first();
        }

        return view('stud.profile', compact('user', 'data'));
    }

    public function enrollSection(Request $request){
        $request->validate([
            'sectionCode' => 'required|min:6',
        ]);

        $sql = DB::table('section')->where('sectionCode', $request->sectionCode)->first();

        if ($sql){
            $sql2 = DB::insert('INSERT INTO enroll_section (section_ID, student_ID) 
                VALUES (?,?)', [$sql->sectionID, Session::get('studentId')]);

            if ($sql2){
                return back()->with('success', 'Successfully Enrolled Section.');
            } else {
                return back()->with('error', 'Failed to Enroll');
            }
        }
        return back()->with('error', 'Invalid.');
    }

    public function unEnrollSection($eid){

        $enrollId = json_decode($eid);

        $sql = DB::table('enroll_section')->where('enrollID', $enrollId)
            ->where('student_ID', Session::get('studentId'))->delete();


        return redirect('student-section');

    }

    public function getActivity(Request $request){

        $sql = DB::table('content')
            ->select('activity.activityQuestions','activity.activityChoices', 'activity.activityKey', 'activity.activityPicture')
            ->join('activity', 'content.activity_ID', '=', 'activity.activityID')
            ->where('section_ID', $request->sectionId)
            ->first();

        if($sql){
            $val = [
                'question' => $sql->activityQuestions,
                'choices' => json_decode($sql->activityChoices),
                'key' => $sql->activityKey,
                'picture' => $sql->activityPicture
            ];
            return response()->json($val);
        }
    }

    public function puttingPoints(Request $request){

        $points = intval($request->points);

        $currPoints = DB::table('student_profile')
            ->select('points')
            ->where('studentID', Session::get('studentId'))
            ->first();

        $points += $currPoints->points;

        $sql = DB::table('student_profile')->where('studentID', Session::get('studentId'))
            ->update(['points' => $points]);

        if ($sql) {
            return response()->json('success');
        } else {
            return response()->json($sql);
        }
    }
}
