let count = 11;
let countdown;
let countOfQuestion = document.querySelector(".number-of-question");
let quizContainer = document.getElementById("quiz-container");
let nextButton = document.getElementById("next-question-button");
let playerScore = document.getElementById("player-score");
let questionCount;
let gameContainer = document.getElementById("container");
let restart = document.getElementById("restart-button");
let scoreContainer = document.querySelector(".score-container");
let scoreCount = 0;
let timeLeft = document.querySelector(".time-left");
let welcomeButton = document.getElementById("welcome-button");
let welcomeScreen = document.querySelector(".welcome-screen");


const questionsArray = [
    {
    "id": "0",
    "question": "Name the spell Hermione uses to fix Harry's glasses?",
    "options": [
        "Oculus Reparo",
        "Avada Kadavra",
        "Petrificus Totalus",
        "Crucio"
    ],
    "correct": "Oculus Reparo"

},
{
    "id": "01",
    "question": "What is the name of the Weasleys old owl?",
    "options": [
        "Artemis",
        "Hedvig",
        "Errol",
        "Brodwin"
    ],
    "correct": "Errol"

},
{
    "id": "2",
    "question": "Viktor Krum is selected by the Goblet of Fire as a Triwizard champion for which school?",
    "options": [
        "Beauxbatons Academy of Magic",
        "Durmstrang Institute",
        "Hogwarts School of Witchcraft and Wizardry",
        "Mahoutokoro School of Magic"
    ],
    "correct": "Durmstrang Institute"

},
{
    "id": "3",
    "question": "Who instructs the Hogwarts suits of armour to defend the castle, using 'Piertotum Locomotor', during the battle of Hogwarts",
    "options": [
        "Professor Slughorn",
        "Professor Trelawny",
        "Professor Snape",
        "Professor McGonagall"
    ],
    "correct": "Professor McGonagall"

},
{
    "id": "4",
    "question": "What creature threatens Harry, Ron and Hermione at Gringotts?",
    "options": [
        "A Dragon",
        "A Spider",
        "A Troll",
        "A Dementor"
    ],
    "correct": "A Dragon"

},
{
    "id": "5",
    "question": "What is Professor Dumbledore's full name?",
    "options": [
        "Peter Albus Brian Argus Dumbledore",
        "Brian Horace Percival Albus Dumbledore",
        "Albus Peter Horace Argus Dumbledore",
        "Albus Percival Wulfric Brian Dumbledore"
    ],
    "correct": "Albus Percival Wulfric Brian Dumbledore"

},
{
    "id": "6",
    "question": "How long do the champions have to complete the second task of the Triwizard Tournament?",
    "options": [
        "A day",
        "Twelve hours",
        "Two hours",
        "An hour"
    ],
    "correct": "An hour"

},
{
    "id": "7",
    "question": "How many players are on a Quidditch team?",
    "options": [
        "Five",
        "Seven",
        "Nine",
        "Eleven"
    ],
    "correct": "Seven"

},
{
    "id": "8",
    "question": "What is written on Dobbys grave?",
    "options": [
        "Here Lies Dobby, A Free Elf",
        "Here Lies Dobby, A Loyal Servant",
        "Here Lies Dobby, A Loyal Friend",
        "He doesn't get a grave"
    ],
    "correct": "Here Lies Dobby, A Free Elf"

},
{
    "id": "9",
    "question": "Who leaves chocolates laced with a love potion on Harry's bed which Ron accidentally eats?",
    "options": [
        "Lavender Brown",
        "Hermione Granger",
        "Luna Lovegood",
        "Romilda Vain"
    ],
    "correct": "Romilda Vain"

},
];

restart.addEventListener("click", function() {
    initial();
    quizContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextButton.addEventListener("click", (function displayNext() {
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
}));

function timerDisplay() {
    countdown = setInterval(function() {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count === 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

function quizDisplay (questionCount) {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach(function (card) {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreater() {
    questionsArray.sort(function () {return Math.random() - 0.5});

    for(let i of questionsArray) {
        i.options.sort(function () {return Math.random() -0,5});
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
};