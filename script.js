const quizQuestions = [
  {
    question: "What is your preferred game genre?",
    answerA: "MMORPG",
    answerB: "Racing",
    answerC: "First-person Shooter",
    answerD: "Action Role-Playing",
  },
  {
    question: "How do you feel about the graphics of a game?",
    answerA: "I prefer retro-style graphics.",
    answerB: "I enjoy colorful and cartoonish graphics.",
    answerC: "I like realistic and modern graphics.",
    answerD: "I like immersive, fantasy-styled graphics.",
  },
  {
    question: "How do you prefer to play games?",
    answerA: "I like to immerse myself in a world with other players.",
    answerB: "I prefer fast-paced competitive games with friends.",
    answerC: "I like to compete against others online in intense matches.",
    answerD: "I prefer a single-player experience with a rich storyline.",
  },
  {
    question: "What's your ideal game pace?",
    answerA: "Slow and steady, allowing me to grind at my own pace.",
    answerB: "Fast and frantic, requiring quick reflexes.",
    answerC: "Moderate pace with strategic planning.",
    answerD: "Slow-paced with lots of exploration and world-building.",
  },
  {
    question: "What kind of setting do you prefer in a game?",
    answerA: "A vast world with different cities, guilds, and economies.",
    answerB: "Fun and whimsical tracks with vibrant environments.",
    answerC: "Modern and realistic war zones.",
    answerD: "A vast fantasy world with various landscapes and creatures.",
  },
  {
    question: "What level of difficulty do you enjoy in a game?",
    answerA:
      "I enjoy a game that can be easy or hard based on the paths I choose.",
    answerB: "I prefer a game that's easy to learn but hard to master.",
    answerC: "I enjoy high-stakes, challenging games.",
    answerD:
      "I prefer games that are challenging due to their complexity and depth.",
  },
  {
    question: "What kind of game progression do you prefer?",
    answerA:
      "I like games where progress is largely determined by the time invested.",
    answerB: "I prefer games with a series of levels or stages to complete.",
    answerC: "I enjoy games where progression is tied to skill and strategy.",
    answerD:
      "I like games where progression is linked to exploration and quest completion.",
  },
  {
    question: "How much time do you want to invest in a game?",
    answerA: "I'm ready to commit hundreds of hours to live my alternate life.",
    answerB: "I want something I can pick up and play in short bursts.",
    answerC:
      "I'm willing to invest time in mastering the game mechanics and strategies.",
    answerD: "I want a long, epic journey that I can complete at my own pace.",
  },
  {
    question: "What kind of reward system do you prefer in a game?",
    answerA: "I like games where I can trade and build wealth.",
    answerB: "I prefer games that reward me with faster cars and new tracks.",
    answerC: "I like games that reward precision and tactical skills.",
    answerD:
      "I enjoy games that reward exploration and quest completion with new items and abilities.",
  },
  {
    question: "What level of interaction do you prefer with other players?",
    answerA:
      "I enjoy a game where I can interact with a large online community.",
    answerB: "I like games where I can compete with friends in the same room.",
    answerC: "I enjoy games where I can team up or compete with others online.",
    answerD:
      "I prefer games where I can play independently and focus on my own journey.",
  },
];

let clickSound = new Audio("Pop sound effect.mp3");

/// Selecting elements

const startScreen = document.querySelector(".start-screen");
const startBtn = document.querySelector(".start-btn");
const questionTitle = document.querySelector(".question-title");
const questionText = document.querySelector(".question-text");
const questionBox = document.querySelector(".question-box");
const answers = document.querySelectorAll(".answer");

const answerAText = document.querySelector(".text-a");
const answerBText = document.querySelector(".text-b");
const answerCText = document.querySelector(".text-c");
const answerDText = document.querySelector(".text-d");

const questionNumber = document.querySelector(".question-number");
const progressBar = document.querySelector(".progress-bar");
const progressBarActive = document.querySelector(".progress-bar-active");

let currentQuestion = 0;

startBtn.addEventListener("click", () => {
  // clickSound.play();
  startBtn.classList.add("fade-out");
  setTimeout(() => {
    // startBtn.style.display = "none";
    startScreen.classList.add("hide");
    questionBox.classList.remove("hide");
    displayQuestion();
  }, 500);
});

answers.forEach((answer) => {
  answer.addEventListener("click", () => {
    // clickSound.play();
    currentQuestion++;
    displayQuestion();
  });
});

// Functions
function displayQuestion() {
  // Title and answers fade in
  questionTitle.classList.add("fade-in");
  answers.forEach((answer) => answer.classList.add("fade-in"));

  // Display question and answers
  questionTitle.innerHTML = quizQuestions[currentQuestion].question;
  answerAText.innerHTML = quizQuestions[currentQuestion].answerA;
  answerBText.innerHTML = quizQuestions[currentQuestion].answerB;
  answerCText.innerHTML = quizQuestions[currentQuestion].answerC;
  answerDText.innerHTML = quizQuestions[currentQuestion].answerD;
  questionNumber.innerHTML = `${currentQuestion + 1} / ${quizQuestions.length}`;
  progressBarActive.style.width = `${currentQuestion * 10}%`;

  // Remove fade-in class after 1 second
  setTimeout(() => {
    questionTitle.classList.remove("fade-in");
    answers.forEach((answer) => answer.classList.remove("fade-in"));
  }, 1000);
}
