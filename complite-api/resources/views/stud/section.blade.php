@extends('stud.layout')

@section('title', 'Section-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/student-section.css') }}" />
@endsection

@section('content')
<div class="main-content">
        <header class="page-header">
            <div class="content-header">
                <h1>Sections</h1>
                <p>Explore our interactive learning materials</p>
                <button id="addSectionBtn">+ Add Section</button>
            </div>
        </header>

        <div id="addSectionModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Enroll in a Section</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <form id="enrollForm" method="POST" action="{{ route('enrollSection') }}">
                    @if(Session::has('success'))
                    <script>
                        alert({{Session::get('success')}});
                    </script>
                    @endif
                    @if(Session::has('error'))
                    <script>
                        alert({{Session::get('error')}});
                    </script>
                    @endif
                    @csrf
                    <input type="text" name="sectionCode" placeholder="Enter Section Code" required>
                    <span style="color: red;">@error('sectionCode'){{$message}} @enderror</span>
                    <button type="submit">Enroll</button>
                </form>
            </div>
        </div>

        <div class="card-grid">
            @foreach($sections as $section)
            <div href="{{ url('/student-inlesson', ['id' => $section->sectionID]) }}" class="lesson-card">
                <img src="{{ URL('Images/lesson1.gif') }}" alt="Lesson 1">
                <div class="lesson-card-content">
                    <h3>{{$section->sectionName}}</h3>
                    <p>{{$section->courseName}}</p>
                    @if($section->sex == 'Male')
                    <small>Mr. {{$section->firstName}} {{$section->lastName}}</small>
                    @else
                    <small>Ms. {{$section->firstName}} {{$section->lastName}}</small>
                    @endif
                </div>
                <div class="groupedButtons">
                    <p><a class="unenrollButton" href="{{ route  ('unenrollSection', json_encode($section->enrollID)) }}">Unenroll</a></p>
                    <p><a class="viewButton" href="{{ url('/student-inlesson', json_encode($section->sectionID)) }}">Go to Lesson</a></p>
                </div>
            </div>
            @endforeach
        </div>
    </div>

@endsection
@section('scripts')
<script src="{{ asset('js/addSection.js') }}"></script>
<script src="{{ asset('js/student-section.js') }}"></script>
@endsection