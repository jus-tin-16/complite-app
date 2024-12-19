@extends('stud.layout')

@section('title', 'Activity-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/resultAct.css') }}" />
@section('content')
<div class="results-container">
        <div class="character-section">
            <div class="mascot-image">
                <img src="{{ asset('Images/Hiro.png') }}" alt="Mascot Robot">
            </div>
        </div>
        
        <div class="results-details">
            <h2>Congratulations!</h2>
            
            <div class="results-section">
                <div class="result-item">
                    <span class="result-icon score-icon"></span>
                    <span class="result-label">Total Points</span>
                    <span class="result-value" id="totalPoints"></span>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" onclick="location.href='/student-activity';">Continue</button>
            </div>
            
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    const user_points = @json($val);

    console.log(user_points.points)
</script>
<script src="{{ asset('js/resultAct.js') }}"></script>
@endsection