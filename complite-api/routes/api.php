<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\SectionController;

Route::post('/login', [AccountController::class, 'loginUser']);

Route::post('/profile', [AccountController::class,'getProfile']);

Route::post('/section', [SectionController::class, 'getSection']);

Route::post('/sectioninfo', [SectionController::class, 'getSectionDetails']);