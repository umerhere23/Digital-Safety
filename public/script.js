document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-bars');
  });

  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });

      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
      }
    });
  });

  const optionButtons = document.querySelectorAll('.option-btn');
  const activityResult = document.querySelector('.activity-result');
  const activityFeedback = document.getElementById('activityFeedback');

  optionButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const scenarioCard = this.closest('.scenario-card');
      scenarioCard.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      const feedback = scenarioCard.querySelector('.feedback');
      feedback.classList.remove('hidden');
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

  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  const resultText = document.getElementById('resultText');
  const progressBar = document.getElementById('progressBar');
  const retryBtn = document.getElementById('retryBtn');

  const correctAnswers = {
    q1: 'c',
    q2: 'c',
    q3: 'a',
    q4: 'b',
    q5: 'b'
  };

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
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

    const totalQuestions = Object.keys(correctAnswers).length;
    const percentage = Math.round((score / totalQuestions) * 100);
    quizResult.classList.remove('hidden');

    if (percentage >= 80) {
      resultText.innerHTML = `Congratulations, ${username}! You scored ${score} out of ${totalQuestions} (${percentage}%). You have an excellent understanding of cyberbullying.`;
    } else if (percentage >= 50) {
      resultText.innerHTML = `Good effort, ${username}! You scored ${score} out of ${totalQuestions} (${percentage}%). Review the lesson to improve your knowledge.`;
    } else {
      resultText.innerHTML = `Keep trying, ${username}! You scored ${score} out of ${totalQuestions} (${percentage}%). Review the lesson materials and try again.`;
    }

    setTimeout(() => {
      progressBar.style.width = `${percentage}%`;
    }, 100);

    quizResult.scrollIntoView({ behavior: 'smooth' });
    storeQuizData(username, score, totalQuestions);
  });

  retryBtn.addEventListener('click', function () {
    quizForm.reset();
    quizResult.classList.add('hidden');
    progressBar.style.width = '0%';
  });

  function storeQuizData(username, score, totalQuestions) {
    const quizData = {
      username: username,
      score: score,
      totalQuestions: totalQuestions,
      date: new Date().toISOString()
    };
    const previousResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    previousResults.push(quizData);
    localStorage.setItem('quizResults', JSON.stringify(previousResults));
  }
});
