const Data = [
    {
        question: 'Вопрос 1',
        answers: [
            {
                id: '1',
                value: 'Ответ 1',
                correct: true,
            },
            {
                id: '2',
                value: 'Ответ 2',
                correct: false,
            },
            {
                id: '3',
                value: 'Ответ 3',
                correct: false,
            },
            

        ]
    },
    {
        question: 'Вопрос 2',
        answers: [
            {
                id: '4',
                value: 'Ответ 1',
                correct: false,
            },
            {
                id: '5',
                value: 'Ответ 2',
                correct: true,
            },
            {
                id: '6',
                value: 'Ответ 3',
                correct: false,
            },
            

        ]
    },
    {
        question: 'Вопрос 3',
        answers: [
            {
                id: '47',
                value: 'Ответ 31',
                correct: false,
            },
            {
                id: '8',
                value: 'Ответ 42',
                correct: true,
            },
            {
                id: '9',
                value: 'Ответ 53',
                correct: false,
            },
            

        ]
    }
];

let localResults = {};

const quiz = document.getElementById('quiz'),
    quizQuestions = document.getElementById('quiz-questions'),
    quizIndicator = document.getElementById('quiz-indicator'),
    quizResults = document.getElementById('quiz-results'),
    btnNext = document.getElementById('btn-next'),
    btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
    renderIndicator(index + 1);
    quizQuestions.dataset.currentStep = index;
    const renderAnswers = () => Data[index].answers
          .map((answer) => 
             `<li>
                    <label>
                        <input type="radio" name="${index}" value="${answer.id}" class="answer-input">
                        ${answer.value}
                    </label>
                </li>
            `)
            .join('');
    

    quizQuestions.innerHTML =`
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">
                ${Data[index].question}
            </div>
            
            <ul class="quiz-questions-item__answer">
                ${renderAnswers()}
            </ul>
        </div>
    `;
}

const renderResults = () => {
    let content = '';

    const getClassName = (answer, questionIndex) => {
        let classname = '';
        if (!answer.correct && answer.id === localResults[questionIndex]) {
            classname = 'answer--invalid';
        } else if (answer.correct) {
            classname = 'answer--valid';
        }

        return classname;
    }

    const getAnswers = (questionIndex) =>  Data[questionIndex].answers
    .map((answer) =>  ` <li class="${getClassName(answer, questionIndex)}">  ${answer.value} </li>`)
        .join('');
    

    Data.forEach((question, index) => {
        content += `
        <div class="quiz-results-item__question">
           ${question.question}
        </div>
        <ul class="quiz-results-item__answer">${getAnswers(index)}</ul>
        `;
    });

    quizResults.innerHTML = content;
}

const renderIndicator = (currentStep) => {
    quizIndicator.innerHTML = `${currentStep}/${Data.length}`;

};

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        console.log('inputed'); 
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;

        console.log(localResults);
       }
    });

quiz.addEventListener('click', (event) => {
   if (event.target.classList.contains('btn-next')) {
    const nextQuestionIndex = Number(quizQuestions.dataset.currentStep) + 1;
    
    if (Data.length === nextQuestionIndex) {
        quizQuestions.classList.add('questions--hidden')
        quizIndicator.classList.add('incator--hidden')
        quizResults.classList.add('results--visible')
        btnNext.classList.add('btn-next--hidden')
        btnRestart.classList.add('btn-restart--visible')
        renderResults();
    } else { 
        renderQuestions(nextQuestionIndex);
    }

    btnNext.disabled = true;
   }
   if (event.target.classList.contains('btn-restart')) {
         quizResults.innerHTML = '';
         let localResults = {};
        quizQuestions.classList.remove('questions--hidden');
        quizIndicator.classList.remove('incator--hidden');
        quizResults.classList.remove('results--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');
        renderQuestions(0);

   }
});

renderQuestions(0);