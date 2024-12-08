<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $contentId = [
            [
                'section_ID' => 1,
                'lesson_ID' => 1,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 2,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 3,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 4,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 5,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 6,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 7,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 8,
                'activity_ID' => 1,
            ],
            [
                'section_ID' => 1,
                'lesson_ID' => 9,
                'activity_ID' => 1,
            ],
        ];

        DB::table('content')->insert($contentId);
    }
}
