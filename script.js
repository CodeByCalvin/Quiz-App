import { quizQuestions, quizResults } from "./quizData.js";

/////////////////////////////// SELECTING ELEMENTS ///////////////////////////////

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

const resultsScreen = document.querySelector(".results-screen");
const resultTitle = document.querySelector(".result-title");
const resultsDescription = document.querySelector(".results-description");
const resultsGame = document.querySelector(".results-game");
const resultsImg = document.querySelector(".results-img");

const questionNumber = document.querySelector(".question-number");
const progressBar = document.querySelector(".progress-bar");
const progressBarActive = document.querySelector(".progress-bar-active");

let currentQuestion = 0;
let userAnswers = [];

/////////////////////////////// START QUIZ ///////////////////////////////

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
  answer.addEventListener("click", (e) => {
    // clickSound.play();
    currentQuestion++;
    let answerLetter = e.currentTarget.getAttribute("answer");
    userAnswers.push(answerLetter);
    if (currentQuestion < quizQuestions.length && currentQuestion < 10) {
      displayQuestion();
    } else {
      displayResults();
    }
  });
});

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
  progressBarActive.style.width = `${(currentQuestion + 1) * 10}%`;

  // Remove fade-in class after 1 second
  setTimeout(() => {
    questionTitle.classList.remove("fade-in");
    answers.forEach((answer) => answer.classList.remove("fade-in"));
  }, 1000);
}

// userAnswers = ["D", "D", "C", "B", "D"];

// currentQuestion = 9;

/////////////////////////////// SHOW RESULTS ///////////////////////////////

function displayResults() {
  //////////// Hide question box
  questionBox.classList.add("hide");
  //////////// Calculate the result
  function calculateResults() {
    let counts = { A: 0, B: 0, C: 0, D: 0 };

    // Count the frequency of each answer
    for (let i = 0; i < userAnswers.length; i++) {
      let answer = userAnswers[i];
      if (counts[answer]) {
        counts[answer]++;
      } else {
        counts[answer] = 1;
      }
    }

    // Find the answer with the highest frequency
    let mostFrequentAnswer = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    // Map the most frequent answer to the corresponding result
    let result;
    switch (mostFrequentAnswer) {
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
      default:
        result =
          "We're not sure what you want to play. Here are some suggestions you may want to look at: OSRS, Mario Kart, Call of Duty, Skyrim.";
    }

    return result;
  }

  //////////// Display the result
  let result = calculateResults();
  let resultsGameObj = quizResults.find(
    (quizResult) => quizResult.game === result
  );

  // Display window
  questionBox.classList.add("hide");
  resultsScreen.classList.remove("hide");

  // Display result text
  resultsGame.innerHTML = `You should play
  <span>${result}</span>
  next!`;

  // Display result image
  resultsImg.src = resultsGameObj.image;

  // Display result description
  resultsDescription.innerHTML = resultsGameObj.description;
}
