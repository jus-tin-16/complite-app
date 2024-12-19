<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="{{ asset('/css/login.css') }}">
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <p id="errorMessage" class="error">Invalid username or password</p>
        <form id="loginForm" action="{{ route('login-user') }}" method="post">
            @if(Session::has('success'))
            <span style="color: green">{{Session::get('success')}}</span>
            @endif
            @if(Session::has('error'))
            <span style="color: red">{{Session::get('error')}}</span>
            @endif
            @csrf
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required>
            </div>
            <span style="color: red;">@error('username') {{$message}} @enderror</span>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <span style="color: red;">@error('password') {{$message}} @enderror</span>
            <button type="submit" class="submit-btn">Login</button>
        </form>
    </div>
    <script>
        // Check for error parameter in URL
        document.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const errorParam = urlParams.get('error');
            const errorMessage = document.getElementById('errorMessage');
            
            if (errorParam === '1') {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });
    </script>
</body>
</html>