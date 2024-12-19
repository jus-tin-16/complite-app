<!-- dashboard -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Instructor - COMPLITE')</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Oxanium:wght@800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.css" rel="stylesheet">
    <link href="{{ asset('css/instructor-main.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('additional_css')
</head>
<body>
   

    <header class="header-bottom">
        <div class="container">
            <a href="{{ url('/instructor-dashboard') }}" class="logo">COMPLITE</a>
            <nav class="navbar">
                <a href="{{ url('/instructor-dashboard') }}" class="nav-link">Dashboard</a>
                <a href="{{ url('/instructor-section') }}" class="nav-link">Sections</a>
                <a href="{{ url('/instructor-profile') }}" class="nav-link">Profile</a>
                <a class="nav-link logout-link" onclick="logout()">Logout</a>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content container">
        @yield('content')
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>About COMPLITE</h3>
                <p>Empowering education through interactive learning</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="{{ url('/instructor-dashboard') }}">Dashboard</a></li>
                    <li><a href="{{ url('/instructor-section') }}">Sections</a></li>
                    <li><a href="{{ url('/instructor-profile') }}">Profile</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Support</h3>
                <p>Email: support@complite.com</p>
                <p>Phone: +1 (555) 123-4567</p>
            </div>
            <div class="footer-section">
                <h3>About Us</h3>
                <p>COMPLITE is dedicated to creating innovative educational experiences and interactive learning platforms.</p>
            </div>
            <div class="footer-section">
                <a href="#reportModal" class="footer-link"><h3>Send a Report?</h3></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 COMPLITE. All rights reserved.</p>
        </div>

    </footer>
    <div id="reportModal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Submit a Report</h2>
        <form id="reportForm" method="POST">
            @csrf
            <div class="form-group">
                <label for="reportMessage">Report Details</label>
                <textarea id="reportMessage" name="reportMessage" rows="4" placeholder="Describe your report..." required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Report</button>
        </form>
    </div>
</div>

<!-- Confirmation Modal (existing code) -->
<div id="confirmationModal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Report Submitted</h2>
        <p>Your report has been successfully sent.</p>
        <button class="close-confirmation-btn">Close</button>
    </div>
</div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/modal.js') }}"></script>
    <script src="{{ asset('js/logout.js') }}"></script>
    @yield('scripts')
    <!-- Scripts -->
</body>
</html>