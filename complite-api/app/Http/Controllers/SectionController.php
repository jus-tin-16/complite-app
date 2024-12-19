<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Section;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{
    public function getSectionList() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('section')
            ->where('instructor_ID', $data)->get();

        return $sql;
    }

    public function addSection() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::insert('INSERT INTO section (instructor_ID, courseName, courseDescription, activityName, sectionName, sectionCode, actDueDate) 
            VALUES (?,?,?,?,?,?,?)', [$data->instructor_id, $data->course_name, $data->course_description, $data->activityname, $data->sectionname, $data->sectioncode, $data->actduedate]);

        if ($sql) {
            $code = http_response_code(200);
            $val = [
                    'success' => $code, 
                    'message' => 'Section Added!', 
                ];
            return response()->json($val);
        } else {
            $val = [
                    'message' => 'Failed to sent create section.', 
                ];
            return response()->json($val);
        }
    }

    public function getEnrolledSection() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('enroll_section')
            ->select('section.sectionName', 'section.sectionID', 'enroll_section.enrollID','section.dateTime', 'instructor_profile.firstName', 'instructor_profile.middleName', 'instructor_profile.lastName')
            ->join('section','enroll_section.section_ID','=','section.sectionID')
            ->join('instructor_profile','section.instructor_ID','=','instructor_profile.instructorID')
            ->where('student_ID', $data)
            ->get();
        
        return $sql;
    }

    public function enrollSection() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('section')->where('sectionCode', $data->sectionCode)->first();

        if ($sql){
            $sql2 = DB::insert('INSERT INTO enroll_section (section_ID, student_ID) 
                VALUES (?,?)', [$sql->sectionID, $data->student_id]);

            if ($sql2){
                $code = http_response_code(200);
                $val = [
                    'success' => $code, 
                    'message' => 'Enrolled Successfully!', 
                ];
                return response()->json($val);
            } else {
                $val = [
                    'message' => 'Failed to enroll section.', 
                ];
                return response()->json($val);
            }
        }
        return $sql;
    }

    public function unEnroll(){
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('enroll_section')->where('enrollID', $data->enrollId)
            ->where('student_ID', $data->student_id)->delete();

            if ($sql){
                $code = http_response_code(200);
                $val = [
                    'success' => $code, 
                    'message' => 'Unenroll Successfully!', 
                ];
                return response()->json($val);
            } else {
                $val = [
                    'message' => 'Failed to unenroll section.', 
                ];
                return response()->json($val);
            }

        return $data;
    }

    public function removeSection(){
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('section')->where('sectionID', $data->section_id)->delete();

            if ($sql){
                $code = http_response_code(200);
                $val = [
                    'success' => $code, 
                    'message' => 'Remove Section Successfully!', 
                ];
                return response()->json($val);
            } else {
                $val = [
                    'message' => 'Failed to remove section.', 
                ];
                return response()->json($val);
            }

        return $data;
    }

    public function getSectionStudents(Request $request)
    {
        try {
            $section_id = $request->input('section_id');
    
            if (!$section_id) {
                return response()->json(['error' => 'Section ID is required'], 400);
            }
    
            // Check if the section exists in enroll_section
            $sectionExists = DB::table('enroll_section')
                ->where('section_ID', $section_id)
                ->exists();
    
            if (!$sectionExists) {
                return response()->json([], 200); // Return empty array if no students
            }
    
            // Fetch students enrolled in the given section
            $students = DB::table('enroll_section')
                ->join('student_profile', 'enroll_section.student_ID', '=', 'student_profile.studentID')
                ->where('enroll_section.section_ID', $section_id)
                ->select(
                    'student_profile.studentID as studentId', 
                    'student_profile.firstName', 
                    'student_profile.middleName', 
                    'student_profile.lastName', 
                    'student_profile.email'
                )
                ->get();
    
            return response()->json($students);
    
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Could not retrieve enrolled students',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
