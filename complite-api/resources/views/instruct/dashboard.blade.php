@extends('instruct.layout')

@section('title', 'Home-COMPLITE')

@section('content')
        <div class="content-header">
            <h1>Professor Dashboard</h1>
        </div>

        <div class="dashboard-grid">
            <!-- Sections Container -->
            <div class="sections-container">
                <h2>Your Sections</h2>
                <div id="sectionsGrid" class="card-grid">
                    @if($sections == null)
                    <div class="empty-sections">
                        <p>No sections have been created yet.</p>
                        <p>Go to the Sections page to create your first section.</p>
                    </div>
                    @else
                    @foreach($sections as $section)
                    <div class="section-card">
                        <div class="section-card-content">
                            <h3>{{$section->sectionName}}</h3>
                            <p>{{$section->courseName}}</p>
                            <small>{{$section->sectionCode}}</small>
                        </div>
                    </div>
                    @endforeach
                    @endif
                </div>
            </div>

            <!-- News and Calendar Container -->
            <div class="news-container">
                <h2>Recent Student News</h2>
                <div id="studentNews">
                    <!-- Only Student-Generated News Will Be Added Here -->
                </div>
            </div>
        </div>

        <!-- Calendar Container -->
        <div class="calendar-container">
            <h2>Activity Calendar</h2>
            <div id="calendar"></div>
        </div>
@endsection

@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.js"></script>
<script src="{{ asset('js/instructor-main.js') }}"></script>
@endsection