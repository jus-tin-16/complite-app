@extends('stud.layout')

@section('title', 'Course-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/student-inactivity.css') }}" />
@endsection

@section('content')
<div class="character-area">
            <img src="{{ URL('Images/Hiro.png') }}" alt="Character" class="character-image">
        </div>
        <button id="sectionId" value="{{ $secId }}"></button>
        <section class="activity">
            <h1>Activity</h1>
            <div class="question-area">
                <p id="question"></p>
            </div>
            <div class="activity-content">
                <div class="activity-image">
                    <img id="activityImage" src="../path/to/activity-image.jpg" alt="Activity Image">
                </div>
                <div class="activity-controls">
                    <button id="btn1">Button 1</button>
                    <button id="btn2">Button 2</button>
                    <button id="btn3">Button 3</button>
                    <button id="btn4">Button 4</button>
                </div>
            </div>
            <div id="feedbackArea" class="feedback-area"></div>
            <div class="activity-navigation">
                <button id="previousBtn" class="previous">Previous</button>
                <button id="nextBtn" class="next"></button>
            </div>
        </section>
@endsection
@section('scripts')
<script>

    var app = @json($val);

    console.log(app);
</script>
<script src="{{ asset('js/student-inactivity.js') }}"></script>
@endsection