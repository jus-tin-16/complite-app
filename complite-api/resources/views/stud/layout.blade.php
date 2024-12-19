<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Student - COMPLITE')</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700;800&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('additional_css')
</head>
<body>
    <header class="header">
        <div class="header-bottom">
            <div class="container">
                <a href="#" class="logo-container">
                    <img src="{{ asset('Images/Logo.png') }}" alt="COMPLITE Robot Mascot" class="logo-image">
                    <span class="logo-text">COMPLITE</span>
                </a>
                <nav class="navbar">
                    <a href="{{ url('/student-dashboard') }}" class="nav-link">Home</a>
                    <a href="{{ url('/student-section') }}" class="nav-link">Sections</a>
                    <a href="{{ url('/student-activity') }}" class="nav-link">Activities</a>
                    <a href="{{ url('/student-profile') }}" class="nav-link">Profile</a>
                    <a href="{{ url('/logout') }}" class="nav-link">Logout</a>
                </nav>
            </div>
        </div>
    </header>

    <main>
        @yield('content')
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="h3">About COMPLITE</h3>
                    <p class="about-text">Educational platform dedicated to interactive learning</p>
                </div>
                
                <div class="footer-section">
                    <h3 class="h3">Navigation</h3>
                    <nav class="footer-nav">
                        <a href="{{ url('/student-dashboard') }}" class="footer-link">Home</a>
                        <a href="{{ url('/student-section') }}" class="footer-link">Sections</a>
                        <a href="{{ url('/student-activity') }}" class="footer-link">Activities</a>
                        <a href="{{ url('/student-profile') }}" class="footer-link">Profile</a>
                    </nav>
                </div>
                
                <div class="footer-section">
                    <h3 class="h3">Contact</h3>
                    <nav class="footer-nav">
                    <p>Email: contact@complite.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <a href="#reportModal" class="footer-link"><h3>Send a Report?</h3></a>
                    </nav>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 COMPLITE. All rights reserved.</p>
            </div>
        </div>
    </footer>
    <!-- Report Modal (existing code) -->
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.esm.js" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.js" nomodule></script>
    <script src="../JS/main.js"></script>
    <script src="{{ asset('js/modal.js') }}"></script>
    @yield('scripts')
</body>
</html>