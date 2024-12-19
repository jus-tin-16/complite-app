<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div class="sidebar">
        <h2>Admin Dashboard</h2>
        <div class="sidebar-menu">
            <button class="sidebar-btn active" onclick="showSection('accountForm')">
                <i class="fas fa-user"></i> Account
            </button>
            <button class="sidebar-btn" onclick="showSection('reportsSection')">
                <i class="fas fa-chart-bar"></i> Reports</button>
            <button class="sidebar-btn" onclick="showSection('userOverview')">
                <i class="fas fa-users"></i> User Overview
            </button>
            <button class="sidebar-btn logout-btn" onclick="logout">
                <i class="fas fa-sign-out-alt"></i>Logout
            </button>
        </div>
    </div>

    <div class="main-content">
        <form  method="post" action="{{ route('register') }}">
            @if(Session::has('success'))
            <span style="color: green">{{Session::get('success')}}</span>
            @endif
            @if(Session::has('error'))
            <span style="color: red">{{Session::get('error')}}</span>
            @endif
            @csrf
            <div class="dashboard-card" id="accountForm">
                <h3>Create Account</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" class="form-input" placeholder="Enter First Name" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" class="form-input" placeholder="Enter Last Name" required>
                    </div>
                    <div class="form-group">
                        <label>Middle Name</label>
                        <input type="text" name="middleName" class="form-input" placeholder="Enter Middle Name">
                    </div>
                    <div class="form-group">
                        <label>Birthdate</label>
                        <input type="date" name="birthDate" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label>Sex</label>
                        <select name="sex" class="form-input" required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-input" placeholder="Enter Email" required>
                    </div>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" class="form-input" placeholder="Enter Username" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" class="form-input" placeholder="Enter Password" required>
                    </div>
                    <div class="form-group">
                        <label>Account Type</label>
                        <select name="accountType" class="form-input" required>
                            <option value="Admin">Admin</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="submit-btn" style="width: 100%; margin-top: 20px;">Create Account</button>
            </div>
        </form>

 <!-- Reports Section -->
<div id="reportsSection" class="dashboard-card">
    <h3>Reports</h3>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Report ID</th>
                    <th>From User</th>
                    <th>Description</th>
                    <th>Time and Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reports as $val)
                <tr>
                    <td>{{$val->reportID}}</td>
                    <td>{{$val->username}}</td>
                    <td>{{$val->reportMessage}}</td>
                    <td>{{$val->dateTime}}</td>
                    <td>
                        <!-- Removed email parameter since it's not available -->
                        <button class="reply-btn" onclick="openReplyModal({{$val->reportID}})">
                            Reply
                        </button>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
            @if(!$reports)
            <p style="color: red">No reports available.</p>
            @endif
    </div>
</div>

<!-- Reply Modal -->
<div id="replyModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="closeReplyModal()">&times;</span>
        <h4>Reply to Report</h4>
        <form id="replyForm">
            @csrf
            <input type="hidden" id="reportID" name="reportID">
            <textarea id="replyMessage" name="replyMessage" rows="5" placeholder="Enter your reply..." required></textarea>
            <button type="submit" class="submit-btn" >Send Reply</button>
        </form>
    </div>
</div>

<!-- Success Modal -->
<div id="successModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="closeSuccessModal()">&times;</span>
        <h4>Reply sent successfully!</h4>
        <p>Your message has been saved.</p>
    </div>
</div>
        <!-- User Overview -->
        <div id="userOverview" class="dashboard-card" style="display: none;">
            <h3>User Overview</h3>
            <div class="stat-grid">
                <div class="stat-card">
                    <h4>Total Students</h4>
                    <p id="totalStudents">{{$students}}</p>
                </div>
                <div class="stat-card">
                    <h4>Total Instructors</h4>
                    <p id="totalInstructors">{{$instructors}}</p>
                </div>
                <div class="stat-card">
                    <h4>Total Admins</h4>
                    <p id="totalAdmins">{{$admins}}</p>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/admin.js') }}"></script>
    <script src="{{ asset('js/handler.js') }}"></script>
    <script src="{{ asset('js/logout.js') }}"></script>
</body>
</html>