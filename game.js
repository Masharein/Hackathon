const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the correct way to write a JavaScript array?',
        choice1: 'let colors = (1:"red", 2:"green", 3:"blue")',
        choice2: 'let colors = ["red", "green", "blue"]',
        choice3: 'let colors = "red", "green", "blue"',
        choice4: 'let colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        answer: 2,
    },
    {
        question: 'How does a FOR loop start?',
        choice1: 'for i = 1 to 10',
        choice2: 'for (i = 0; i <= 10)',
        choice3: 'for (i = 0; i <= 10; i++) ',
        choice4: 'for (i <= 10; i++)',
        answer: 3,
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 8?',
        choice1: 'if (i <> 8)',
        choice2: 'if i =! 8 then',
        choice3: 'if i <> 8',
        choice4: 'if (i != 8)  ',
        answer: 4,
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<js>',
        choice3: '<scripting>',
        choice4: '<javascript>',
        answer: 1,
    },
    {
        question: 'How do you call a function named "myFunction"?',
        choice1: 'myFunction()',
        choice2: 'call myFunction()',
        choice3: 'call function myFunction()',
        choice4: 'function >= myFunction()',
        answer: 1,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'msg("Hello World")',
        choice2: 'alert("Hello World")',
        choice3: 'alertBox("Hello World")',
        choice4: 'prompt("Hello World")',
        answer: 2,
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        choice1: '=',
        choice2: ':',
        choice3: '-',
        choice4: '+',
        answer: 1,
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        choice1: '<!--This is a comment-->',
        choice2: '//This is a comment  ',
        choice3: 'This is a comment',
        choice4: ':This is a comment>',
        answer: 2,
    },
    {
        question: 'How do you round the number 6.27, to the nearest integer?',
        choice1: 'round(6.27)',
        choice2: 'Math.rnd(6.27)',
        choice3: 'rnd(6.27)',
        choice4: 'Math.round(6.27)',
        answer: 4,
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: 'The <head> section',
        choice2: 'The <body> section',
        choice3: 'Both the <head> section and the <body> section are correct ',
        choice4: 'The end of the CSS-file',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
     localStorage.setItem('mostRecentScore', score)

     return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion() 

    }, 500)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()