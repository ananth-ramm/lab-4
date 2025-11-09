const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let questions = [];
let quizActive = false;

async function fetchQuestions() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=5&category=12&type=multiple');
    const data = await res.json();

    questions = data.results.map(q => ({
      question: decodeHTML(q.question),
      answers: shuffle([
        ...q.incorrect_answers.map(a => ({ text: decodeHTML(a), correct: false })),
        { text: decodeHTML(q.correct_answer), correct: true }
      ])
    }));

    startQuiz();
  } catch (err) {
    console.error(err);
    alert("Couldn't load questions. Try again later.");
  }
}

function decodeHTML(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

startBtn.addEventListener('click', fetchQuestions);
restartBtn.addEventListener('click', fetchQuestions);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    endQuiz();
  }
});

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 30;
  quizActive = true;

  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  quizContainer.classList.remove('hidden');

  setNextQuestion();
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (quizActive) endQuiz();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hidden');
  answerButtons.innerHTML = '';
}

function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === 'true';
  if (correct) score++;

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    button.style.backgroundColor =
      button.dataset.correct === 'true' ? '#4CAF50' : '#f44336';
  });

  nextButton.classList.remove('hidden');
}

function endQuiz() {
  quizActive = false;
  clearInterval(timer);

  quizContainer.classList.add('hidden');
  endScreen.classList.remove('hidden');
  finalScore.textContent = `Your score: ${score} / ${questions.length}`;
}


