(function (){
function buildQuiz (){
    // variable to store the html output
    const output = [];

    // for each question...
    myQuestions.forEach ( 
        (currentQuestion, questionNumber) => {

            //variable to store the list of possible answers 
            const answers = [];

            // and for each available answer...
            for(letter in currentQuestion.answers){

                //...add an HTML radio button 
                answers.push (
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            // add this question and its answers to the output
            output.push (
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    // finnaly combine out output list into one string of html 
    quizContainer.innerHTML = output.join('');
}

function showResults (){

    // gather answer containers from our quiz 
    const answerContainers = quizContainer.querySelectorAll('.answers');

    //keep track of users answers 
    let numCorrect = 0;

    // for each question....
    myQuestions.forEach ( (currentQuestion,questionNumber) => {

        //find selected answer 
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct 
        if (UserAnswer === currentQuestion.correctAnswer){
            //add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        //if answer is wrong or blank
        else {
            //color the answer red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct ansqwers out of total 
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`
}



const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<script>",
            b: "<js>",
            c: "<scripting>",
            d: "<javascript>"
        },
        correctAnswer: "a"
    },
    {
        question: "The external JavaScript file must contain the <script>",
        answers: {
            a: "true",
            b: "false"
        },
        correctAnswer: "b"
    },
    {
        question:"How do you create a function in JavaScript?",
        answers: {
            a: "function = myFunction()",
            b: "function myFunction()",
            c: "function:myFunction()"
        },
        correctAnswer: "b"
    },
    {
        question: "How can you add a comment in Javascript?",
        answers: {
            a: "//this is a comment",
            b: "'this is a comment",
            c: "<!--This is a comment"
        },
        correctAnswer: "a"
    }
];

// display quiz right way 

buildQuiz ();

// on submit, show results 
submitButton.addEventListener('click', showResults)
})();