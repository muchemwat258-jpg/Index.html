
const questions = [
  {
    category: "SCIENCE",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1,
    explanation: "Mars looks reddish because its surface contains iron oxide."
  },
  {
    category: "MATHEMATICS",
    question: "What is 12 × 8?",
    options: ["86", "92", "96", "108"],
    answer: 2,
    explanation: "12 multiplied by 8 equals 96."
  },
  {
    category: "GEOGRAPHY",
    question: "What is the capital city of Zimbabwe?",
    options: ["Bulawayo", "Mutare", "Gweru", "Harare"],
    answer: 3,
    explanation: "Harare is the capital city of Zimbabwe."
  },
  {
    category: "BIOLOGY",
    question: "Which organ pumps blood around the body?",
    options: ["Lungs", "Heart", "Kidneys", "Stomach"],
    answer: 1,
    explanation: "The heart pumps blood through the circulatory system."
  },
  {
    category: "GENERAL KNOWLEDGE",
    question: "How many days are there in a leap year?",
    options: ["364", "365", "366", "367"],
    answer: 2,
    explanation: "A leap year has 366 days."
  },
  {
    category: "CHEMISTRY",
    question: "What is the chemical symbol for oxygen?",
    options: ["Ox", "O", "Og", "Oy"],
    answer: 1,
    explanation: "O is the chemical symbol for oxygen."
  },
  {
    category: "ANIMALS",
    question: "Which is the largest living land animal?",
    options: ["Giraffe", "Hippopotamus", "African elephant", "Rhinoceros"],
    answer: 2,
    explanation: "The African elephant is the largest living land animal."
  },
  {
    category: "ENGLISH",
    question: "Which word is a verb in 'Birds fly high'?",
    options: ["Birds", "Fly", "High", "The"],
    answer: 1,
    explanation: "Fly is the verb because it expresses an action."
  },
  {
    category: "ASTRONOMY",
    question: "What is the closest star to Earth?",
    options: ["Sirius", "The Sun", "Polaris", "Alpha Centauri A"],
    answer: 1,
    explanation: "The Sun is our closest star."
  },
  {
    category: "ENVIRONMENT",
    question: "Which process allows green plants to make food using sunlight?",
    options: ["Respiration", "Digestion", "Photosynthesis", "Fermentation"],
    answer: 2,
    explanation: "Photosynthesis uses light energy to make sugars."
  }
];

const $ = id => document.getElementById(id);

let current = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;

function showScreen(screen) {
  ["home", "game", "results"].forEach(id => {
    $(id).classList.toggle("hidden", id !== screen);
  });
}

function startGame() {
  current = 0;
  score = 0;
  correctAnswers = 0;
  answered = false;
  showScreen("game");
  renderQuestion();
}

function renderQuestion() {
  answered = false;

  const q = questions[current];
  const progress = Math.round(
    current / questions.length * 100
  );

  $("category").textContent = q.category;
  $("score").textContent = score;
  $("question-count").textContent =
    `Question ${current + 1} of ${questions.length}`;
  $("percentage").textContent = `${progress}% completed`;
  $("bar").style.width = progress + "%";
  $("question").textContent = q.question;

  $("feedback").className = "feedback hidden";
  $("feedback").textContent = "";
  $("next").classList.add("hidden");

  $("next").textContent =
    current === questions.length - 1
      ? "See My Results 🏆"
      : "Next Question →";

  const optionsBox = $("options");
  optionsBox.replaceChildren();

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";

    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + index);

    const label = document.createElement("span");
    label.textContent = option;

    button.append(letter, label);

    button.addEventListener("click", () => {
      chooseAnswer(index);
    });

    optionsBox.appendChild(button);
  });
}

function chooseAnswer(index) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const buttons = $("options").querySelectorAll("button");
  const isCorrect = index === q.answer;

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === q.answer) {
      button.classList.add("correct");
      button.querySelector(".letter").textContent = "✓";
    }

    if (i === index && !isCorrect) {
      button.classList.add("wrong");
      button.querySelector(".letter").textContent = "×";
    }
  });

  if (isCorrect) {
    score += 10;
    correctAnswers++;

    $("feedback").className = "feedback good";
    $("feedback").textContent = "✓ Correct! " + q.explanation;
  } else {
    $("feedback").className = "feedback bad";
    $("feedback").textContent =
      "✗ Not quite. Correct answer: " +
      q.options[q.answer] + ". " + q.explanation;
  }

  $("score").textContent = score;
  $("feedback").classList.remove("hidden");
  $("next").classList.remove("hidden");
  $("next").focus();
}

function showResults() {
  showScreen("results");

  let title, icon, message, comment;

  if (score === 100) {
    title = "Perfect Score!";
    icon = "🏆";
    message = "Incredible! You answered every question correctly.";
    comment = "You're a BrainBoost champion!";
  } else if (score >= 70) {
    title = "Excellent Work!";
    icon = "🌟";
    message = "Fantastic effort. You know your stuff!";
    comment = "Keep challenging yourself to reach 100.";
  } else if (score >= 40) {
    title = "Good Effort!";
    icon = "💪";
    message = "You're making progress. Keep learning!";
    comment = "Every question is a chance to grow.";
  } else {
    title = "Keep Going!";
    icon = "🚀";
    message = "Every champion starts by learning.";
    comment = "Try again and improve your score.";
  }

  $("result-icon").textContent = icon;
  $("result-title").textContent = title;
  $("result-message").textContent = message;
  $("final-score").textContent = score;

  $("correct-count").textContent =
    `You got ${correctAnswers} out of ${questions.length} correct.`;

  $("result-comment").textContent = comment;
}

$("start").addEventListener("click", startGame);
$("restart").addEventListener("click", startGame);

$("next").addEventListener("click", () => {
  if (!answered) return;

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    $("bar").style.width = "100%";
    $("percentage").textContent = "100% completed";
    showResults();
  }
});
