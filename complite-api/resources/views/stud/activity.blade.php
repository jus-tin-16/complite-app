@extends('stud.layout')

@section('title', 'Activity-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/student-activity.css') }}" />
@endsection

@section('content')
<main class="main-content">
        <div class="container">
            <header class="page-header">
                <div class="content-header">
                    <h1>Activities</h1>
                    <p>Engage in interactive learning experiences</p>
                </div>
            </header>

            <div class="content-wrapper">
                <section class="activity-section">
                    <div class="activity-grid">
                        @foreach($activities as $activity)
                        <a href="{{ url('/student-inactivity', ['secId' => $activity->sectionID]) }}" class="activity-card active">
                            <div class="activity-image">
                                <img src="{{ URL('Images/activity.gif') }}" alt="Coding Challenge">
                            </div>
                            <div class="activity-content">
                                <h3>{{$activity->activityName}}</h3>
                                <p>{{$activity->activityStatus}}</p>
                                @if($activity->sex == 'Male')
                                <p>Mr. {{$activity->firstName}} {{$activity->lastName}}</p>
                                @else
                                <p>Ms. {{$activity->firstName}} {{$activity->lastName}}</p>
                                @endif
                                <small>{{$activity->actDueDate}}</small>
                            </div>
                        </a>
                        @endforeach
                    </div>
                </section>

                <aside class="leaderboard">
                    <h2 class="leaderboard-title">Leaderboard</h2>
                    <ul class="leaderboard-list">
                        @foreach($students as $student)
                        <li class="leaderboard-item">
                            <span class="rank">{{$num}}</span>
                            <span class="username">{{$student->firstName}} {{$student->lastName}}</span>
                            <span class="points">{{$student->points}} pts</span>
                        </li>
                        {{$num++}};
                        @endforeach
                    </ul>
                </aside>
            </div>
        </div>
    </main>
@endsection

@section('scripts')
<script src="{{ asset('js/student-activity.js') }}"></script>
@endsection