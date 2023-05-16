/////////////////////////////// STORED DATA ///////////////////////////////

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

const quizResults = [
  {
    result: "MMORPG",
    description:
      "You enjoy immersing yourself in a vast world with other players. You like to build your character and progress through the game at your own pace. You enjoy the social aspect of the game and interacting with other players.",
    image: "imgs/OSRSlogo.jpeg",
    game: "OldSchool Runescape",
  },

  {
    result: "Racing",
    description:
      "You enjoy fast-paced, competitive games with friends. You like to compete against others in intense matches. You enjoy the thrill of racing and the challenge of mastering the tracks.",
    image: "imgs/MarioKartLogo.jpeg",
    game: "Mario Kart",
  },

  {
    result: "First-person Shooter",
    description:
      "You enjoy competitive games with fast-paced action. You like to compete against others online in intense matches. You enjoy the thrill of combat and the challenge of mastering the weapons.",
    image: "imgs/CallOfDutyLogo.jpeg",
    game: "Call of Duty",
  },
  {
    result: "Action Role-Playing",
    description:
      "You enjoy a single-player experience with a rich storyline. You like to immerse yourself in a fantasy world with various landscapes and creatures. You enjoy the thrill of exploration and the challenge of completing quests.",
    image: "imgs/SkyrimLogo.jpeg",
    game: "Skyrim",
  },
];

let clickSound = new Audio("Pop sound effect.mp3");

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
