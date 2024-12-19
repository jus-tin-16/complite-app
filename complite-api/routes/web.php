<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountAuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
})->name('home')->middleware('alreadyLoggedIn');

Route::get('/about', function () {
    return view('about');
})->middleware('alreadyLoggedIn');

Route::get('/login', function () {
    return view('login');
})->middleware('alreadyLoggedIn');

Route::post('/login-user', [AccountAuthController::class, 'loginUser'])->name('login-user');

Route::get('/logout', [AccountAuthController::class, 'logout']);

Route::group([], function () {
    Route::get('/admin-dashboard', [AdminController::class, 'adminDashboard'])->middleware('isLoggedIn');
    Route::post('/register', [AdminController::class, 'createUser'])->name('register');
    Route::get('/reports', [AdminController::class, 'getReports'])->name('reports');    
    Route::post('/reply', [AdminController::class, 'sendAction'])->name('reply');
    Route::post('/sendreport', [AdminController::class, 'sendReport'])->name('report');
});

Route::group([], function () {
    Route::get('/instructor-dashboard', [InstructorController::class, 'instructorDashboard'])->middleware('isLoggedIn');
    Route::get('/instructor-section', [InstructorController::class, 'instructorSection'])->middleware('isLoggedIn');
    Route::get('/instructor-profile', [InstructorController::class, 'instructorProfile'])->middleware('isLoggedIn');
    Route::post('/addsection', [InstructorController::class, 'addSection'])->name('create');
    Route::get('/getsection', [InstructorController::class, 'getSection'])->name('getSection');
    Route::post('/deletesection', [InstructorController::class, 'delSection'])->name('removeSection');
    Route::post('/liststudent', [InstructorController::class, 'getEnrolledStudents'])->name('listStudents');
});

Route::group([], function () {
    Route::get('/student-dashboard', [StudentController::class, 'studentDashboard'])->middleware('isLoggedIn');
    Route::get('/student-section', [StudentController::class, 'studentSection'])->middleware('isLoggedIn');
    Route::get('/student-inlesson/{id}', [StudentController::class, 'studentInLesson'])->middleware('isLoggedIn');
    Route::get('/student-inactivity/{secid}', [StudentController::class, 'studentInActivity'])->middleware('isLoggedIn');
    Route::get('/student-activity', [StudentController::class, 'studentActivity'])->middleware('isLoggedIn');
    Route::get('/student-profile', [StudentController::class, 'studentProfile'])->middleware('isLoggedIn');
    Route::get('/student-actresult', [StudentController::class, 'resultInActivity'])->middleware('isLoggedIn');
    Route::post('/enrollsection', [StudentController::class, 'enrollSection'])->name('enrollSection');
    Route::post('/getAct', [StudentController::class, 'getActivity'])->name('activities');
    Route::post('/scoring', [StudentController::class, 'puttingPoints'])->name('score');
    Route::get('/unenroll/{eid?}', [StudentController::class, 'unEnrollSection'])->name('unenrollSection');
});