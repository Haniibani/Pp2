const countOfQuestion = document.querySelector(".number-of-question");
const gameContainer = document.getElementById("container");
const glowEffects = document.querySelectorAll(".glow-effect");
const nextButton = document.getElementById("next-question-button");
const playerScore = document.getElementById("player-score");
const quizContainer = document.getElementById("quiz-container");
const restart = document.getElementById("restart-button");
const scoreContainer = document.querySelector(".score-container");
const timeLeft = document.querySelector(".time-left");
const welcomeButton = document.getElementById("welcome-button");
const welcomeScreen = document.querySelector(".welcome-screen");
let count = 11;
let countdown;
let questionCount;
let scoreCount = 0;

function getRandomQuestions (questions) {
    return questions.sort(() => Math.random() - 0.5).slice(0, 10)
}

const questionsArray = []

fetch('./assets/questions.json')
  .then((response) => response.json())
  .then((data) => questionsArray.push(...getRandomQuestions((data))));

/**
 * Restarts the game, hiding the score container and shows the quizcontainer again
 */
restart.addEventListener("click", function() {
    initial();
    quizContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

/**
 * Displays the next question, increse the questionCount by 1 and if there are no more questions it will show your score. 
 */

function displayNext() {
    questionCount += 1;

    if (questionCount == questionsArray.length) {
        quizContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        playerScore.innerHTML = "Your Score is " +
        scoreCount + " out of " + questionCount;
    } else {
        countOfQuestion.innerHTML = questionCount + 1 + " of " + questionsArray.length + " Question";

        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
}

nextButton.addEventListener("click", displayNext);

function quizDisplay (questionCount) {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach(function (card) {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
}

/**
 * Shows a timer and counts down from 10.
 */
function timerDisplay() {
    countdown = setInterval(function() {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext() ;
        }
    }, 1000);
}

/**
 * Creates the quiz with random questions out of the questionsArray.
 */
function quizCreator() {
    questionsArray.sort(function () {return Math.random() - 0.5; });

    for(let i of questionsArray) {
        i.options.sort(function () {return Math.random() -0,5; });
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        
        countOfQuestion.innerHTML = 1 + " of " + questionsArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="assertAnswer(this)">
        ${i.options[0]}</button>
        <button class="option-div" onclick="assertAnswer(this)">
        ${i.options[1]}</button>
        <button class="option-div" onclick="assertAnswer(this)">
        ${i.options[2]}</button>
        <button class="option-div" onclick="assertAnswer(this)">
        ${i.options[3]}</button>
        `;

        gameContainer.appendChild(div);
    }
}

/**
 * Checks the right answer and if correct add to scoreCount.
 */
function assertAnswer(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === questionsArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach(function (element) {
            if (element.innerText === questionsArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach(function (element) {
        element.disabled = true;
    });
}

/**
 * Initial function to clear the quiz and start from zero.
 */
function initial() {
    gameContainer.innerHTML= "";
    questionCount = 0;
    scoreCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

/**
 * Button that starts the quiz and shows the "quizContainer".
 */
welcomeButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    initial();
});

/**
 * when the window is loaded, shows the welcome screen with the begin button.
 */
window.onload = function () {
    welcomeScreen.classList.remove("hide");
    quizContainer.classList.add("hide");
};