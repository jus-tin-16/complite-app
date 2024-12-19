

// DOM Elements
const activityImage = document.getElementById('activityImage');
const questionText = document.getElementById('question');
const buttons = [
    document.getElementById('btn1'),
    document.getElementById('btn2'),
    document.getElementById('btn3'),
    document.getElementById('btn4')
];
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const feedbackArea = document.getElementById('feedbackArea');

// Current activity index
let currentActivityIndex = 0;
let selectedAnswer = null;
let userAnswers = []; // Array to store user answers
let startTime = new Date(); // Start time for the activity
let p = 0;

// Function to update activity
function updateActivity(index) {
    const activity = app;

    // Reset previous state
    resetButtonStyles();
    selectedAnswer = null;
    feedbackArea.textContent = '';
    feedbackArea.classList.remove('correct', 'incorrect');
    
    // Update image
    var image = activity.activityPicture
    activityImage.src = "{{ asset('Images/"+image +"') }}";
    
    // Update question
    questionText.textContent = activity.activityQuestions;

    // Update buttons
    buttons.forEach((btn, i) => {
        btn.textContent = activity.activityChoices[i];
        btn.disabled = userAnswers[index] !== undefined; // Disable buttons if an answer was already selected for this question
        btn.addEventListener('click', () => checkAnswer(btn.textContent));
    });
    
    
    // Manage navigation buttons
    nextBtn.textContent = 'Done'  // Change text on the last question
    if (selectedAnswer === null){
        nextBtn.disabled = true;
    } // Disable Next until an answer is selected
}

// Function to check answer
function checkAnswer(selectedIndex) {
    const currentActivity = app;
    
    // Store the selected answer for this activity
    userAnswers[currentActivityIndex] = selectedIndex;
    
    // Reset button styles
    resetButtonStyles();
    
    // Mark selected button
    
    // Update feedback
    if (selectedIndex === currentActivity.activityKey) {
        feedbackArea.textContent = 'Correct!';
        feedbackArea.classList.add('correct');
        p += 50;
        console.log(p);

        const formData = new FormData();

        formData.append('points', p);

        fetch("/scoring", {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const entries = Array.from(formData.entries());
            console.log(entries);
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    } else {
        feedbackArea.textContent = 'Incorrect. Try again!';
        feedbackArea.classList.add('incorrect');
        setTimeout(() => {
            location.reload();
        }, 2000)
    }
    
    // Disable all buttons after an answer is selected
    buttons.forEach(btn => btn.disabled = true);
    
    selectedAnswer = selectedIndex;
    nextBtn.disabled = false; // Enable next button after answering
}

// Function to reset button styles
function resetButtonStyles() {
    buttons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
    });
}

// Next button event listener
nextBtn.addEventListener('click', () => {
    if (currentActivityIndex < app.length - 1) {
        currentActivityIndex++;
        updateActivity(currentActivityIndex);
    } else {
        // Calculate score and time taken
        const endTime = new Date();
        const timeTaken = Math.round((endTime - startTime) / 1000); // Time in seconds
        const score = userAnswers.filter((answer, index) => answer === app.activityKey).length;
        
        // Show results
        //alert(`Activity Complete! Your score: ${score}/${activities.length}\nTime Taken: ${timeTaken} seconds`);
        
        // Optionally, redirect to a ranking or results page (uncomment the line below for redirection)
        window.location.href = '/student-actresult';
    }
});

// Initial activity load
updateActivity(currentActivityIndex);