<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        try {
            $activities = Activity::all();
            
            $levels = [
                [
                    'level' => 1,
                    'questions' => $activities->slice(0, 2)->map(function ($activity) {
                        return [
                            'activityID' => $activity->activityID,
                            'question' => $activity->activityQuestions,
                            'options' => $activity->activityChoices,
                            'answer' => $activity->activityKey
                        ];
                    })->values() // This ensures a proper array
                ],
                [
                    'level' => 2,
                    'questions' => $activities->slice(2, 2)->map(function ($activity) {
                        return [
                            'activityID' => $activity->activityID,
                            'question' => $activity->activityQuestions,
                            'options' => $activity->activityChoices,
                            'answer' => $activity->activityKey
                        ];
                    })->values() // This ensures a proper array
                ],
                [
                    'level' => 3,
                    'questions' => $activities->slice(4, 2)->map(function ($activity) {
                        return [
                            'activityID' => $activity->activityID,
                            'question' => $activity->activityQuestions,
                            'options' => $activity->activityChoices,
                            'answer' => $activity->activityKey
                        ];
                    })->values() // This ensures a proper array
                ]
            ];
    
            return response()->json([
                'success' => true,
                'levels' => $levels
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
