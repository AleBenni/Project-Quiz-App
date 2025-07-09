// Element Gathering
const startScreen = document.querySelector('.start-screen');
const quizScreen = document.querySelector('.quiz-screen');
const endScreen = document.querySelector('.end-screen');

const startButton = document.querySelector('.start-button')

const subHeader = document.querySelector('.quiz-screen .sub-header h3');
const answerButtons = document.querySelectorAll('.question');

const scoreCounter = document.querySelector('.scoreTotal');
const timerDisplay = document.querySelector('.timer');

const retryButton = document.querySelector('.retry-button')

// Initial Hiding Elements
startScreen.hidden = false;
quizScreen.hidden = true;
endScreen.hidden = true;

// Variables
let currentQuestionIndex = 0;
let score = 0;
let countDownInterval;

function resetQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    endScreen.hidden = true;
    startScreen.hidden = false;
}

function showQuestion(questionObj) {
    subHeader.textContent = questionObj.question;
    answerButtons.forEach((button, index) => {
        button.textContent = questionObj.answers[index];
    });
    scoreCounter.textContent = currentQuestionIndex + 1;
}

function startTimer() {
    let timer = 15;
    timerDisplay.textContent = timer;
    clearInterval(countDownInterval);
    countDownInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(countDownInterval);
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

function highlightAnswers(correctAnswer) {
    answerButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });
}

function clearHighlights() {
    answerButtons.forEach(button => {
        button.classList.remove('correct');
        button.classList.remove('incorrect');
    });
}

// Swap Screens
startButton.addEventListener('click', () => {
    startScreen.hidden = true;
    quizScreen.hidden = false;
    loadQuestion();
})

// Initial Dummy Questions
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: "Mars"
  },
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Rome", "Paris"],
    correct: "Paris"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: ["Oxygen", "Gold", "Iron", "Silver"],
    correct: "Oxygen"
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    question: "Which ocean is the largest?",
    answers: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct: "Pacific"
  },
  {
    question: "What is the currency of Japan?",
    answers: ["Won", "Yuan", "Yen", "Ruble"],
    correct: "Yen"
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: "Leonardo da Vinci"
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    answers: ["Spanish", "Portuguese", "French", "English"],
    correct: "Portuguese"
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: "Carbon Dioxide"
  },
  {
    question: "What is the boiling point of water in Celsius?",
    answers: ["90°C", "100°C", "110°C", "120°C"],
    correct: "100°C"
  }
];

answerButtons.forEach(button => {
    button.addEventListener('click', handleAnswerClick)
});

// Inject Questions
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        quizScreen.hidden = true;
        endScreen.hidden = false;
        endScreen.querySelector('h3').textContent = `You got ${score} out of ${questions.length} correct!`;
        clearInterval(countDownInterval);
        return;
    }
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
};

function handleAnswerClick(event) {
    if (event.target.textContent === questions[currentQuestionIndex].correct) {
        score++;
    } 
    highlightAnswers(questions[currentQuestionIndex].correct);
    clearInterval(countDownInterval);
    currentQuestionIndex++;
    setTimeout(() => {
        clearHighlights();
        loadQuestion();
    }, 1000);
};

retryButton.addEventListener('click', () => {
    resetQuiz();
});
