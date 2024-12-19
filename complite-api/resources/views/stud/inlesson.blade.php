@extends('stud.layout')

@section('title', 'Course-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/student-inlesson.css') }}" />
@endsection

@section('content')
<section class="lesson">
            <div class="lesson-container">
                <div class="character-area">
                    <img src="{{ URL('Images/Hiro.png')}}" alt="Character" class="character-image">
                </div>
                <div class="lesson-content">
                    @for($i = 0; $i < count($data); $i++)
                    @if($i == 0)
                    <h1>{{$data[$i]}}</h1>
                    @continue
                    @endif
                    <div class="content">
                        <div class="content1">
                            @if($i == 2)
                            <h3>{{$data[$i]}}</h3>
                            <div class="lesson-image">
                                <img src="{{ URL('Images/', $picture) }}" alt="Input Devices">
                            </div>
                            @continue
                            @endif
                            <p>{{$data[$i]}}</p>
                        </div>
                    @endfor
                        <div class="btn-wrapper">
        <button id="doneBtn">Done</button>
    </div>

    <!-- Confirmation Modal -->
    <div id="confirmationModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Ready to Proceed?</h2>
                <p>Are you sure you want to start this activity?</p>
            </div>
            <div class="modal-buttons">
                <button id="cancelBtn" class="btn btn-cancel">Maybe Later</button>
                <button id="confirmBtn" value="{{ $sectionId }}" class="btn btn-confirm">Yes!</button>
            </div>
        </div>
    </div>
            </div>
            </div>
        </section>

@endsection
@section('scripts')
<script>

        // Get a specific parameter value
        const paramValue = document.getElementById('confirmBtn').value;

        console.log(paramValue);
    </script>
<script src="{{ asset('js/student-section.js') }}"></script>
<script src="{{ asset('js/inlesson-modal.js') }}"></script>
@endsection