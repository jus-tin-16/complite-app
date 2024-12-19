<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMPLITE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700;800&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet"  type="text/css" href="{{ asset('css/index.css') }}" />
    <link rel="stylesheet"  href="{{ asset('js/index.js') }}" />
</head>
<body>
    <header class="header">
        <div class="header-bottom">
            <div class="container">
                <a href="#" class="logo-container">
                    <img src="{{ URL('/Images/Logo.png') }}" alt="COMPLITE Robot Mascot" class="logo-image">
                    <span class="logo-text">COMPLITE</span>
                </a>
                <nav class="navbar">
                    <a href="{{ url('/') }}" class="nav-link">Home</a>
                    <a href="{{ url('/about') }}" class="nav-link">About</a>
                    <a href="{{ url('/login') }}" class="nav-link">Login</a>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-mascot">
                        <img src="{{ URL('/Images/Hiro.png') }}" alt="COMPLITE Robot Mascot" class="robot-mascot">
                    </div>
                    <div class="hero-text-content">
                        <h2 class="welcome-text">WELCOME TO</h2>
                        <h1 class="brand-name">COMPLITE</h1>
                        <p class="hero-description">Educational platform dedicated to interactive learning</p>
                        <a href="{{ url('/login') }}" class="cta-button">GET STARTED<span class="arrow">→</span></a>
                    </div>
                </div>
            </div>
        </section>
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
                        <a href="{{ url('/') }}" class="footer-link">Home</a>
                        <a href="{{ url('/about') }}" class="footer-link">About</a>
                        <a href="{{ url('/login') }}" class="footer-link">Profile</a>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.esm.js" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.js" nomodule></script>
    
</body>
</html>