@extends('stud.layout')

@section('title', 'Profile-COMPLITE')

@section('additional_css')
<link rel="stylesheet" href="{{ asset('css/student-profile.css') }}" />
@endsection

@section('content')
<div class="profile-container">
        <div class="profile-picture">
            @if($user->profilePhoto == null)
            <img src="{{ URL('Images/Hiro2.png') }}" id="profileImage" alt="Profile Picture">
            @else
            <img src="{{ URL('Images/', $user->profilePhoto) }}" id="profileImage" alt="Profile Picture">
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
                <div class="profile-detail">
                    <span class="detail-label">Points</span>
                    <span class="detail-value" id="birth-date">{{$user->points}}</span>
                </div>
            </div>
            <button class="edit-button">Edit Profile</button>
        </div>
    </div>
@endsection

@section('scripts')
<script scr="{{ asset('js/student-profile.js') }}" ></script>
@endsection