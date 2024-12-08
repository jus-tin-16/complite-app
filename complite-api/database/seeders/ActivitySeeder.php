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
                'activityQuestions'=>'What is a computer?',
                'activityChoices'=> json_encode(['A'=>'A Food', 'B' => 'A Animal', 'C'=>'An Object', 'D'=>'A Machine']),
                'activityKey' => 'A Machine',
                'activityPicture' => 'images/Robot.png'
            ]
        ];

        DB::table('activity')->insert($activityContent);
    }
}
