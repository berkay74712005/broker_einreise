let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let MarkRightAnswer = false; // if true will mark the right answer after wrong answer 

const quizArray = [{
        id: "0",
        question: "What language do we speack?",
        options: ["German", "Dutch", "English", "French"],
        correct: "English",
    },
    {
        id: "1",
        question: "In which city do we play?",
        options: ["San andreas", "Los Santos", "New York", "America"],
        correct: "Los Santos",
    },
    {
        id: "2",
        question: "Who is the Creator of this project?",
        options: ["Gabby", "Bruce", "Bob", "Steve"],
        correct: "Bruce",
    },
    {
        id: "3",
        question: "How long are you allowed to be AFK?",
        options: ["10min", "0min", "5min", "As long as you want"],
        correct: "0min",
    },
    {
        id: "4",
        question: "What arent you allowed to do?",
        options: ["Eat Pizza in Car", "Use Pistole", "Drive Car", "Bug abusing"],
        correct: "Bug abusing",
    },
    {
        id: "5",
        question: "What is RDM?",
        options: ["Random Death Match", "Random Margin Level", "Rotor dutch margin", "Rotor DOJ Military"],
        correct: "Random Death Match",
    },
    {
        id: "6",
        question: "What is VDM?",
        options: ["Vehicle Death Match", "Vehicle Derby Match", "Vehicle Dead Margin", "Vehicle dont run anymore"],
        correct: "Vehicle Death Match",
    },
];

window.addEventListener("message", function(event) {
    var item = event.data
    if (item.action == 'OpenQuiz') {
        $("body").css("display", "block");
        displayContainer.classList.remove("hide");
        initial();
    };
});

nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "You got " + scoreCount + " out of " + questionCount + "right";
            if (scoreCount >= 5) {
                $.post(`http://${GetParentResourceName()}/QuizSuccess`, JSON.stringify({
                    status: 1
                }));
            } else {
                $.post(`http://${GetParentResourceName()}/QuizSuccess`, JSON.stringify({
                    status: 'Fail'
                }));
            }
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {

        userOption.classList.add("correct");

        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                if (MarkRightAnswer == true) {
                    element.classList.add("correct");
                }
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

window.onload = () => {
    //startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};