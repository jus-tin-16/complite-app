@extends('instruct.layout')

@section('title', 'Profile-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/instructor-profile.css') }}" />
@endsection

@section('content')
<div class="profile-container">
        <div class="profile-picture">
            @if($user->profilePhoto == null)
            <img src="{{ URL('Images/member.png') }}" id="profileImage" alt="Profile Picture">
            @else
            <img src="../path/to/profile-picture.jpg" id="profileImage" alt="Profile Picture">
            @endif
            <label for="upload-picture" class="upload-label">Change Picture</label>
            <input type="file" id="upload-picture" accept="image/*">
        </div>
        <div class="profile-details">
            <h1>User Profile</h1>
            <div class="detail-grid">
                <div class="profile-detail">
                    <span class="detail-label">Username</span>
                    <span class="detail-value" id="username">{{$data->username}}</span>
                </div>
                <div class="profile-detail">
                    <span class="detail-label">Full Name</span>
                    <span class="detail-value" id="full-name">{{$user->firstName}} {{$user->lastName}}</span>
                </div>
                <div class="profile-detail">
                    <span class="detail-label">Email</span>
                    <span class="detail-value" id="email">{{$user->email}}</span>
                </div>
                <div class="profile-detail">
                    <span class="detail-label">Sex</span>
                    <span class="detail-value" id="sex">{{$user->sex}}</span>
                </div>
                <div class="profile-detail">
                    <span class="detail-label">Birth Date</span>
                    <span class="detail-value" id="birth-date">{{$user->birthDate}}</span>
                </div>
            </div>
            <button class="edit-button" id="editProfileBtn">Edit Profile</button>
        </div>
    </div>

    <!-- Edit Profile Modal -->
    <div id="editProfileModal" class="modal">
        <div class="modal-content">
            <h2>Edit Profile</h2>
            <form class="modal-form" id="editProfileForm">
                <input type="text" id="editFullName" placeholder="Full Name" required>
                <input type="email" id="editEmail" placeholder="Email" required>
                <select id="editSex">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="date" id="editBirthDate" required>
                <div class="modal-buttons">
                    <button type="button" class="modal-button cancel" id="cancelEditBtn">Cancel</button>
                    <button type="submit" class="modal-button save">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@section('scripts')
<script src="{{ asset('js/instructor-profile.js') }}"></script>
@endsection