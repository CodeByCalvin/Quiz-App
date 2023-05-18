import { quizQuestions, quizResults } from "./quizData.js";

/////////////////////////////// SELECTING ELEMENTS ///////////////////////////////

// Screen elements
const startScreen = document.querySelector(".start-screen");
const questionBox = document.querySelector(".question-box");
const loadingScreen = document.querySelector(".loading-screen");
const resultsScreen = document.querySelector(".results-screen");

// Button elements
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const answers = document.querySelectorAll(".answer");

// Question elements
const questionTitle = document.querySelector(".question-title");
const answerAText = document.querySelector(".text-a");
const answerBText = document.querySelector(".text-b");
const answerCText = document.querySelector(".text-c");
const answerDText = document.querySelector(".text-d");

// Result elements
const resultTitle = document.querySelector(".result-title");
const resultsDescription = document.querySelector(".results-description");
const resultsGame = document.querySelector(".results-game");
const resultsImg = document.querySelector(".results-img");

// Progress elements
const questionNumber = document.querySelector(".question-number");
const progressBar = document.querySelector(".progress-bar");
const progressBarActive = document.querySelector(".progress-bar-active");

let userAnswers = [];
let gameState = {
  currentQuestion: 0,
  userAnswers: [],
};

/////////////////////////////// HELPER FUNCTIONS ///////////////////////////////

// Reset game state and display start screen
function resetGameState() {
  gameState.currentQuestion = 0;
  gameState.userAnswers = [];
}

// Show a specific screen (and hide the rest)
function showScreen(screen) {
  hideScreen(startScreen);
  hideScreen(questionBox);
  hideScreen(resultsScreen);
  screen.classList.remove("hide");
}

// Hides a specific screen
function hideScreen(screen) {
  screen.classList.add("hide");
}

/////////////////////////////// START QUIZ ///////////////////////////////

function startQuiz() {
  hideScreen(startScreen);
  showScreen(questionBox);
  displayQuestion();
}

// Start button
startBtn.addEventListener("click", () => {
  setTimeout(() => {
    startBtn.classList.add("fade-out");
    startQuiz();
  }, 500);
});

function updateDisplay() {
  resetGameState();
  if (gameState.currentQuestion > 0 && gameState.currentQuestion < 10) {
    showScreen(questionBox);
  } else if (gameState.currentQuestion === 10) {
    showScreen(resultsScreen);
  } else {
    showScreen(startScreen);
  }
}

// Display question
function displayQuestion() {
  // Title and answers fade in
  questionTitle.classList.add("fade-in");
  answers.forEach((answer) => answer.classList.add("fade-in"));

  // Display question and answers
  questionTitle.innerHTML = quizQuestions[gameState.currentQuestion].question;
  answerAText.innerHTML = quizQuestions[gameState.currentQuestion].answerA;
  answerBText.innerHTML = quizQuestions[gameState.currentQuestion].answerB;
  answerCText.innerHTML = quizQuestions[gameState.currentQuestion].answerC;
  answerDText.innerHTML = quizQuestions[gameState.currentQuestion].answerD;
  questionNumber.innerHTML = `${gameState.currentQuestion + 1} / ${
    quizQuestions.length
  }`;
  progressBarActive.style.width = `${gameState.currentQuestion * 10}%`;

  // Remove fade-in class after 1 second
  setTimeout(() => {
    questionTitle.classList.remove("fade-in");
    answers.forEach((answer) => answer.classList.remove("fade-in"));
  }, 1000);
}

// Answer buttons
answers.forEach((answer) => {
  answer.addEventListener("click", (e) => {
    gameState.currentQuestion++;
    let answerLetter = e.currentTarget.getAttribute("answer");
    gameState.userAnswers.push(answerLetter);
    if (
      gameState.currentQuestion < quizQuestions.length &&
      gameState.currentQuestion < 10
    ) {
      displayQuestion();
    } else {
      questionBox.classList.add("hide");
      showLoadingScreen();
    }
  });
});

/////////////////////////////// RESULTS ///////////////////////////////

// Loading screen for results
function showLoadingScreen() {
  loadingScreen.classList.remove("hide");

  setTimeout(() => {
    loadingScreen.classList.add("hide");
    displayResults();
  }, 2000);
}

// Displaying the results
function displayResults() {
  //////////// Calculate the result
  function calculateResults() {
    let counts = { A: 0, B: 0, C: 0, D: 0 };

    // Count the frequency of each answer and stores it in the counts object
    // If not found, add to obj and set the count to 1
    for (let i = 0; i < gameState.userAnswers.length; i++) {
      let answer = gameState.userAnswers[i];
      if (counts[answer]) {
        counts[answer]++;
      } else {
        counts[answer] = 1;
      }
    }

    // Returns the most frequent answer
    let highestCount = Math.max(...Object.values(counts));

    // Returns the options which have the highest count
    let highestAnswers = Object.keys(counts).filter(
      (answer) => counts[answer] === highestCount
    );

    // Map the most frequent answer to the corresponding result
    let result;
    // If there is more than one most frequent answer, return this
    if (highestAnswers.length > 1) {
      result = "Perhaps there's just not a game for you.";
    } else {
      // If there is no tie (I.e. there is one option with the highest count), run this
      switch (highestAnswers[0]) {
        case "A":
          result = "OldSchool Runescape";
          break;
        case "B":
          result = "Mario Kart";
          break;
        case "C":
          result = "Call of Duty";
          break;
        case "D":
          result = "Skyrim";
          break;
      }
    }
    return result;
  }

  //////////// Display the result
  let result = calculateResults();
  let resultsGameObj = quizResults.find(
    (quizResult) => quizResult.game === result
  );

  // Display result information
  questionBox.classList.add("hide");
  resultsScreen.classList.remove("hide");

  if (result === "Perhaps there's just not a game for you.") {
    resultsGame.innerHTML = "Perhaps there's just not a game for you.";
  } else {
    resultsGame.innerHTML = `You should play
  <span>${result}</span>
  next!`;
  }
  resultsImg.src = resultsGameObj.image;
  resultsDescription.innerHTML = resultsGameObj.description;
}

restartBtn.addEventListener("click", () => {
  resetGameState();
  updateDisplay();
});
