document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-times');
      this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
      });
    });
    
    // Interactive activity
    const optionButtons = document.querySelectorAll('.option-btn');
    const activityResult = document.querySelector('.activity-result');
    const activityFeedback = document.getElementById('activityFeedback');
    
    optionButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all buttons in this scenario
        const scenarioCard = this.closest('.scenario-card');
        scenarioCard.querySelectorAll('.option-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show feedback for this scenario
        const feedback = scenarioCard.querySelector('.feedback');
        feedback.classList.remove('hidden');
        
        // Check if all scenarios have been answered
        checkActivityCompletion();
      });
    });
    
    function checkActivityCompletion() {
      const allScenarios = document.querySelectorAll('.scenario-card');
      let completedCount = 0;
      
      allScenarios.forEach(scenario => {
        if (scenario.querySelector('.option-btn.active')) {
          completedCount++;
        }
      });
      
      if (completedCount === allScenarios.length) {
        showActivityResults();
      }
    }
    
    function showActivityResults() {
      activityResult.classList.remove('hidden');
      activityFeedback.textContent = "Great job completing the scenarios! Remember these strategies when you encounter cyberbullying in real life.";
    }
    
    // Quiz functionality
    const quizForm = document.getElementById('quizForm');
    const quizResult = document.getElementById('quizResult');
    const resultText = document.getElementById('resultText');
    const progressBar = document.getElementById('progressBar');
    const retryBtn = document.getElementById('retryBtn');
    
    // Correct answers
    const correctAnswers = {
      q1: 'c',
      q2: 'c',
      q3: 'a',
      q4: 'b',
      q5: 'b'
    };
    
    quizForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get username
      const username = document.getElementById('username').value;
      
      // Check answers
      let score = 0;
      const userAnswers = {};
      
      for (const question in correctAnswers) {
        const selectedOption = this.querySelector(`input[name="${question}"]:checked`);
        
        if (selectedOption) {
          userAnswers[question] = selectedOption.value;
          
          if (selectedOption.value === correctAnswers[question]) {
            score++;
          }
        }
      }
      
      // Calculate percentage
      const totalQuestions = Object.keys(correctAnswers).length;
      const percentage = Math.round((score / totalQuestions) * 100);
      
      // Display results
      quizResult.classList.remove('hidden');
      
      if (percentage >= 80) {
        resultText.innerHTML = `Congratulations, ${username}! You scored ${score} out of ${totalQuestions} (${percentage}%). You have an excellent understanding of cyberbullying.`;
      } else if (percentage >= 50) {
        resultText.innerHTML = `Good effort, ${username}! You scored ${score} out of ${totalQuestions} (${percentage}%). Review the lesson to improve your knowledge.`;
      } else {
        resultText.innerHTML = `Keep trying, ${username}! You scored ${score} out of ${totalQuestions} (${percentage}%). Review the lesson materials and try again.`;
      }
      
      // Animate progress bar
      setTimeout(() => {
        progressBar.style.width = `${percentage}%`;
      }, 100);
      
      // Scroll to results
      quizResult.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Retry quiz button
    retryBtn.addEventListener('click', function() {
      quizForm.reset();
      quizResult.classList.add('hidden');
      progressBar.style.width = '0%';
    });
    
    // Store quiz data in JSON (simulated)
    function storeQuizData(username, score, totalQuestions) {
      const quizData = {
        username: username,
        score: score,
        totalQuestions: totalQuestions,
        date: new Date().toISOString()
      };
      
      // In a real application, you would send this data to a server
      console.log('Quiz data to be stored:', quizData);
      
      // For demonstration, we'll store it in localStorage
      const previousResults = JSON.parse(localStorage.getItem('quizResults')) || [];
      previousResults.push(quizData);
      localStorage.setItem('quizResults', JSON.stringify(previousResults));
    }
  });