@extends('instruct.layout')

@section('title', 'Section-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/instructor-section.css') }}" />
@endsection
@section('content')
<div class="container">
        <div class="sections-header">
            <h1>Sections Management</h1>
            <button id="createSectionBtn" class="btn">Create New Section</button>
        </div>

        <table class="sections-table">
            <thead>
                <tr>
                    <th>Section Name</th>
                    <th>Section Code</th>
                    <th>Subject</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="sectionsTableBody">
                <!-- Sections will be dynamically added here -->
                <td>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                </td>

            </tbody>
        </table>
    </div>

    <!-- Create Section Modal -->
    <div id="createSectionModal" class="modal">
        <div class="modal-content">
            <span class="modal-close" onclick="sectionManager.hideModal('createSectionModal')">×</span>
            <h2>Create New Section</h2>
            <form id="createSectionForm">
                @csrf
                <input type="text" class="form-input" id="sectionName" placeholder="Section Name" required>
                <input type="text" class="form-input" id="courseName" placeholder="Course Name" required>
                <input type="text" class="form-input" id="activityName" placeholder="Activity Name" required>
                <input type="datetime-local" class="form-input" id="actDueDate" placeholder="Activity Name" required>
                <textarea class="form-input" id="courseDescription" placeholder="Course Description" required> </textarea>
                <button type="submit" class="btn">Create Section</button>
            </form>
        </div>
    </div>

    <!-- Students Modal -->
    <div id="studentsModal" class="modal">
        <div class="modal-content">
            <span class="modal-close" onclick="sectionManager.hideModal('studentsModal')">×</span>
            <h2 id="sectionStudentsTitle">Students in Section</h2>
            <div class="students-table">
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Grades</th>
                            <th>Points</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="sectionStudentsList">
                        <!-- Students will be dynamically added here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="{{ asset('js/instructor-section.js') }}"></script>
@endsection