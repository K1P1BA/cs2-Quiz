const questions = [
  {
    question: "Який движок використовується в CS2?",
    answers: ["Source 1", "Source 2", "Unreal Engine 5"],
    correct: 1
  },
  {
    question: "Скільки раундів потрібно виграти для перемоги в звичайному матчі?",
    answers: ["16", "10", "13"],
    correct: 2
  },
  {
    question: "Скільки коштує АК-47 у грі?",
    answers: ["$2700", "$3100", "$2500"],
    correct: 0
  },
  {
    question: "Скільки часу дається на розбромбування бомби без C4 Kit?",
    answers: ["5 секунд", "10 секунд", "7 секунд"],
    correct: 1
  },
  {
    question: "Яка граната в CS2 дозволяє розвіяти димову завісу?",
    answers: ["Flashbang", "HE Grenade", "Molotov"],
    correct: 1
  }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const startBox = document.getElementById("start-box");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreText = document.getElementById("score-text");
const timeLeftEl = document.getElementById("time-left");

function startQuiz() {
  startBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timeLeftEl.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeLeftEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 1000);

  const currentQ = questions[currentIndex];
  questionEl.innerText = currentQ.question;
  answersEl.innerHTML = "";

  currentQ.answers.forEach((answerText, index) => {
    const btn = document.createElement("button");
    btn.innerText = answerText;
    btn.onclick = () => selectAnswer(index);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  clearInterval(timer);

  if (selectedIndex === questions[currentIndex].correct) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.innerText = `Ви відповіли правильно на ${score} з ${questions.length} питань!`;
}
