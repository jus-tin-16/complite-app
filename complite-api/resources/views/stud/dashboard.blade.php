@extends('stud.layout')

@section('title', 'Home-COMPLITE')

@section('content')
    <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-mascot">
                        <img src="{{ asset('Images/Hiro.png') }}" alt="COMPLITE Robot Mascot" class="robot-mascot">
                    </div>
                    <div class="hero-text-content">
                        <h2 class="welcome-text">WELCOME TO</h2>
                        <h1 class="brand-name">COMPLITE</h1>
                        <p class="hero-description">Educational platform dedicated to interactive learning</p>
                        <a href="#lesson" class="cta-button">GET STARTED<span class="arrow">→</span></a>
                    </div>
                </div>
            </div>
        </section>
@endsection

