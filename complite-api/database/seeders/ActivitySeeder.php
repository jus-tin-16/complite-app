<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $activityContent = [
            [
                'activityQuestions'=>  'What is a computer?',
                'activityChoices'=> json_encode(['A Food', 'A Animal', 'An Object', 'A Machine']),
                'activityKey' => 'A Machine',
                'activityPicture' => 'Robot.png'
            ],
            [
                'activityQuestions'=>  'Which tag is used for images in HTML?',
                'activityChoices'=> json_encode(["Mobile App Framework", "Game Engine", "Web Browser"]),
                'activityKey' => 'Mobile App Framework',
                'activityPicture' =>  'react-native.png'
            ],
            [
                'activityQuestions'=>  'Which component is used for touch events?',
                'activityChoices'=> json_encode(["TouchableOpacity", "Pressable", "Button"]),
                'activityKey' => 'TouchableOpacity',
                'activityPicture' => 'touch-events.png'
            ],
            
            [
                'activityQuestions'=>  'Which language is used for styling web pages?',
                'activityChoices'=> json_encode(["Python", "CSS", "Java"]),
                'activityKey' => 'CSS',
                'activityPicture' => 'css.png'
            ],
            [
                'activityQuestions'=>  'How do you apply styles in React Native?',
                'activityChoices'=> json_encode(["CSS", "Stylesheet", "Inline"]),
                'activityKey' => 'Stylesheet',
                'activityPicture' =>  'react-native-styles.png'
            ],
        ];

        DB::table('activity')->insert($activityContent);
    }
}
