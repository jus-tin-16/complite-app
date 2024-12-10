<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Section;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{
    public function getSection(){
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('enroll_section')
            ->join('section', 'enroll_section.section_ID','=','section.sectionID')
            ->join('instructor_profile', 'section.instructor_ID','=','instructor_profile.instructorID')
            ->select('section.sectionID','section.sectionName','instructor_profile.firstName', 'instructor_profile.lastName', 'instructor_profile.middleName', 'instructor_profile.sex')
            ->where('student_ID', $data)
            ->get();
            
        $data = $sql;

        return $data;
    }

    public function getSectionDetails(){
        $data = json_decode(file_get_contents("php://input"));

        $lookthis = ['student_ID',]

        $sql = DB::table('enroll_section')
            ->join('section', 'enroll_section.section_ID','=','section.sectionID')
            ->join('instructor_profile', 'section.instructor_ID','=','instructor_profile.instructorID')
            ->select('section.sectionID','section.sectionName','instructor_profile.firstName', 'instructor_profile.lastName', 'instructor_profile.middleName', 'instructor_profile.sex')
            ->where('student_ID', $data)
            ->get();

        return $sql->sectionName;
    }
}
